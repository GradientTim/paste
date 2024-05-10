import { Hono } from "hono";
import { serveStatic } from "hono/bun";

import { pastesRoute } from "./routes/pastes.ts";
import "./database.ts";

const app = new Hono();
app.basePath("/api").route("/pastes", pastesRoute);

app.use("*", serveStatic({ root: "./frontend/dist" }));
app.get("*", serveStatic({ path: "./frontend/dist/index.html" }));

export default app;
