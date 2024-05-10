import { type Collection, type Db, MongoClient } from "mongodb";
import type { Paste } from "./schemas/paste.ts";

const databaseName: string = process.env.DATABASE_NAME ?? "paste";
const databaseCollection: string = process.env.DATABASE_COLLECTION ?? "pastes";
const databaseUrl: string =
	process.env.DATABASE_URL ?? `mongodb://127.0.0.1:27017/${databaseName}`;

const client: MongoClient = new MongoClient(databaseUrl);
const database: Db = client.db(databaseName);

const pastesCollection: Collection<Paste> =
	database.collection<Paste>(databaseCollection);

export { pastesCollection };
