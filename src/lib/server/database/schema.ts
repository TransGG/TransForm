import { text, pgEnum, integer, pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core';

export const AnswerTypes = pgEnum(
    'answer_types',
    ['string',],
)

export const Answers = pgTable('answers', {
	responseId: uuid('response_id').notNull(),
	questionId: integer('question_id').notNull(),
    answerType: AnswerTypes('type').notNull(),
    stringAnswer: text('string_answer'),
}, table => ({
    pk: primaryKey(table.responseId, table.questionId)
}));
