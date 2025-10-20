import { FastifyInstance } from 'fastify';
import { z } from 'zod';

const submitSchema = z.object({
  faction: z.enum(['JACOBITE', 'ENGLISH']),
  scoreTotal: z.number().int().nonnegative(),
  distance: z.number().int().nonnegative(),
  enemiesDefeated: z.number().int().nonnegative().default(0),
  seed: z.string().min(1),
  signature: z.string().optional(),
  meta: z.record(z.any()).optional()
});

export async function scoresRoutes(app: FastifyInstance) {
  app.post('/api/scores', async (req, reply) => {
    const parsed = submitSchema.safeParse(req.body);
    if (!parsed.success) {
      return reply.status(400).send({ error: 'invalid_payload', issues: parsed.error.issues });
    }

    // TODO: persist via Prisma after wiring DB
    const data = parsed.data;
    return { ok: true, received: data };
  });

  app.get('/api/scores', async (req, _reply) => {
    const limit = Math.min(Number((req.query as any).limit ?? 100), 100);
    // TODO: query top scores via Prisma once DB is ready
    return { items: [], limit };
  });
}
