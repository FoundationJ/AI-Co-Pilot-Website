# AI Co-Pilot Portfolio

A Next.js portfolio website with Sanity CMS, featuring a calm Linear-inspired aesthetic with typography-first design, high contrast, and generous whitespace.

## Tech Stack

- **Next.js 14** (App Router, TypeScript)
- **Sanity v3** (Headless CMS)
- **Tailwind CSS** (Styling)
- **shadcn/ui** (UI Components)
- **Vercel** (Deployment-ready)

## Features

- 📝 Headless CMS with Sanity Studio
- 🎨 Linear-inspired minimal design
- 📄 PDF downloads from Sanity
- 🏢 Case studies with structured sections
- 🎤 Talks/speaking engagements tracker
- 📱 Fully responsive
- ⚡ ISR with 60-second revalidation

## Getting Started

### 1. Create a Sanity Project

1. Go to [https://sanity.io](https://sanity.io)
2. Sign up or log in
3. Click "Create new project"
4. Name your project (e.g., "AI Co-Pilot Portfolio")
5. Choose a dataset name (typically "production")
6. Copy your **Project ID** (found in project settings)

### 2. Configure Environment Variables

```bash
# Copy the example env file
cp .env.local.example .env.local
```

Edit `.env.local` and add your Sanity credentials:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id-here
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
NEXT_PUBLIC_SANITY_USE_CDN=true
```

### 3. Install Dependencies

```bash
yarn install
```

### 4. Run Sanity Studio

In a separate terminal, start the Sanity Studio:

```bash
npm run sanity
```

The Studio will open at [http://localhost:3333](http://localhost:3333)

### 5. Create Required Content

In Sanity Studio, create these singleton documents:

#### Site Settings
- Navigate to "Site Settings"
- Add:
  - Site Title: "AI Co-Pilot"
  - Description: Your site description
  - Logo: "AI Co-Pilot"
  - Navigation items (already configured in code)
- Publish

#### Home Page
- Navigate to "Home Page"
- Add:
  - Headline: "Intelligent systems that augment human capability"
  - Subheadline: "We build AI co-pilots that empower teams to work faster, smarter, and more creatively."
  - CTA Text: "View Playbook"
  - CTA Link: "/playbook"
- Publish

#### Playbook (Optional PDF)
- Navigate to "Playbook"
- Add:
  - Title: "AI Co-Pilot Playbook"
  - Description: Your playbook description
  - Content: Rich text content
  - PDF File: Upload your playbook PDF (optional)
- Publish

#### Framework Page
- Navigate to "Framework Page"
- Add:
  - Title: "Our Framework"
  - Description: How you approach projects
  - Sections: Add multiple sections with headings and content
- Publish

### 6. Create Sample Content

#### Case Study
1. Go to "Case Studies" → "Create new Case Study"
2. Fill in:
   - Title: "Transforming Enterprise Workflows"
   - Slug: Generate from title
   - Client: "TechCorp Inc."
   - Industry: "Enterprise Software"
   - Published At: Select a date
   - Excerpt: Short summary
   - Tags: ["AI", "Automation", "Enterprise"]
   - Sections: Add text sections, stats, etc.
3. Publish

#### Talk
1. Go to "Talks" → "Create new Talk"
2. Fill in:
   - Title: "The Future of AI Co-Pilots"
   - Slug: Generate from title
   - Description: Talk description
   - Date: Select date
   - Type: "Conference"
   - Status: "Past" or "Upcoming"
   - Venue: "AI Summit 2024"
   - Location: "San Francisco, CA"
3. Publish

### 7. Run Next.js Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Project Structure

```
/app
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout with nav/footer
│   ├── page.tsx             # Home page
│   ├── playbook/            # Playbook page
│   ├── framework/           # Framework page
│   ├── work/                # Case studies
│   │   └── [slug]/         # Individual case study
│   ├── talks/               # Talks page
│   └── contact/             # Contact page
├── sanity/                  # Sanity Studio
│   ├── schemas/            # Content schemas
│   │   ├── siteSettings.ts
│   │   ├── homePage.ts
│   │   ├── playbook.ts
│   │   ├── frameworkPage.ts
│   │   ├── caseStudy.ts
│   │   └── talk.ts
│   ├── sanity.config.ts    # Studio configuration
│   └── sanity.cli.ts       # CLI configuration
├── components/              # React components
│   ├── Navigation.tsx
│   ├── Footer.tsx
│   ├── EmptyState.tsx
│   └── ui/                 # shadcn components
├── lib/
│   ├── sanity.ts           # Sanity client
│   ├── queries.ts          # GROQ queries
│   └── utils.ts            # Utility functions
└── package.json
```

## Content Schemas

### Singletons
- **siteSettings**: Global site configuration
- **homePage**: Homepage content
- **playbook**: Playbook page with PDF download
- **frameworkPage**: Framework/methodology page

### Collections
- **caseStudy**: Portfolio case studies with structured sections
- **talk**: Speaking engagements and presentations

## Design Guidelines

This site follows a **Linear-inspired aesthetic**:

### ✅ DO
- Typography-first layouts
- High contrast (black on white)
- Generous whitespace
- Minimal motion
- Clean sans-serif fonts
- Simple, functional UI

### ❌ DON'T
- No gradients
- No neon colors
- No stock photos
- No robot/AI imagery
- No excessive animations

## Routes

- `/` - Home page with hero
- `/playbook` - Playbook with PDF download
- `/framework` - Framework methodology
- `/work` - Case studies list
- `/work/[slug]` - Individual case study
- `/talks` - Speaking engagements
- `/contact` - Contact form (demo)

## Development

### Scripts

```bash
# Run Next.js dev server
npm run dev

# Run Sanity Studio
npm run sanity

# Deploy Sanity Studio
npm run sanity:deploy

# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run type-check
```

### Adding New Content Types

1. Create schema in `sanity/schemas/`
2. Add to `sanity/schemas/index.ts`
3. Create GROQ query in `lib/queries.ts`
4. Build page/component to display content

## Deployment

### Deploy Next.js to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Deploy Sanity Studio

```bash
npm run sanity:deploy
```

Your studio will be available at: `https://your-project.sanity.studio`

## Customization

### Branding

Update in Sanity Studio:
- Site Settings → Site Title
- Site Settings → Logo

### Navigation

Edit navigation items in:
- `components/Navigation.tsx`

### Colors

Tailwind uses CSS variables. Edit in:
- `app/globals.css` (`:root` section)

### Fonts

Change font in:
- `app/layout.tsx` (import and apply different Google Font)

## Troubleshooting

### "Sanity Not Configured" Error
- Verify `.env.local` has correct Project ID
- Restart dev server after changing env vars

### "Content Missing" Error
- Create the required document in Sanity Studio
- Publish the document
- Wait for ISR (or refresh after 60s)

### TypeScript Errors
- Run `npm run type-check` to see all errors
- Ensure all dependencies are installed

### Sanity Studio Not Starting
- Check if port 3333 is available
- Verify `sanity.config.ts` has correct Project ID

## Support

For issues with:
- **Next.js**: [Next.js Docs](https://nextjs.org/docs)
- **Sanity**: [Sanity Docs](https://www.sanity.io/docs)
- **Tailwind**: [Tailwind Docs](https://tailwindcss.com/docs)

## License

MIT
