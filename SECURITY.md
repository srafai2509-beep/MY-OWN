# Security Policy

## Reporting a vulnerability

Please do not publish credentials, client data, or exploitable details in a public issue. Contact the repository owner privately through GitHub's security reporting feature if it is enabled, or use a private communication channel already provided by the site owner. Include the affected URL/file, impact, and minimal reproduction steps.

## Required deployment configuration

- Set `NODE_ENV=production`.
- Set a unique `ADMIN_API_KEY` with at least 32 random characters in the server hosting environment. Do not prefix it with `VITE_` and never place it in frontend code.
- Configure SMTP credentials only in the hosting provider's secret/environment settings.
- Use HTTPS at the hosting edge. HSTS is emitted only when `NODE_ENV=production`; do not use the service over plain HTTP in production.
- If running behind a reverse proxy, set `TRUST_PROXY_HOPS` to the exact number of trusted proxies only after verifying the hosting topology. Leave it unset for direct connections. Never trust arbitrary client-supplied `X-Forwarded-For`.
- Keep dependencies updated and review CI results before merging.
- Restrict repository write access and enable secret scanning/push protection and Dependabot alerts in GitHub settings where available.

## Data handling notes

The quotation endpoint processes names, contact details, and project briefs. Treat all submissions as personal data. The current application stores submissions in process memory, so they are lost on restart and are not a durable database. Do not expose administrative quotation data publicly. Add retention, deletion, access logging, and an appropriate persistent store before relying on this for production client records.

## Scope

Security controls reduce risk but cannot guarantee that a website is completely secure. Test the deployed host, headers, authentication, form behavior, dependencies, and recovery process before accepting sensitive client data.
