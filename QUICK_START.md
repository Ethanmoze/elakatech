# ⚡ Quick Start Guide

## 🎯 Get Your Website Live in 30 Minutes

### Step 1: Install (2 minutes)
```bash
npm install
```

### Step 2: Configure Email (5 minutes)

**Using Gmail:**
1. Go to Google Account → Security → 2-Step Verification → App Passwords
2. Create app password for "Mail"
3. Create `.env` file:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=elakatech1@gmail.com
SMTP_PASS=your-16-char-app-password
COMPANY_EMAIL=elakatech1@gmail.com
```

### Step 3: Setup Google Analytics (3 minutes)
1. Visit [analytics.google.com](https://analytics.google.com)
2. Create property → Get Measurement ID
3. Find-Replace `G-XXXXXXXXXX` with your ID in all `.html` files

### Step 4: Setup Live Chat (2 minutes)
1. Sign up at [crisp.chat](https://crisp.chat)
2. Get Website ID
3. Find-Replace `YOUR_CRISP_WEBSITE_ID` in all `.html` files

### Step 5: Deploy to Netlify (10 minutes)

**Option A: GitHub (Recommended)**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```
Then connect to Netlify via their dashboard.

**Option B: Direct Deploy**
```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

### Step 6: Add Environment Variables in Netlify (5 minutes)
In Netlify dashboard:
- Site Settings → Build & Deploy → Environment
- Add: `SMTP_USER`, `SMTP_PASS`, `COMPANY_EMAIL`

### Step 7: Test (3 minutes)
- [ ] Visit your live site
- [ ] Submit contact form
- [ ] Check if you receive email
- [ ] Check customer auto-reply
- [ ] Test live chat

---

## 🔑 Important IDs to Replace

| What | Where | Replace This | With |
|------|-------|-------------|------|
| Google Analytics | All HTML files | `G-XXXXXXXXXX` | Your GA4 ID |
| Crisp Chat | All HTML files | `YOUR_CRISP_WEBSITE_ID` | Your Crisp ID |
| Domain | sitemap.xml | `elakatechnologies.com` | Your domain |
| Phone | new.html (line ~676) | `+256-XXX-XXXXXX` | Your phone |

---

## 🔒 Security - MUST DO!

1. **Change Admin Password**
   - File: `admin/index.html` (line 284)
   - Change: `admin` / `elaka2025`
   - To: Your credentials

2. **Never Commit `.env`**
   - Already in `.gitignore`
   - Double-check before pushing to GitHub

---

## 📱 Access URLs

| Page | URL |
|------|-----|
| Homepage | `https://your-site.netlify.app/` |
| Admin Panel | `https://your-site.netlify.app/admin/` |
| Netlify Dashboard | https://app.netlify.com/ |
| Google Analytics | https://analytics.google.com/ |
| Crisp Dashboard | https://app.crisp.chat/ |

---

## 🆘 Common Issues

### Form not sending emails?
1. Check Netlify function logs
2. Verify environment variables are set
3. Test SMTP credentials
4. Check spam folder

### Analytics not working?
1. Wait 24-48 hours for data
2. Disable ad blockers when testing
3. Check browser console for errors

### Chat not appearing?
1. Verify Website ID is correct
2. Hard refresh browser (Ctrl+F5)
3. Check browser console

---

## 📞 Quick Support

- **Netlify Issues:** https://answers.netlify.com/
- **Email Problems:** Check SMTP provider docs
- **Analytics:** https://support.google.com/analytics/

---

**Ready? Start with Step 1! ⬆️**


