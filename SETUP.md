# Quick Setup Guide

## Prerequisites

- Node.js 18+ installed
- Yarn package manager
- A Sanity.io account

## Step-by-Step Setup

### 1. Get Sanity Credentials

1. Visit [https://sanity.io](https://sanity.io)
2. Sign up or log in
3. Create a new project:
   - Click "Create project"
   - Name: "AI Co-Pilot Portfolio" (or your choice)
   - Choose "production" dataset
4. Copy your **Project ID** from the dashboard

### 2. Configure Environment

```bash
# Copy the example file
cp .env.local.example .env.local

# Edit .env.local and replace:
NEXT_PUBLIC_SANITY_PROJECT_ID=your-actual-project-id
NEXT_PUBLIC_SANITY_DATASET=production
```

### 3. Install Dependencies

```bash
yarn install
```

### 4. Start Both Servers

Open two terminal windows:

**Terminal 1 - Next.js:**
```bash
npm run dev
# Opens at http://localhost:3000
```

**Terminal 2 - Sanity Studio:**
```bash
npm run sanity
# Opens at http://localhost:3333
```

### 5. Create Initial Content

In Sanity Studio (http://localhost:3333):

#### A. Site Settings
1. Click "Site Settings"
2. Fill in:
   - Site Title: "AI Co-Pilot"
   - Description: "Intelligent systems that augment human capability"
   - Logo: "AI Co-Pilot"
3. Click "Publish"

#### B. Home Page
1. Click "Home Page"
2. Fill in:
   - Headline: "Intelligent systems that augment human capability"
   - Subheadline: "We build AI co-pilots that empower teams to work faster, smarter, and more creatively."
   - CTA Text: "View Playbook"
   - CTA Link: "/playbook"
3. Click "Publish"

#### C. Playbook Page (Optional)
1. Click "Playbook"
2. Fill in:
   - Title: "AI Co-Pilot Playbook"
   - Description: Your playbook overview
   - Content: Add rich text sections
   - PDF File: Upload a PDF (optional)
3. Click "Publish"

#### D. Framework Page
1. Click "Framework Page"
2. Fill in:
   - Title: "Our Framework"
   - Description: "How we approach AI product development"
   - Sections: Click "Add item" to add multiple sections
     - Heading: "Discovery"
     - Content: Description of discovery phase
     - Order: 1
   - Repeat for more sections
3. Click "Publish"

#### E. Sample Case Study
1. Go to "Case Studies" → "Create new Case Study"
2. Fill in:
   - Title: "Transforming Enterprise Workflows"
   - Slug: Click "Generate" button
   - Client: "TechCorp Inc."
   - Industry: "Enterprise Software"
   - Published At: Select today's date
   - Excerpt: "How we helped TechCorp streamline operations with AI"
   - Tags: "AI", "Automation", "Enterprise"
   - Sections: Add text sections with headings and content
3. Click "Publish"

#### F. Sample Talk
1. Go to "Talks" → "Create new Talk"
2. Fill in:
   - Title: "The Future of AI Co-Pilots"
   - Slug: Click "Generate"
   - Description: "A deep dive into the future of AI assistants"
   - Date: Select a date
   - Type: "Conference"
   - Status: "Past" or "Upcoming"
   - Venue: "AI Summit 2024"
   - Location: "San Francisco, CA"
3. Click "Publish"

### 6. View Your Site

Open http://localhost:3000 in your browser. You should see:

- ✅ Homepage with your headline
- ✅ Navigation working
- ✅ All pages populated with content

## Troubleshooting

### "Sanity Not Configured" Error
- Check `.env.local` has the correct Project ID
- Restart Next.js server: `Ctrl+C` and `npm run dev` again

### "Content Missing" Error
- Make sure you created and **published** the document in Sanity Studio
- Wait 60 seconds for ISR to revalidate
- Hard refresh the page (Cmd+Shift+R or Ctrl+Shift+R)

### Studio Won't Start
- Check if port 3333 is available
- Make sure `.env.local` has valid credentials

### TypeScript Errors
- Run: `npm run type-check` to see all errors
- Most will resolve once dependencies are fully installed

## Next Steps

1. **Customize Design**: Edit `app/globals.css` for colors and typography
2. **Add More Content**: Create more case studies and talks
3. **Upload PDF**: Add a playbook PDF in the Playbook document
4. **Deploy**: See README.md for deployment instructions

## Useful Commands

```bash
# Development
npm run dev          # Start Next.js dev server
npm run sanity       # Start Sanity Studio

# Build
npm run build        # Build Next.js for production
npm start            # Start production server

# Sanity
npm run sanity:deploy  # Deploy Studio to Sanity's cloud

# Type checking
npm run type-check   # Check TypeScript types
```

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
