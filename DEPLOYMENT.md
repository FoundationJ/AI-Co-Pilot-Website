# Deployment Guide

## Deploying to Vercel (Recommended)

Vercel is the easiest way to deploy Next.js applications.

### Prerequisites

1. Push your code to GitHub, GitLab, or Bitbucket
2. Create a Vercel account at [vercel.com](https://vercel.com)

### Steps

1. **Import Project**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click "Import Git Repository"
   - Select your repository

2. **Configure Environment Variables**
   
   Add these in Vercel dashboard under "Environment Variables":
   
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
   NEXT_PUBLIC_SANITY_USE_CDN=true
   ```

3. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your site is live!

### Auto-Deploy

Vercel automatically redeploys when you push to your main branch.

---

## Deploying Sanity Studio

You have two options for hosting Sanity Studio:

### Option 1: Sanity Cloud (Recommended)

Deploy Studio to Sanity's infrastructure:

```bash
npm run sanity:deploy
```

Your studio will be available at:
```
https://your-project-name.sanity.studio
```

**Benefits**:
- Free hosting
- Automatic SSL
- Fast CDN
- No maintenance

### Option 2: Self-Host with Vercel

Host Studio in the same Next.js project:

1. Create `/app/studio/[[...tool]]/page.tsx`:

```tsx
'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '@/sanity/sanity.config'

export default function StudioPage() {
  return <NextStudio config={config} />
}
```

2. Update `.gitignore`:
```
# Don't ignore sanity config
!/sanity/
```

3. Deploy to Vercel as normal

Studio will be at: `https://your-domain.com/studio`

**Note**: This increases bundle size significantly.

---

## Deploy to Other Platforms

### Netlify

1. Connect your Git repository
2. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
3. Add environment variables
4. Deploy

### Railway

1. Create new project from GitHub
2. Add environment variables
3. Railway auto-detects Next.js and deploys

### Self-Hosted (VPS)

Requirements:
- Node.js 18+
- PM2 or similar process manager

```bash
# Build
npm run build

# Start with PM2
pm2 start npm --name "nextjs-app" -- start

# Or with node
NODE_ENV=production node .next/standalone/server.js
```

---

## Environment Variables

### Required for Production

```env
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123xyz
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
NEXT_PUBLIC_SANITY_USE_CDN=true
```

### Optional

```env
# Sanity Write Token (only if mutations needed from frontend)
SANITY_API_TOKEN=skXXXXXXXXXXXX

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Contact Form (if integrated)
SENDGRID_API_KEY=SG.XXXX
CONTACT_EMAIL=hello@example.com
```

---

## Production Checklist

### Before Deploying

- [ ] All environment variables configured
- [ ] Sanity content created and published
- [ ] Test locally with production build: `npm run build && npm start`
- [ ] Check all routes work
- [ ] Verify PDF download works
- [ ] Test on mobile devices
- [ ] Check page load performance
- [ ] Validate SEO metadata

### Post-Deploy

- [ ] Verify all pages load correctly
- [ ] Test Sanity Studio access
- [ ] Check ISR is working (content updates within 60s)
- [ ] Verify PDF downloads
- [ ] Test contact form (if enabled)
- [ ] Check Google Analytics (if configured)
- [ ] Test mobile responsiveness
- [ ] Validate SSL certificate

---

## Domain Setup

### Custom Domain on Vercel

1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```
4. Wait for propagation (5 minutes - 24 hours)

### SSL Certificate

Vercel automatically provisions SSL certificates via Let's Encrypt.

---

## CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run build
      - run: npm run type-check
```

---

## Monitoring

### Error Tracking

Integrate Sentry:

```bash
npm install @sentry/nextjs
```

```js
// next.config.js
const { withSentryConfig } = require('@sentry/nextjs')

module.exports = withSentryConfig({
  // ... your config
}, {
  silent: true,
  org: 'your-org',
  project: 'your-project',
})
```

### Analytics

Add Google Analytics:

```tsx
// app/layout.tsx
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
  `}
</Script>
```

---

## Performance Optimization

### Image Optimization

Next.js automatically optimizes images. Make sure to use:

```tsx
import Image from 'next/image'

<Image
  src={urlFor(image).url()}
  alt="Description"
  width={1200}
  height={800}
/>
```

### Bundle Analysis

```bash
npm install @next/bundle-analyzer

# Analyze bundle
ANALYZE=true npm run build
```

### Caching Strategy

- Static pages: Cached indefinitely
- ISR pages: Revalidated every 60 seconds
- API routes: No cache by default

---

## Troubleshooting

### Build Fails

**Error**: "Module not found"
- Solution: Ensure all dependencies in `package.json`
- Run: `npm install` locally first

**Error**: "TypeScript errors"
- Solution: Fix type errors or set `typescript.ignoreBuildErrors: true` in `next.config.js`

### Content Not Updating

- Check ISR revalidation (60 seconds)
- Verify content is published in Sanity
- Clear Vercel cache: Settings → Data Cache → Purge

### PDF Download Not Working

- Verify file is uploaded in Sanity
- Check CORS settings if self-hosting Sanity
- Test URL directly: `pdfFile.asset.url`

### Slow Performance

- Enable Sanity CDN: `NEXT_PUBLIC_SANITY_USE_CDN=true`
- Use Next.js Image component
- Enable caching headers
- Consider upgrading Vercel plan

---

## Backup Strategy

### Sanity Backups

Sanity automatically backs up your data. You can also export:

```bash
# Export dataset
npx sanity dataset export production backup.tar.gz

# Import dataset
npx sanity dataset import backup.tar.gz production
```

### Code Backups

- Git is your backup
- Tag releases: `git tag v1.0.0`
- Use GitHub's release feature

---

## Support

For deployment issues:

- **Vercel**: [vercel.com/support](https://vercel.com/support)
- **Sanity**: [sanity.io/help](https://www.sanity.io/help)
- **Next.js**: [nextjs.org/docs](https://nextjs.org/docs)

---

## Cost Estimation

### Free Tier

- **Vercel**: Free for personal projects
- **Sanity**: Free up to 3 users, 100k documents
- **Total**: $0/month

### Pro Tier

- **Vercel Pro**: $20/month (better performance, analytics)
- **Sanity Growth**: $99/month (more users, higher limits)
- **Total**: $119/month

Most small-medium sites stay on free tier indefinitely.
