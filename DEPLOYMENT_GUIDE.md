# Elaka Technologies Website - Deployment Guide

## 🚀 Complete Setup & Deployment Instructions

### 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Local Development Setup](#local-development-setup)
3. [Email Configuration](#email-configuration)
4. [Google Analytics Setup](#google-analytics-setup)
5. [Live Chat Setup](#live-chat-setup)
6. [Deployment to Netlify](#deployment-to-netlify)
7. [CMS Admin Access](#cms-admin-access)
8. [SEO Configuration](#seo-configuration)

---

## Prerequisites

Before deploying, make sure you have:
- A Netlify account (free tier works)
- Gmail or SMTP email account
- Google Analytics 4 property
- Crisp account for live chat (optional)

---

## Local Development Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Local Server

```bash
npm run dev
```

This will start a live server at `http://localhost:8080`

---

## Email Configuration

### Option 1: Using Gmail

1. Go to your Google Account settings
2. Enable 2-Factor Authentication
3. Generate an App Password:
   - Go to Security → 2-Step Verification → App Passwords
   - Select "Mail" and your device
   - Copy the generated 16-character password

4. Create `.env` file in root directory:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-char-app-password
COMPANY_EMAIL=elakatech1@gmail.com
```

### Option 2: Using Other SMTP Services

For SendGrid, Mailgun, or other services, update the `.env` file with their SMTP credentials.

---

## Google Analytics Setup

### 1. Create GA4 Property

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new property
3. Get your Measurement ID (format: `G-XXXXXXXXXX`)

### 2. Update Website

Replace `G-XXXXXXXXXX` in these files with your actual Measurement ID:

**new.html** (line 39):
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-YOUR-ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-YOUR-ID');
</script>
```

Repeat for all other pages: `schools.html`, `energy.html`, `cybersecurity.html`, `digitalization.html`, `microsoft-cloud.html`, `microsoft-365.html`

---

## Live Chat Setup (Crisp)

### 1. Create Crisp Account

1. Go to [Crisp.chat](https://crisp.chat/)
2. Sign up for free account
3. Add your website
4. Get your Website ID

### 2. Update Website

Replace `YOUR_CRISP_WEBSITE_ID` in **new.html** (line 1330):

```javascript
window.CRISP_WEBSITE_ID="your-actual-website-id";
```

Repeat for all pages or remove the Crisp script if not needed.

---

## Deployment to Netlify

### Method 1: GitHub Integration (Recommended)

1. **Push to GitHub:**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/elaka-website.git
git push -u origin main
```

2. **Deploy on Netlify:**
   - Go to [Netlify](https://www.netlify.com/)
   - Click "New site from Git"
   - Connect your GitHub repository
   - Build settings:
     - Build command: (leave empty)
     - Publish directory: `.`
   - Click "Deploy site"

3. **Add Environment Variables:**
   - Go to Site settings → Build & deploy → Environment
   - Add all variables from `.env` file:
     ```
     SMTP_HOST
     SMTP_PORT
     SMTP_USER
     SMTP_PASS
     COMPANY_EMAIL
     ```

### Method 2: Netlify CLI

1. **Install Netlify CLI:**
```bash
npm install -g netlify-cli
```

2. **Login:**
```bash
netlify login
```

3. **Deploy:**
```bash
netlify init
netlify deploy --prod
```

4. **Add Environment Variables:**
```bash
netlify env:set SMTP_USER "your-email@gmail.com"
netlify env:set SMTP_PASS "your-app-password"
netlify env:set COMPANY_EMAIL "elakatech1@gmail.com"
```

---

## CMS Admin Access

### 1. Access Admin Panel

Navigate to: `https://your-site.netlify.app/admin/`

### 2. Default Credentials

**⚠️ IMPORTANT: Change these immediately in production!**

- Username: `admin`
- Password: `elaka2025`

### 3. Change Admin Password

Edit `admin/index.html` (line 284):
```javascript
const DEFAULT_USERNAME = 'your-username';
const DEFAULT_PASSWORD = 'your-secure-password';
```

---

## SEO Configuration

### 1. Update sitemap.xml

Replace `https://elakatechnologies.com` with your actual domain throughout `sitemap.xml`.

### 2. Update Structured Data

Edit `new.html` structured data (lines 661-731):
- Update contact information
- Add actual phone number
- Update social media links
- Verify address details

### 3. Update Meta Tags

For each page, update:
- Page titles
- Meta descriptions
- Open Graph images
- Canonical URLs

### 4. Submit to Search Engines

After deployment:

**Google Search Console:**
1. Go to [Google Search Console](https://search.google.com/search-console/)
2. Add your property
3. Verify ownership
4. Submit sitemap: `https://your-domain.com/sitemap.xml`

**Bing Webmaster Tools:**
1. Go to [Bing Webmaster](https://www.bing.com/webmasters/)
2. Add and verify your site
3. Submit sitemap

---

## Testing Checklist

Before going live, test:

- [ ] All navigation links work
- [ ] Contact form submissions work
- [ ] Email notifications are received
- [ ] Auto-reply emails are sent
- [ ] Live chat widget appears
- [ ] Google Analytics tracking works
- [ ] All pages are mobile responsive
- [ ] Images load properly
- [ ] Site loads on different browsers
- [ ] Check site on [PageSpeed Insights](https://pagespeed.web.dev/)
- [ ] Verify structured data on [Schema Validator](https://validator.schema.org/)

---

## Custom Domain Setup

### 1. On Netlify

1. Go to Site settings → Domain management
2. Click "Add custom domain"
3. Enter your domain (e.g., `elakatechnologies.com`)

### 2. DNS Configuration

Add these records to your domain registrar:

**For apex domain (elakatechnologies.com):**
```
Type: A
Name: @
Value: 75.2.60.5
```

**For www subdomain:**
```
Type: CNAME
Name: www
Value: your-site.netlify.app
```

### 3. Enable HTTPS

Netlify automatically provisions SSL certificate (Let's Encrypt).

---

## Ongoing Maintenance

### Update Content

1. For simple text changes: Edit HTML files directly
2. For complex changes: Use the CMS admin panel at `/admin/`
3. To add blog posts: Create new HTML pages or integrate a headless CMS

### Monitor Performance

- Check Google Analytics weekly
- Review contact form submissions in CMS
- Monitor site speed with PageSpeed Insights
- Check for broken links monthly

### Backup

- Keep your GitHub repository updated
- Netlify automatically keeps deployment history
- Export form submissions regularly

---

## Support & Troubleshooting

### Contact Form Not Working

1. Check Netlify function logs
2. Verify environment variables are set
3. Test SMTP credentials separately
4. Check spam folder for auto-reply emails

### Analytics Not Tracking

1. Verify GA4 Measurement ID is correct
2. Check browser console for errors
3. Disable ad blockers when testing
4. Wait 24-48 hours for data to appear

### Live Chat Not Appearing

1. Verify Crisp Website ID is correct
2. Check browser console for loading errors
3. Ensure script is before closing `</body>` tag

---

## Performance Optimization Tips

1. **Compress Images:**
   - Use tools like TinyPNG or ImageOptim
   - Convert to WebP format
   - Target < 200KB per image

2. **Enable Caching:**
   - Already configured in `netlify.toml`

3. **Monitor Core Web Vitals:**
   - Use Google PageSpeed Insights
   - Aim for > 90 score

4. **CDN:**
   - Netlify automatically uses CDN
   - No additional configuration needed

---

## Security Best Practices

1. **Change default admin password immediately**
2. **Use environment variables for all secrets**
3. **Enable HTTPS (automatic on Netlify)**
4. **Regular security headers** (configured in `netlify.toml`)
5. **Keep dependencies updated:** `npm update`

---

## Need Help?

For technical support:
- Email: elakatech1@gmail.com
- Check Netlify documentation: https://docs.netlify.com/
- Node.js documentation: https://nodejs.org/docs/

---

**Last Updated:** October 21, 2025
**Version:** 1.0.0


