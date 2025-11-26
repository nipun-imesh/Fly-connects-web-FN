# Deployment Guide - Fix 404 Errors on Page Refresh

## Problem
When refreshing pages like `/tours`, `/about`, or `/contact` on mobile (or any device), you get a 404 error. This is because the server looks for physical files at those paths.

## Solution Implemented

Multiple solutions have been implemented to fix this across all hosting platforms:

---

## ✅ What Was Fixed

### 1. **React Router - Catch-all Route**
Added a fallback route in `App.tsx` that redirects unknown routes to home page.

### 2. **404.html Fallback**
Created `public/404.html` that redirects to index.html for static hosts.

### 3. **Index.html Script**
Added script to restore URL after 404 redirect.

### 4. **Server Configurations**
- ✅ Vercel: `vercel.json` with rewrites
- ✅ Netlify: `netlify.toml` + `_redirects`
- ✅ Apache: `.htaccess` file
- ✅ All files automatically copied to `dist/` on build

---

## 🚀 Deployment Instructions

### **Option 1: Vercel (Recommended)**

1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Vercel will auto-detect Vite and use these settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
5. Deploy!

**The `vercel.json` file will handle all routing automatically.**

---

### **Option 2: Netlify**

1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [netlify.com](https://netlify.com)
3. Import your repository
4. Use these build settings:
   - Build Command: `npm run build`
   - Publish Directory: `dist`
5. Deploy!

**The `netlify.toml` and `_redirects` files will handle routing.**

---

### **Option 3: Apache/cPanel/Shared Hosting**

1. Build your project locally:
   ```bash
   npm run build
   ```

2. Upload the **entire `dist` folder contents** to your server's public directory (usually `public_html` or `www`)

3. Make sure these files are uploaded:
   - ✅ `index.html`
   - ✅ `.htaccess`
   - ✅ `404.html`
   - ✅ `_redirects`
   - ✅ `assets/` folder

**The `.htaccess` file will handle routing on Apache servers.**

---

### **Option 4: GitHub Pages**

1. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Add to `package.json` scripts:
   ```json
   "scripts": {
     "deploy": "npm run build && gh-pages -d dist"
   }
   ```

3. Deploy:
   ```bash
   npm run deploy
   ```

**The `404.html` file will handle routing on GitHub Pages.**

---

## 🧪 Testing the Fix

### **Local Testing:**

1. Build the project:
   ```bash
   npm run build
   ```

2. Preview the build:
   ```bash
   npm run preview
   ```

3. Open in browser (e.g., `http://localhost:4173`)

4. Navigate to `/tours` and refresh - **should work!**

5. Navigate to `/about` and refresh - **should work!**

6. Navigate to `/contact` and refresh - **should work!**

### **Mobile Testing:**

1. After deploying, open your site on mobile
2. Navigate to any page (Tours, About, Contact)
3. Pull down to refresh the page
4. ✅ Should reload without 404 error

---

## 📋 Checklist Before Deployment

- [ ] Run `npm run build` successfully
- [ ] Check `dist/` folder contains:
  - [ ] `index.html`
  - [ ] `.htaccess`
  - [ ] `404.html`
  - [ ] `_redirects`
  - [ ] `assets/` folder with JS/CSS
- [ ] Test locally with `npm run preview`
- [ ] Commit and push all changes
- [ ] Deploy to your hosting platform
- [ ] Test on mobile after deployment

---

## 🔧 If Still Having Issues

### **Clear Browser Cache:**
```
Mobile Safari: Settings > Safari > Clear History and Website Data
Mobile Chrome: Settings > Privacy > Clear Browsing Data
```

### **Check Server Configuration:**
- Verify `.htaccess` is uploaded (if using Apache)
- Check that `dist/` folder contents are in the root directory
- Ensure all files have correct permissions (644 for files, 755 for folders)

### **Force Refresh:**
- iOS: Pull down to refresh
- Android: Pull down to refresh or use browser refresh button

### **Redeploy:**
If you deployed before these fixes:
1. Delete the old deployment
2. Run `npm run build` again
3. Deploy fresh

---

## 🎯 How It Works

1. User refreshes on `/tours`
2. Server tries to find `/tours` file
3. Server configuration redirects to `/index.html`
4. React Router takes over and shows the Tours page
5. URL stays as `/tours` (no visible redirect)

---

## 📞 Platform-Specific Help

**Vercel:** https://vercel.com/docs/frameworks/vite
**Netlify:** https://docs.netlify.com/routing/redirects/
**Apache:** Check if mod_rewrite is enabled
**cPanel:** Contact host to enable mod_rewrite

---

## ✅ Expected Result

After deployment:
- ✅ Clicking navigation links works
- ✅ Refreshing any page works (no 404)
- ✅ Direct URL access works
- ✅ Mobile refresh works
- ✅ Browser back/forward works

The 404 error should now be completely fixed! 🎉
