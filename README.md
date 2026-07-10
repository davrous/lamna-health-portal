This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Deploy to Azure

This repo ships with `azure.yaml`, Bicep infrastructure in `infra/`, and a
`Dockerfile`, so the portal can be deployed to **Azure Container Apps** with the
[Azure Developer CLI](https://learn.microsoft.com/azure/developer/azure-developer-cli/):

```bash
azd auth login
azd up
```

`azd up` provisions the infrastructure, builds the container image remotely with
ACR Tasks (no local Docker daemon needed), and deploys the `web` service. A live
URL makes the demo far stronger. Fictional data only — internal enablement.

## Security

Security is enforced with GitHub Advanced Security (free on public repos):

- **Code scanning (CodeQL) — Default setup:** scans every pull request
  automatically (Settings → Advanced Security → Code scanning → CodeQL → Set up →
  Default → Enable).
- **Copilot Autofix:** on automatically with code scanning on public repos;
  proposes fixes for detected alerts directly in the PR.
- **Dependabot:** alerts + security updates enabled.
- **Secret scanning + push protection:** enabled to block committed secrets.

No real secrets live in the repo — use `.env.example` placeholders. The single
intentional demo vulnerability (documented in `docs/demo-vulnerability.md`) exists
**only** in the on-camera PR, never on `main`.
