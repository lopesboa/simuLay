CREATE TABLE "interview" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"role" varchar(100) NOT NULL,
	"type" varchar(50) NOT NULL,
	"level" varchar(50) NOT NULL,
	"techstack" text NOT NULL,
	"questions" jsonb NOT NULL,
	"user_id" uuid NOT NULL,
	"finalized" boolean DEFAULT false NOT NULL,
	"amount" integer NOT NULL,
	"cover_image" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "interview" ADD CONSTRAINT "interview_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;