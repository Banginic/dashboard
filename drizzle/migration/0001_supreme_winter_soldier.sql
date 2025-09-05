ALTER TABLE "contact_details" ADD COLUMN "whats_app" varchar(255) DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "contact_details" ADD COLUMN "you_tube" varchar(255) DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "contact_details" DROP COLUMN "whatsApp";--> statement-breakpoint
ALTER TABLE "contact_details" DROP COLUMN "youTube";