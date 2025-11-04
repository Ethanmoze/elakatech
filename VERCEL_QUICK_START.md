# ⚡ Quick Vercel Deployment

## Fastest Way (GitHub)

1. **Push to GitHub:**
```bash
git add .
git commit -m "Ready for Vercel"
git push
```

2. **Import to Vercel:**
   - Visit [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repo
   - Click "Deploy"

3. **Add Environment Variables:**
   - Project Settings → Environment Variables
   - Add:
     ```
     SMTP_HOST=smtp.gmail.com
     SMTP_PORT=587
     SMTP_USER=elakatech1@gmail.com
     SMTP_PASS=your-app-password
     COMPANY_EMAIL=elakatech1@gmail.com
     ```

4. **Done!** Your site is live.

---

## Via CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

Then add environment variables in dashboard.

---

## Environment Variables Needed

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=elakatech1@gmail.com
SMTP_PASS=your-gmail-app-password
COMPANY_EMAIL=elakatech1@gmail.com
```

**Get Gmail App Password:**
- Google Account → Security → 2-Step Verification → App Passwords

---

## That's It!

Your site is now live on Vercel with:
✅ Working contact forms
✅ Email notifications
✅ Fast global CDN
✅ Automatic HTTPS
✅ Serverless functions

See `VERCEL_DEPLOYMENT.md` for detailed guide.

