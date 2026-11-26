# Protege Schools website

An elegant, responsive school website starter built with **Next.js App Router, TypeScript, Tailwind CSS, Supabase, and Nodemailer**.

## Included

- Landing page with school introduction, values, highlights, and calls to action.
- Gallery page that reads published images from Supabase, with polished sample images as a fallback.
- Public blog with administrator-managed posts and comments moderated before publication.
- Contact page with a validated form, click-to-call phone link, WhatsApp chat link, and email link.
- Contact API route that saves enquiries to Supabase and sends an email notification via Gmail SMTP/Nodemailer.
- Admin login using Supabase Auth, an admin dashboard, editable homepage heading/tagline, gallery add/delete, enquiry review, and enquiry status updates.
- TypeScript strict mode and shared types for gallery items, enquiries, and contact form data.
- Supabase SQL schema and row-level security (RLS) policies.

## 1. Install and run

Use Node.js 20 or newer.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## 2. Configure Supabase

1. Create a project at [Supabase](https://supabase.com/).
2. Open **SQL Editor** and run `supabase/schema.sql`. It creates the tables and seeds the current homepage heading/tagline and built-in gallery items. The seed can be rerun safely; existing homepage text and seeded gallery items are not overwritten.
3. In **Project Settings → API**, copy the project URL and anon/publishable key into `.env.local`. If you already set up the website, rerun the updated `supabase/schema.sql` to add the new gallery metadata columns and seed the current website content.
4. In **Authentication → Providers**, ensure Email/password sign-in is enabled. Keep public sign-ups disabled if only staff should use the admin area.
5. In **Authentication → Users**, create the admin user. Copy the user's UUID and run the `insert into public.admins...` statement at the bottom of `supabase/schema.sql` with the real UUID.
6. Sign in at `/admin/login`.

The app checks the authenticated user and confirms the user exists in `public.admins`. RLS policies separately protect admin data operations. Never expose a Supabase service-role key in browser code.

## Blog and comments

Sign in at `/admin` to edit the homepage heading and tagline under **Home page**, manage gallery items, and review enquiries. Under **Blog posts**, create or edit posts. Posts stay as drafts until published. The public blog is available at `/blog`. Visitors can submit comments on each post; they remain hidden until an administrator approves them under **Blog comments**, where comments can also be edited or deleted. Blog content is plain text, so paragraphs and line breaks are preserved without rendering HTML.

## 3. Configure Gmail / Nodemailer

For a Gmail inbox:

1. Enable 2-Step Verification on the Google account.
2. Create an **App Password** in the Google Account security settings (if eligible).
3. Set `SMTP_HOST=smtp.gmail.com`, `SMTP_PORT=465`, `SMTP_SECURE=true`, `SMTP_USER`, `SMTP_APP_PASSWORD`, and `CONTACT_TO_EMAIL` in `.env.local`.
4. Restart the development server after changing environment variables.

Use an App Password, not your regular Gmail password. If SMTP is not configured or email delivery temporarily fails, the contact enquiry is still stored in Supabase; check the server logs for notification failures.

## 4. Configure school contact details

Set these values in `.env.local`:

- `NEXT_PUBLIC_WHATSAPP_NUMBER`: international number using digits only (for Nigeria, start with `234`, omit the leading `0`, plus sign, spaces, and punctuation).
- `NEXT_PUBLIC_SCHOOL_PHONE`: display/call number.
- `NEXT_PUBLIC_SCHOOL_EMAIL`: school inbox shown on the website.

Update the placeholder address in `components/site-footer.tsx` and `app/contact/page.tsx`.

## 5. Gallery images

The admin dashboard currently accepts an image URL. Use stable, publicly accessible HTTPS image URLs. For production, consider adding a Supabase Storage bucket and uploading images directly rather than relying on third-party URLs. The sample images are placeholders; replace them with approved Protege Schools photos before launch and confirm that you have permission to publish photos of children.

## 6. Build checks

```bash
npm run build
```

Before launch, add a rate limit or CAPTCHA to the public contact endpoint, set up monitoring/backups, verify the school's legal/privacy notices, and test all RLS policies in a non-production project. This starter intentionally does not use a service-role key.
