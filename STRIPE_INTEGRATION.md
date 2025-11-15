# Stripe Payment Integration Guide (Redacted)

This file previously contained example API keys. Those keys have been removed from the repository history for security reasons.

To configure Stripe keys, add them to your local environment variables and never commit them to git. Example `.env` entries (DO NOT COMMIT):

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_SECRET_KEY=sk_live_xxx
```

Refer to the project's `STRIPE_INTEGRATION.md` in the main branch or ask the team for the secure vault location for production keys.
