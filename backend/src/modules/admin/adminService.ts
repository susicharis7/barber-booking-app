import { pool } from '../../db/pool';

type RevenueTrendPoint = {
  date: string;
  revenue: number;
};

export type AdminOverview = {
  appointments_today: number;
  appointments_this_month: number;
  revenue_today: number;
  revenue_this_month: number;
  registered_users: number;
  active_barbers: number;
  upcoming_24h: number;
  most_selected_service: {
    id: number | null;
    name: string | null;
    count: number;
  };
  revenue_trend_30d: RevenueTrendPoint[];
};

const toNumber = (value: unknown): number => {
  if (typeof value === 'number') return value;
  return Number(value ?? 0);
};

export const getAdminOverview = async (): Promise<AdminOverview> => {
  const result = await pool.query(
    `
    WITH most_selected AS (
      SELECT
        s.id,
        s.name,
        COUNT(*)::int AS selections
      FROM appointments a
      JOIN services s ON s.id = a.service_id
      GROUP BY s.id, s.name
      ORDER BY selections DESC, s.id ASC
      LIMIT 1
    ),
    trend AS (
      SELECT
        days.day::date AS date,
        COALESCE(SUM(CASE WHEN a.status = 'completed' THEN s.price END), 0)::float8 AS revenue
      FROM generate_series(
        CURRENT_DATE - INTERVAL '29 day',
        CURRENT_DATE,
        INTERVAL '1 day'
      ) AS days(day)
      LEFT JOIN appointments a ON a.date = days.day::date
      LEFT JOIN services s ON s.id = a.service_id
      GROUP BY days.day
      ORDER BY days.day ASC
    )
    SELECT
      (SELECT COUNT(*)::int FROM appointments WHERE date = CURRENT_DATE) AS appointments_today,
      (
        SELECT COUNT(*)::int
        FROM appointments
        WHERE date >= date_trunc('month', CURRENT_DATE)::date
          AND date < (date_trunc('month', CURRENT_DATE)::date + INTERVAL '1 month')::date
      ) AS appointments_this_month,
      (
        SELECT COALESCE(SUM(s.price), 0)::float8
        FROM appointments a
        JOIN services s ON s.id = a.service_id
        WHERE a.status = 'completed'
          AND a.date = CURRENT_DATE
      ) AS revenue_today,
      (
        SELECT COALESCE(SUM(s.price), 0)::float8
        FROM appointments a
        JOIN services s ON s.id = a.service_id
        WHERE a.status = 'completed'
          AND a.date >= date_trunc('month', CURRENT_DATE)::date
          AND a.date < (date_trunc('month', CURRENT_DATE)::date + INTERVAL '1 month')::date
      ) AS revenue_this_month,
      (SELECT COUNT(*)::int FROM users) AS registered_users,
      (SELECT COUNT(*)::int FROM barbers WHERE is_active = true) AS active_barbers,
      (
        SELECT COUNT(*)::int
        FROM appointments a
        WHERE a.status = 'confirmed'
          AND (a.date + a.start_time) >= NOW()
          AND (a.date + a.start_time) < (NOW() + INTERVAL '24 hours')
      ) AS upcoming_24h,
      COALESCE(
        (
          SELECT json_build_object(
            'id', ms.id,
            'name', ms.name,
            'count', ms.selections
          )
          FROM most_selected ms
        ),
        json_build_object('id', null, 'name', null, 'count', 0)
      ) AS most_selected_service,
      (
        SELECT COALESCE(
          json_agg(
            json_build_object('date', t.date, 'revenue', t.revenue)
            ORDER BY t.date
          ),
          '[]'::json
        )
        FROM trend t
      ) AS revenue_trend_30d
    `
  );

  const row = result.rows[0];

  const trendSource = Array.isArray(row.revenue_trend_30d) ? row.revenue_trend_30d : [];
  const revenueTrend: RevenueTrendPoint[] = trendSource.map((item: any) => ({
    date: String(item.date).slice(0, 10),
    revenue: toNumber(item.revenue),
  }));

  return {
    appointments_today: toNumber(row.appointments_today),
    appointments_this_month: toNumber(row.appointments_this_month),
    revenue_today: toNumber(row.revenue_today),
    revenue_this_month: toNumber(row.revenue_this_month),
    registered_users: toNumber(row.registered_users),
    active_barbers: toNumber(row.active_barbers),
    upcoming_24h: toNumber(row.upcoming_24h),
    most_selected_service: {
      id: row.most_selected_service?.id ?? null,
      name: row.most_selected_service?.name ?? null,
      count: toNumber(row.most_selected_service?.count),
    },
    revenue_trend_30d: revenueTrend,
  };
};
