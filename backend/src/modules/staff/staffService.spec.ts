import assert from 'node:assert/strict';

process.env.DATABASE_URL ??= 'postgresql://test:test@localhost:5432/testdb';

type QueryResult = {
  rows: unknown[];
  rowCount: number | null;
};

const run = async () => {
  
  const poolModule = await import('../../db/pool');
  const pool = poolModule.pool as unknown as { query: (...args: unknown[]) => Promise<QueryResult> };
  const originalQuery = pool.query.bind(pool);
  const staffService = await import('./staffService');

  let lastSql = '';
  let lastParams: unknown[] = [];

  const setQueryMock = (result: QueryResult) => {
    pool.query = async (...args: unknown[]) => {
      lastSql = String(args[0] ?? '');
      lastParams = Array.isArray(args[1]) ? args[1] : [];
      return result;
    };
  };

  try {
    setQueryMock({ rows: [], rowCount: 0 });
    await staffService.getMyAppointments('uid-1', { limit: 5 });
    assert.match(lastSql, /\bb\.is_active\s*=\s*true\b/);
    assert.equal(lastParams[0], 'uid-1');

    setQueryMock({ rows: [{ date: '2026-01-01', count: 1 }], rowCount: 1 });
    const days = await staffService.getMyAppointmentDays('uid-2', '2026-01-01', '2026-01-31');
    assert.match(lastSql, /\bb\.is_active\s*=\s*true\b/);
    assert.equal(lastParams[0], 'uid-2');
    assert.deepEqual(days, [{ date: '2026-01-01', count: 1 }]);

    setQueryMock({ rows: [{ id: 11, status: 'cancelled' }], rowCount: 1 });
    const cancelled = await staffService.cancelMyAppointment('uid-3', 11);
    assert.match(lastSql, /\bb\.is_active\s*=\s*true\b/);
    assert.equal(lastParams[0], 'uid-3');
    assert.equal(lastParams[1], 11);
    assert.deepEqual(cancelled, { id: 11, status: 'cancelled' });
  } finally {
    pool.query = originalQuery;
  }
};

run().catch((error) => {
  console.error('staffService checks failed:', error);
  process.exit(1);
});
