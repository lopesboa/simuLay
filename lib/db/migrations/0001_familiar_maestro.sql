ALTER TABLE "user" ALTER COLUMN "fist_name" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "last_name" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "updated_at" SET DEFAULT now();