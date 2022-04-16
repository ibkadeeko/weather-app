import http from 'http';
import { Connection } from 'typeorm';
import app from './app';
import { generalLogger } from './lib';
const port = process.env.PORT || 8008;
const { pid } = process;

app.set('port', port);
const server = http.createServer(app);

process.on('unhandledRejection', (reason: any): void => {
  throw reason;
});

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr?.port}`;
  const message = `🚀 Server listening on ${bind} with PID ${pid}`;
  generalLogger.info(message);
};

const onError = (error: any) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  switch (error.code) {
    case 'EACCES':
      generalLogger.error(`${bind} requires elevated privileges`);
      process.exit(1);

    case 'EADDRINUSE':
      generalLogger.error(`${bind} is already in use`);
      process.exit(1);

    default:
      throw error;
  }
};

const closeServer = () => {
  generalLogger.info('Shutting down server and open connections');
  server.close(() => {
    generalLogger.info('Server shut down');
  });
};

process.on('SIGTERM', () => {
  generalLogger.info('SIGTERM Signal Received');
  closeServer();
});

process.on('SIGINT', () => {
  generalLogger.info('SIGTERM Signal Received');
  closeServer();
});

const startServer = (connection: Connection) => {
  server.listen(port);
  server.on('error', onError);
  server.on('listening', onListening);
  server.addListener('close', () => {
    connection.close();
    generalLogger.info('Database Connection Closed');
  });
};

export default startServer;
