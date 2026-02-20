type LogLevel = 'error' | 'warn' | 'info' | 'debug';

const levelPriority: Record<LogLevel, number> = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

const envLevel = (process.env.LOG_LEVEL?.toLowerCase() as LogLevel) || 'info';
const currentPriority = levelPriority[envLevel] ?? levelPriority.info;

const write = (level: LogLevel, message: string, meta?: Record<string, unknown>): void => {
  if (levelPriority[level] > currentPriority) return;

  const payload: Record<string, unknown> = {
    ts: new Date().toISOString(),
    level,
    message,
  };

  if (meta && Object.keys(meta).length > 0) payload.meta = meta;

  const serialized = JSON.stringify(payload);

  if (level === 'error') {
    console.error(serialized);
    return;
  }

  if (level === 'warn') {
    console.warn(serialized);
    return;
  }

  console.log(serialized);
};

export const logger = {
  error: (message: string, meta?: Record<string, unknown>) => write('error', message, meta),
  warn: (message: string, meta?: Record<string, unknown>) => write('warn', message, meta),
  info: (message: string, meta?: Record<string, unknown>) => write('info', message, meta),
  debug: (message: string, meta?: Record<string, unknown>) => write('debug', message, meta),
};
