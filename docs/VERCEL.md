# ResumeForge on Vercel

## Current architecture

ResumeForge uses the repository's existing TanStack Start/Vite web application. This branch adds Vercel configuration for the web build without performing a risky framework migration to Next.js.

## Deploy

1. Push this repository to GitHub.
2. In Vercel, select **Add New → Project**.
3. Import the GitHub repository.
4. Keep the checked-in Vercel settings:
   - Install: `pnpm install --frozen-lockfile`
   - Build: `pnpm run build`
   - Output: `apps/web/dist`
5. Deploy.
6. Subsequent pushes to the connected branch can trigger automatic Vercel deployments.

## Environment variables

The web UI does not require a public client secret for its basic build. Use server-only variables for optional full-stack infrastructure.

## Important limitation

The repository still contains the original server, authentication, database, and optional storage packages. Those are preserved to avoid breaking the application's existing full-stack functionality. A true backend-free Hobby deployment of authentication, persistence, and server APIs requires a separate storage/auth migration.
