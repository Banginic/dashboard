ALTER TABLE "contact_details" DROP CONSTRAINT "contact_details_admin_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "contact_details" DROP COLUMN "admin_id";--> statement-breakpoint
ALTER TABLE "contact_details" DROP COLUMN "you_tube";--> statement-breakpoint
ALTER TABLE "contact_details" DROP COLUMN "twitter";