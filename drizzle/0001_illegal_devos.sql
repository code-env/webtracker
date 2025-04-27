CREATE TABLE "performanceAnalytics" (
	"id" serial PRIMARY KEY NOT NULL,
	"analyticsId" integer,
	"loadTime" integer,
	"domReady" integer,
	"networkLatency" integer,
	"processingTime" integer,
	"totalTime" integer,
	"date" date NOT NULL,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "performanceAnalytics" ADD CONSTRAINT "performanceAnalytics_analyticsId_analytics_id_fk" FOREIGN KEY ("analyticsId") REFERENCES "public"."analytics"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "performance_analytics_idx" ON "performanceAnalytics" USING btree ("analyticsId");--> statement-breakpoint
CREATE INDEX "performance_date_idx" ON "performanceAnalytics" USING btree ("date");