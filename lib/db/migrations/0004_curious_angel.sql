ALTER TABLE "interview" RENAME TO "interviews";--> statement-breakpoint
ALTER TABLE "interviews" DROP CONSTRAINT "interview_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "interviews" ADD CONSTRAINT "interviews_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;