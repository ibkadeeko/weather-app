import loggerCreator from './loggerCreator';

// Component names
const GENERAL = 'GENERAL';
const ROUTER = 'ROUTER';

// Logger for general application logic
export const generalLogger = loggerCreator(GENERAL);

/**
 * Logs for specific module logs
 */
export const routerResponseLogger = loggerCreator(ROUTER);
