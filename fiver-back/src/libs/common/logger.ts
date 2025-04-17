// libs/common/logger.ts
import { Logger } from '@nestjs/common';

export const AppLogger = new Logger('App');

// Example usage:
// AppLogger.log('Something happened')
// AppLogger.error('Oops...', error.stack)
