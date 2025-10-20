import Fastify from 'fastify';
import pino from 'pino';
import { scoresRoutes } from './routes/scores';

const logger = pino({ level: process.env.LOG_LEVEL || 'info' });
const app = Fastify({ logger });

app.get('/api/health', async () => ({ status: 'ok' }));
app.register(scoresRoutes);

const port = Number(process.env.PORT || 3000);
const host = process.env.HOST || '0.0.0.0';

app
  .listen({ port, host })
  .then(() => {
    logger.info({ port, host }, 'server listening');
  })
  .catch((err) => {
    logger.error(err, 'server failed');
    process.exit(1);
  });
