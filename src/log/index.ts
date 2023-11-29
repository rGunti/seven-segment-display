enum LogLevel {
  Debug,
  Info,
  Warning,
  Error,
}

const LOG_LEVELS: Record<LogLevel, string> = {
  [LogLevel.Debug]: 'DBG',
  [LogLevel.Info]: 'INF',
  [LogLevel.Warning]: 'WRN',
  [LogLevel.Error]: 'ERR',
};
const LOG_FUNCTIONS: Record<LogLevel, (...args: unknown[]) => void> = {
  [LogLevel.Debug]: console.debug,
  [LogLevel.Info]: console.info,
  [LogLevel.Warning]: console.warn,
  [LogLevel.Error]: console.error,
};

function _log(
  source: string,
  level: LogLevel,
  message: string,
  ...args: unknown[]
) {
  LOG_FUNCTIONS[level](
    new Date().toISOString(),
    source,
    LOG_LEVELS[level],
    message,
    ...args,
  );
}

export class Logger {
  constructor(private readonly source: string) {}

  debug(message: string, ...args: unknown[]): void {
    _log(this.source, LogLevel.Debug, message, ...args);
  }

  info(message: string, ...args: unknown[]): void {
    _log(this.source, LogLevel.Info, message, ...args);
  }

  warning(message: string, ...args: unknown[]): void {
    _log(this.source, LogLevel.Warning, message, ...args);
  }

  error(message: string, ...args: unknown[]): void {
    _log(this.source, LogLevel.Error, message, ...args);
  }
}
