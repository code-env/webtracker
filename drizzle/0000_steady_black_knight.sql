CREATE TYPE "public"."DeviceType" AS ENUM('DESKTOP', 'MOBILE', 'TABLET');--> statement-breakpoint
CREATE TABLE "account" (
	"userId" uuid NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "account_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE "analytics" (
	"id" serial PRIMARY KEY NOT NULL,
	"projectId" integer,
	"totalPageVisits" integer DEFAULT 0,
	"totalVisitors" integer DEFAULT 0,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "analytics_projectId_unique" UNIQUE("projectId")
);
--> statement-breakpoint
CREATE TABLE "authenticator" (
	"credentialID" text NOT NULL,
	"userId" uuid NOT NULL,
	"providerAccountId" text NOT NULL,
	"credentialPublicKey" text NOT NULL,
	"counter" integer NOT NULL,
	"credentialDeviceType" text NOT NULL,
	"credentialBackedUp" boolean NOT NULL,
	"transports" text,
	CONSTRAINT "authenticator_userId_credentialID_pk" PRIMARY KEY("userId","credentialID"),
	CONSTRAINT "authenticator_credentialID_unique" UNIQUE("credentialID")
);
--> statement-breakpoint
CREATE TABLE "bugReport" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"status" text DEFAULT 'inReview',
	"ownerId" uuid NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "countryAnalytics" (
	"id" serial PRIMARY KEY NOT NULL,
	"analyticsId" integer,
	"countryCode" varchar(2) NOT NULL,
	"countryName" text NOT NULL,
	"visitors" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "deviceAnalytics" (
	"id" serial PRIMARY KEY NOT NULL,
	"analyticsId" integer,
	"deviceType" "DeviceType" NOT NULL,
	"visitors" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "osAnalytics" (
	"id" serial PRIMARY KEY NOT NULL,
	"analyticsId" integer,
	"osName" text NOT NULL,
	"visitors" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "project" (
	"id" serial PRIMARY KEY NOT NULL,
	"domain" text,
	"name" text NOT NULL,
	"description" text,
	"ownerId" uuid NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "project_domain_unique" UNIQUE("domain")
);
--> statement-breakpoint
CREATE TABLE "routeAnalytics" (
	"id" serial PRIMARY KEY NOT NULL,
	"analyticsId" integer,
	"route" text NOT NULL,
	"visitors" integer DEFAULT 0,
	"pageVisits" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "session" (
	"sessionToken" text PRIMARY KEY NOT NULL,
	"userId" uuid NOT NULL,
	"expires" timestamp NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "sourceAnalytics" (
	"id" serial PRIMARY KEY NOT NULL,
	"analyticsId" integer,
	"sourceName" text NOT NULL,
	"visitors" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text,
	"email" text,
	"emailVerified" timestamp,
	"image" text,
	"role" text DEFAULT 'USER',
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verificationToken" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "verificationToken_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
CREATE TABLE "visitData" (
	"id" serial PRIMARY KEY NOT NULL,
	"analyticsId" integer,
	"date" date NOT NULL,
	"pageVisits" integer DEFAULT 0,
	"visitors" integer DEFAULT 0
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "analytics" ADD CONSTRAINT "analytics_projectId_project_id_fk" FOREIGN KEY ("projectId") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "authenticator" ADD CONSTRAINT "authenticator_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bugReport" ADD CONSTRAINT "bugReport_ownerId_user_id_fk" FOREIGN KEY ("ownerId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "countryAnalytics" ADD CONSTRAINT "countryAnalytics_analyticsId_analytics_id_fk" FOREIGN KEY ("analyticsId") REFERENCES "public"."analytics"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "deviceAnalytics" ADD CONSTRAINT "deviceAnalytics_analyticsId_analytics_id_fk" FOREIGN KEY ("analyticsId") REFERENCES "public"."analytics"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "osAnalytics" ADD CONSTRAINT "osAnalytics_analyticsId_analytics_id_fk" FOREIGN KEY ("analyticsId") REFERENCES "public"."analytics"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project" ADD CONSTRAINT "project_ownerId_user_id_fk" FOREIGN KEY ("ownerId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "routeAnalytics" ADD CONSTRAINT "routeAnalytics_analyticsId_analytics_id_fk" FOREIGN KEY ("analyticsId") REFERENCES "public"."analytics"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sourceAnalytics" ADD CONSTRAINT "sourceAnalytics_analyticsId_analytics_id_fk" FOREIGN KEY ("analyticsId") REFERENCES "public"."analytics"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "visitData" ADD CONSTRAINT "visitData_analyticsId_analytics_id_fk" FOREIGN KEY ("analyticsId") REFERENCES "public"."analytics"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "country_analytics_idx" ON "countryAnalytics" USING btree ("analyticsId");--> statement-breakpoint
CREATE UNIQUE INDEX "unique_analytics_country" ON "countryAnalytics" USING btree ("analyticsId","countryCode");--> statement-breakpoint
CREATE INDEX "device_analytics_idx" ON "deviceAnalytics" USING btree ("analyticsId");--> statement-breakpoint
CREATE UNIQUE INDEX "unique_analytics_device" ON "deviceAnalytics" USING btree ("analyticsId","deviceType");--> statement-breakpoint
CREATE INDEX "os_analytics_idx" ON "osAnalytics" USING btree ("analyticsId");--> statement-breakpoint
CREATE UNIQUE INDEX "unique_analytics_os" ON "osAnalytics" USING btree ("analyticsId","osName");--> statement-breakpoint
CREATE INDEX "project_owner_idx" ON "project" USING btree ("ownerId");--> statement-breakpoint
CREATE INDEX "route_analytics_idx" ON "routeAnalytics" USING btree ("analyticsId");--> statement-breakpoint
CREATE UNIQUE INDEX "unique_analytics_route" ON "routeAnalytics" USING btree ("analyticsId","route");--> statement-breakpoint
CREATE INDEX "source_analytics_idx" ON "sourceAnalytics" USING btree ("analyticsId");--> statement-breakpoint
CREATE UNIQUE INDEX "unique_analytics_source" ON "sourceAnalytics" USING btree ("analyticsId","sourceName");--> statement-breakpoint
CREATE INDEX "visit_data_analytics_idx" ON "visitData" USING btree ("analyticsId");--> statement-breakpoint
CREATE INDEX "visit_data_date_idx" ON "visitData" USING btree ("date");--> statement-breakpoint
CREATE UNIQUE INDEX "unique_analytics_date" ON "visitData" USING btree ("analyticsId","date");