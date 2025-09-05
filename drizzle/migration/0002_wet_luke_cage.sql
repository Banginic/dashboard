ALTER TABLE "location" DROP CONSTRAINT "location_admin_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "location" DROP COLUMN "admin_id";