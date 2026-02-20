import { pool } from '../../db/pool';
import type { UserRole } from '../../types/types';
import type {
  AdminAppointmentRow,
  AdminUserRow,
  ListUserAppointmentsFilters,
  ListUsersFilters,
  PaginationMeta,
} from '../../types/adminUsers-types';



const USER_COLUMNS = `
  u.id,
  u.firebase_uid,
  u.email,
  u.first_name,
  u.last_name,
  u.phone,
  u.role,
  u.is_blocked,
  u.blocked_at,
  u.created_at
`;





const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

const toPagination = (page: number, limit: number, total: number): PaginationMeta => ({
  page,
  limit,
  total,
  totalPages: total === 0 ? 0 : Math.ceil(total / limit),
});

export const listAdminUsers = async (filters: ListUsersFilters) => {
  const page = clamp(filters.page || 1, 1, 10_000);
  const limit = clamp(filters.limit || 20, 1, 100);
  const offset = (page - 1) * limit;

  const where: string[] = [];
  const values: unknown[] = [];

  if (filters.search) {
    values.push(`%${filters.search.toLowerCase()}%`);
    const p = values.length;
    where.push(`(LOWER(u.first_name || ' ' || u.last_name) LIKE $${p} OR LOWER(u.email) LIKE $${p})`);
  }

  if (filters.role) {
    values.push(filters.role);
    where.push(`u.role = $${values.length}`);
  }

  if (typeof filters.blocked === 'boolean') {
    values.push(filters.blocked);
    where.push(`u.is_blocked = $${values.length}`);
  }

  const whereSql = where.length > 0 ? `WHERE ${where.join(' AND ')}` : '';

  const countSql = `
    SELECT COUNT(*)::int AS total
    FROM users u
    ${whereSql}
  `;

  const dataSql = `
    SELECT ${USER_COLUMNS}
    FROM users u
    ${whereSql}
    ORDER BY u.created_at DESC, u.id DESC
    LIMIT $${values.length + 1}
    OFFSET $${values.length + 2}
  `;

  const [countResult, usersResult] = await Promise.all([
    pool.query<{ total: number }>(countSql, values),
    pool.query<AdminUserRow>(dataSql, [...values, limit, offset]),
  ]);

  const total = Number(countResult.rows[0]?.total ?? 0);

  return {
    users: usersResult.rows,
    pagination: toPagination(page, limit, total),
  };
};

export const getAdminUserById = async (userId: number): Promise<AdminUserRow | null> => {
  const result = await pool.query<AdminUserRow>(
    `
    SELECT ${USER_COLUMNS}
    FROM users u
    WHERE u.id = $1
    LIMIT 1
    `,
    [userId]
  );

  return result.rows[0] ?? null;
};

export const countActiveAdmins = async (): Promise<number> => {
  const result = await pool.query<{ total: number }>(
    `
    SELECT COUNT(*)::int AS total
    FROM users
    WHERE role = 'admin' AND is_blocked = false
    `
  );

  return Number(result.rows[0]?.total ?? 0);
};

export const updateAdminUserRole = async (
  userId: number,
  role: UserRole
): Promise<AdminUserRow | null> => {
  const result = await pool.query<AdminUserRow>(
    `
    UPDATE users u
    SET role = $1
    WHERE u.id = $2
    RETURNING ${USER_COLUMNS}
    `,
    [role, userId]
  );

  return result.rows[0] ?? null;
};

export const setAdminUserBlocked = async (
  userId: number,
  isBlocked: boolean
): Promise<AdminUserRow | null> => {
  const result = await pool.query<AdminUserRow>(
    `
    UPDATE users u
    SET
      is_blocked = $1,
      blocked_at = CASE WHEN $1 THEN NOW() ELSE NULL END
    WHERE u.id = $2
    RETURNING ${USER_COLUMNS}
    `,
    [isBlocked, userId]
  );

  return result.rows[0] ?? null;
};

export const listAdminUserAppointments = async (filters: ListUserAppointmentsFilters) => {
  const page = clamp(filters.page || 1, 1, 10_000);
  const limit = clamp(filters.limit || 20, 1, 100);
  const offset = (page - 1) * limit;

  const where: string[] = ['a.customer_id = $1'];
  const values: unknown[] = [filters.userId];

  if (filters.status) {
    values.push(filters.status);
    where.push(`a.status = $${values.length}`);
  }

  const whereSql = `WHERE ${where.join(' AND ')}`;

  const countSql = `
    SELECT COUNT(*)::int AS total
    FROM appointments a
    ${whereSql}
  `;

  const dataSql = `
    SELECT
      a.id,
      a.date,
      a.start_time,
      a.end_time,
      a.status,
      a.note,
      json_build_object(
        'id', b.id,
        'first_name', bu.first_name,
        'last_name', bu.last_name,
        'title', b.title
      ) AS barber,
      json_build_object(
        'id', s.id,
        'name', s.name,
        'duration', s.duration,
        'price', s.price::float8
      ) AS service
    FROM appointments a
    LEFT JOIN barbers b ON b.id = a.barber_id
    LEFT JOIN users bu ON bu.id = b.user_id
    LEFT JOIN services s ON s.id = a.service_id
    ${whereSql}
    ORDER BY a.date DESC, a.start_time DESC, a.id DESC
    LIMIT $${values.length + 1}
    OFFSET $${values.length + 2}
  `;

  const [countResult, rowsResult] = await Promise.all([
    pool.query<{ total: number }>(countSql, values),
    pool.query<AdminAppointmentRow>(dataSql, [...values, limit, offset]),
  ]);

  const total = Number(countResult.rows[0]?.total ?? 0);

  return {
    appointments: rowsResult.rows,
    pagination: toPagination(page, limit, total),
  };
};
