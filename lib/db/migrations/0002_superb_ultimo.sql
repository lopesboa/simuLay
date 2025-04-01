ALTER TABLE "account" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "account" ALTER COLUMN "updated_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "updated_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "updated_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "verification" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "verification" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "account" ADD COLUMN "deleted_at" timestamp;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "deleted_at" timestamp;--> statement-breakpoint
ALTER TABLE "verification" ADD COLUMN "deleted_at" timestamp;