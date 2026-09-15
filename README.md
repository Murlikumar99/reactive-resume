# ResumeForge

**Build a resume that gets noticed.**

ResumeForge is a modern, free and open-source resume builder for students, developers, engineers, designers, academics, and professionals.

> **Original project attribution:** ResumeForge is a rebrand/derivative of the open-source [Reactive Resume](https://github.com/reactive-resume/reactive-resume) project. The original project was authored by Amruth Pillai and contributors. The original MIT License and required attribution are retained in this repository.

## Features

- Live resume editing and A4 preview
- Professional resume templates
- Custom colors, fonts, spacing, and section ordering
- Personal information, experience, education, skills, projects, certifications, languages, awards, and custom sections
- ATS checking tools
- Optional AI writing assistance
- PDF, JSON, and DOCX export support from the existing application
- Import/export workflows
- Responsive desktop and mobile builder
- Dark-first ResumeForge visual identity
- Privacy and open-source focused workflow

## Technology Stack

The current codebase is a TypeScript monorepo using TanStack Start/Vite, React, Tailwind CSS, TanStack Router/Query, Zustand, TipTap, and client-side PDF tooling. The application also contains the existing server/auth/database packages for full-stack/self-hosted deployments.

## Local Development

The repository uses pnpm workspaces.

```bash
pnpm install
pnpm dev
```

The root scripts also provide type checking and builds:

```bash
pnpm typecheck
pnpm build
```

## Vercel Deployment

ResumeForge now includes a Vercel configuration for the existing Vite web application. This does **not** convert the repository to Next.js: changing frameworks would be a separate migration with a materially higher risk to routing, authentication, exports, and the existing application architecture.

For the client/web portion, the repository is configured to build the `apps/web` Vite app and publish `apps/web/dist`.

### Deploy with Vercel

1. Push the repository to GitHub.
2. Open Vercel and choose **Add New → Project**.
3. Import the GitHub repository.
4. Keep the repository's detected Vite configuration or use the checked-in `vercel.json`.
5. Set the install command to `pnpm install --frozen-lockfile` and the build command to `pnpm run build` when Vercel asks for them.
6. Deploy.
7. Future pushes to the connected GitHub branch can trigger new Vercel deployments automatically.

### Environment Variables

The basic client-side ResumeForge web UI does not need a client-exposed secret. Keep secrets server-only.

Optional full-stack/server deployments may require values such as:

```text
APP_URL=
DATABASE_URL=
BETTER_AUTH_SECRET=
```

See `.env.example` for the current template.

## Deployment Notes

The current repository still contains the original full-stack server and database packages. Those are intentionally preserved because they support the existing authentication and server-side functionality. A Vercel-only, fully serverless conversion of those features requires a separate backend/storage/auth migration and should not be represented as complete merely by adding a Vercel config file.

The Vercel web build is therefore the safe deployment target for the front-end/web application while preserving the original architecture and functionality.

## Contributing

1. Fork the repository.
2. Create a feature branch.
3. Make focused changes and keep original attribution intact.
4. Run type checking and the build before opening a pull request.
5. Open a pull request with a clear description of the change.

## License

[MIT](./LICENSE)

The MIT License and original copyright/attribution notices from Reactive Resume remain part of this repository. ResumeForge does not claim the original source code was authored entirely by ResumeForge.
