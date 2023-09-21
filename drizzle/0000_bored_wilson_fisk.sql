DO $$ BEGIN
 CREATE TYPE "answer_types" AS ENUM('string');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "answers" (
	"response_id" uuid NOT NULL,
	"question_id" integer NOT NULL,
	"type" "answer_types" NOT NULL,
	"string_answer" text,
	CONSTRAINT answers_response_id_question_id PRIMARY KEY("response_id","question_id")
);
