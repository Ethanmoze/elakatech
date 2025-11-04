# 🚀 Vercel Deployment Guide - Elaka Technologies Website

## Quick Start (5 Minutes)

### Step 1: Install Vercel CLI (Optional but Recommended)
```bash
npm install -g vercel
```

### Step 2: Login to Vercel
```bash
vercel login
```

### Step 3: Deploy
```bash
# From your project directory
vercel

# For production deployment
vercel --prod
```

### Step 4: Add Environment Variables
Go to your Vercel dashboard → Project Settings → Environment Variables:

Add these variables:
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=elakatech1@gmail.com
SMTP_PASS=your-gmail-app-password
COMPANY_EMAIL=elakatech1@gmail.com
```

---

## Alternative: Deploy via GitHub (Recommended)

### Method 1: GitHub Integration

1. **Push to GitHub:**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/elaka-website.git
git push -u origin main
```

2. **Import to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect settings (no build command needed for static sites)
   - Click "Deploy"

3. **Add Environment Variables:**
   - Go to Project Settings → Environment Variables
   - Add all SMTP variables listed above
   - Redeploy (Vercel will auto-redeploy after adding env vars)

---

## Environment Variables Setup

### For Gmail SMTP:

1. **Enable 2-Factor Authentication** on your Google Account
2. **Generate App Password:**
   - Go to: Google Account → Security → 2-Step Verification → App Passwords
   - Select "Mail" and your device
   - Copy the 16-character password

3. **Add to Vercel:**
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=elakatech1@gmail.com
   SMTP_PASS=xxxx xxxx xxxx xxxx  (your app password)
   COMPANY_EMAIL=elakatech1@gmail.com
   ```

### For Other SMTP Providers:

**SendGrid:**
```
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
```

**Mailgun:**
```
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USER=postmaster@your-domain.mailgun.org
SMTP_PASS=your-mailgun-password
```

---

## Project Structure

```
elaka-technologies-website/
├── api/
│   └── contact.js          # Vercel serverless function
├── new.html                 # Homepage
├── schools.html
├── energy.html
├── cybersecurity.html
├── digitalization.html
├── microsoft-cloud.html
├── microsoft-365.html
├── vercel.json              # Vercel configuration
├── package.json
└── ... (other files)
```

---

## Vercel Configuration

The `vercel.json` file is already configured with:
- ✅ Root redirect to `/new.html`
- ✅ API routes for `/api/*`
- ✅ Security headers
- ✅ Static file serving

**No changes needed** - it's ready to deploy!

---

## Testing After Deployment

1. **Test Contact Form:**
   - Visit your live site
   - Submit the contact form
   - Check if you receive email notification
   - Check customer auto-reply email

2. **Verify Function Logs:**
   - Go to Vercel Dashboard → Your Project → Functions
   - Click on `/api/contact`
   - Check logs for any errors

3. **Test All Pages:**
   - Homepage
   - Schools
   - Energy
   - Cybersecurity
   - Digitalization
   - Microsoft Cloud
   - Microsoft 365

---

## Custom Domain Setup

### 1. Add Domain in Vercel

1. Go to Project Settings → Domains
2. Add your custom domain (e.g., `elakatechnologies.com`)
3. Vercel will provide DNS records

### 2. Configure DNS

Add these records at your domain registrar:

**For apex domain (elakatechnologies.com):**
```
Type: A
Name: @
Value: 76.76.21.21
```

**For www subdomain:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### 3. SSL Certificate

Vercel automatically provisions SSL certificates via Let's Encrypt (takes a few minutes).

---

## Troubleshooting

### Contact Form Not Working?

1. **Check Environment Variables:**
   - Verify all SMTP variables are set correctly
   - Make sure no extra spaces or quotes

2. **Check Function Logs:**
   - Vercel Dashboard → Functions → `/api/contact` → Logs
   - Look for error messages

3. **Test SMTP Credentials:**
   - Verify Gmail app password is correct
   - Check if 2FA is enabled

4. **Check CORS:**
   - The function already includes CORS headers
   - If issues persist, check browser console

### Deployment Fails?

1. **Check Build Logs:**
   - Vercel Dashboard → Deployments → Click on failed deployment
   - Review build logs for errors

2. **Verify File Structure:**
   - Ensure `api/contact.js` exists
   - Ensure `vercel.json` exists
   - Ensure `package.json` exists

3. **Check Node Version:**
   - Vercel auto-detects Node.js version
   - Can be set in Project Settings if needed

---

## Performance Optimization

Vercel automatically provides:
- ✅ Global CDN
- ✅ Edge caching
- ✅ Automatic HTTPS
- ✅ Image optimization (if using Vercel Image Optimization)
- ✅ Serverless functions at edge locations

---

## Monitoring & Analytics

### Vercel Analytics (Optional)

1. Go to Project Settings → Analytics
2. Enable Web Analytics (free tier available)
3. Get insights on:
   - Page views
   - Performance metrics
   - User behavior

### Google Analytics

Already integrated! Just add your GA4 Measurement ID to all HTML files:
- Replace `G-XXXXXXXXXX` with your actual ID

---

## Continuous Deployment

### Automatic Deployments

When connected to GitHub:
- ✅ Every push to `main` branch = Production deployment
- ✅ Every push to other branches = Preview deployment
- ✅ Pull Requests = Preview deployment with unique URL

### Manual Deployment

```bash
vercel --prod
```

---

## Rollback Deployment

If something goes wrong:

1. Go to Vercel Dashboard → Deployments
2. Find the previous working deployment
3. Click "..." menu → "Promote to Production"

---

## Useful Vercel Commands

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod

# View deployment logs
vercel logs

# Link local project to Vercel
vercel link

# Remove deployment
vercel remove
```

---

## Support

- **Vercel Documentation:** https://vercel.com/docs
- **Vercel Support:** https://vercel.com/support
- **Function Logs:** Check in Vercel Dashboard

---

## Quick Checklist

Before going live:

- [ ] All environment variables set in Vercel
- [ ] Contact form tested
- [ ] All pages load correctly
- [ ] Mobile menu works on all pages
- [ ] Google Analytics ID added (if using)
- [ ] Custom domain configured (if using)
- [ ] SSL certificate active
- [ ] Test email notifications working

---

**Ready to deploy?** Run `vercel --prod` or connect your GitHub repo!

**Last Updated:** January 2025

