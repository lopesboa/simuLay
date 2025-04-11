CREATE TABLE "feedbacks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"total_score" numeric(3, 1) NOT NULL,
	"category_scores" jsonb NOT NULL,
	"strengths" text[] NOT NULL,
	"areas_for_improvement" text[] NOT NULL,
	"final_assessment" text NOT NULL,
	"interview_id" uuid,
	"user_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "feedbacks" ADD CONSTRAINT "feedbacks_interview_id_interviews_id_fk" FOREIGN KEY ("interview_id") REFERENCES "public"."interviews"("id") ON DELETE cascade ON UPDATE no action;