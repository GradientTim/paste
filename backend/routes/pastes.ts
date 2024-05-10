import { password as BunPassword } from "bun";
import { type Context, Hono } from "hono";
import type { Filter, FindCursor } from "mongodb";
import { ulid } from "ulid";

import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

import { pastesCollection } from "../database.ts";
import type { Paste, PasteTab, RawPaste } from "../schemas/paste.ts";

const pasteDeleteToken: string | undefined = process.env.PASTE_DELETE_TOKEN;
if (pasteDeleteToken === null) {
	process.exit(1);
}

const listPastesSchema = z.object({
	page: z.coerce.number().min(1).default(1),
	language: z.string().min(1).optional(),
	search: z.string().min(1).optional(),
});

const pasteSchema = z.object({
	fileName: z.string().min(1).max(15),
	language: z.string(),
	content: z.string(),
});

const createPasteSchema = z.object({
	password: z.string().min(1).optional(),
	hidden: z.boolean().optional(),
	tabs: z.array(pasteSchema).min(1).max(10),
});

const getPasteSchema = z.object({
	id: z.string().ulid(),
});

const deletePasteSchema = z.object({
	id: z.string().ulid(),
});

type CreatePostDto = {
	password: string | undefined;
	hidden: boolean | undefined;
	tabs: PasteTab[];
};

export const pastesRoute = new Hono()
	.get(
		"/",
		zValidator("query", listPastesSchema),
		async (context: Context): Promise<Response> => {
			const limit = 10;
			const { page, language, search } = context.req.valid("query");

			const query: Filter<Paste> = {
				password: undefined,
				hidden: false,
			};
			if (search) {
				query["tabs.fileName"] = new RegExp(search, "i");
			}
			if (language) {
				query["tabs.language"] = language;
			}
			const cursor: FindCursor<Paste> = pastesCollection
				.find(query)
				.skip(limit * (page - 1))
				.limit(limit);

			const totalDocuments: number =
				await pastesCollection.countDocuments(query);
			const maxPages: number = Math.ceil(totalDocuments / limit);

			const pastes: Paste[] = await cursor.toArray();
			const rawPastes: RawPaste[] = pastes.map(
				({ password, ...rest }): RawPaste => rest,
			);

			return context.json({
				meta: {
					page: page,
					limit: limit,
					total: maxPages,
					current: pastes.length,
					hasPrevious: page > 1,
					hasNext: await cursor.hasNext(),
				},
				pastes: rawPastes,
			});
		},
	)
	.post(
		"/",
		zValidator("json", createPasteSchema),
		async (context: Context): Promise<Response> => {
			const { password, hidden, tabs } =
				context.req.valid<CreatePostDto>("json");
			let pastePassword: string | undefined = password;
			if (password !== undefined) {
				if (password.length === 0) {
					return new Response(null, {
						status: 400,
						statusText: "Password is set but is empty",
					});
				}
				pastePassword = await BunPassword.hash(password, {
					algorithm: "bcrypt",
					cost: 10,
				});
			}
			const isHidden: boolean = hidden ?? false;
			const id: string = ulid();
			await pastesCollection.insertOne({
				id: id,
				password: pastePassword,
				hidden: isHidden,
				tabs: tabs,
				createdAt: new Date(),
			});
			return context.json({
				pasteId: id,
			});
		},
	)
	.get(
		"/:id",
		zValidator("param", getPasteSchema),
		async (context: Context): Promise<Response> => {
			const { id } = context.req.valid("param");
			const paste: Paste | null = await pastesCollection.findOne({
				id: id,
			});
			if (paste === null) {
				return <Response>context.notFound();
			}
			const { password, _id, ...rest } = paste;
			if (password) {
				const pastePassword: string | undefined =
					context.req.header("X-Paste-Password");
				const validPassword =
					pastePassword &&
					(await BunPassword.verify(pastePassword, password, "bcrypt"));
				if (!validPassword) {
					return new Response(null, {
						status: 403,
					});
				}
			}
			return context.json(rest);
		},
	)
	.delete(
		"/:id",
		zValidator("param", deletePasteSchema),
		async (context: Context): Promise<Response> => {
			const deleteToken: string | undefined = context.req.header(
				"X-Paste-DeleteToken",
			);
			if (deleteToken === undefined || deleteToken !== pasteDeleteToken) {
				return new Response(null, {
					status: 405,
				});
			}
			const { id } = context.req.valid("param");
			const result = await pastesCollection.deleteOne({
				id: id,
			});
			if (result.acknowledged) {
				return new Response(null, {
					status: 204,
				});
			}
			return <Response>context.notFound();
		},
	);
