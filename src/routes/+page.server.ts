import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { schema } from './schema';
import connection from '$lib/server/database/connection';
import { Answers } from '$lib/server/database/schema';
import * as crypto from 'crypto';

export const load: PageServerLoad = () => {
	return {
		form: superValidate(schema)
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, schema);
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		await connection.transaction(async tx => {
			const responseId = crypto.randomUUID();

			for (const [key, value] of Object.entries(form.data)) {
				console.log(`Writing ${key} as ${value}`);
				await tx.insert(Answers).values({
					responseId,
					questionId: parseInt(key),
					answerType: "string",
					stringAnswer: value,
				});
			}
		})

		return {
			form
		};
	}
};