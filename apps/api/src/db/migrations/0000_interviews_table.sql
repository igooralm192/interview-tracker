CREATE TYPE "public"."interview_contact_type" AS ENUM('active', 'passive');--> statement-breakpoint
CREATE TYPE "public"."interview_priority" AS ENUM('low', 'medium', 'high');--> statement-breakpoint
CREATE TABLE "interviews" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"company" varchar(255) NOT NULL,
	"jobTitle" varchar(255) NOT NULL,
	"jobDescription" text NOT NULL,
	"contactType" "interview_contact_type" NOT NULL,
	"priority" "interview_priority",
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
