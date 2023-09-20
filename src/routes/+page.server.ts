import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { schema } from './schema';

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
		return {
			form
		};
	}
};