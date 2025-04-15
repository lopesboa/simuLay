import * as Sentry from "@sentry/nextjs";

Sentry.init({
	dsn: process.env.SENTRY_DSN,
	enabled: process.env.NODE_ENV === "production",
	integrations: [
		Sentry.replayIntegration({
			blockAllMedia: true,
			maskAllText: true,
		}),
		Sentry.browserTracingIntegration(),
	],
	tracesSampleRate: 1,
	replaysSessionSampleRate: 0.1,
	replaysOnErrorSampleRate: 1.0,
	debug: false,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
