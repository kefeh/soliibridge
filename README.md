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

## Contact & career submissions

The contact form and the careers application form post to `/api/submissions/contact` and
`/api/submissions/career`. Every submission is saved first (SQLite in `.data/cms.db`, resumes
in `.data/uploads/`) and is then emailed to the address in the CMS contact details (Admin > Contact > Email, read at send
time; separate several addresses with commas) when SMTP is configured. Editors can read everything, download resumes, mark messages read and
delete them at `/admin/inbox`, so nothing depends on the mailbox.

- Set `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` (see `.env.example`). Without `SMTP_HOST`
  the inbox still works and each entry shows "Email not configured".
- In production, keep `.data/` on a persistent volume and run a single instance.
- Spam protection: hidden honeypot field plus an in-memory per-IP limit (5 messages or 3
  applications per 10 minutes). Resumes must be PDF/DOC/DOCX, up to 5MB, and are checked by content.
