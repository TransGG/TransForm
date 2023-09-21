import { z } from 'zod';

export type FieldType = {
    name: string;
    description?: string;
    minLength?: number;
    maxLength?: number;
};

export const fields = [
	{
		name: 'Discord username',
		description: 'Your discord username, including your 4-digit discriminator if you have one',
		minLength: 2,
		maxLength: 32
	},
	{ name: 'Why do you want to be a staff member?' },
	{ name: 'abcde?' }
] satisfies FieldType[];

export const schema = z.object(Object.fromEntries(
    fields.map((field, index) => {
        let validator = z.string();

        if (field.minLength) validator = validator.min(field.minLength);
        if (field.maxLength) validator = validator.max(field.maxLength);

        return [
            index.toString(), validator
        ];
    }))
);
export type Schema = typeof schema;
