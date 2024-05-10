import { type Server, serve } from "bun";
import { type Tracer, colorConsole } from 'tracer';

import app from './app.ts';

export const logger: Tracer.Logger<string> = colorConsole();
const server: Server = serve({
	port: process.env.SERVER_PORT ?? 3920,
	hostname: process.env.SERVER_HOST ?? "0.0.0.0",
	fetch: app.fetch,
});

const url: string = `http://${server.hostname}:${server.port}`;
logger.info('Server is listening on', url);
