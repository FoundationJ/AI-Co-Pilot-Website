# Sanity Content Structure

This document details all the Sanity content types (schemas) used in this project.

## Singletons

Singletons are single-instance documents. There's only one of each.

### Site Settings

**Document ID**: `siteSettings`

**Purpose**: Global site configuration

**Fields**:
- `title` (string, required): Site title
- `description` (text): Site description for SEO
- `logo` (string): Text-based logo
- `navigation` (array): Navigation menu items
  - `title` (string): Menu item label
  - `slug` (string): Menu item URL
- `footer` (text): Footer text

### Home Page

**Document ID**: `homePage`

**Purpose**: Homepage content

**Fields**:
- `headline` (text, required): Main hero headline (1-2 lines)
- `subheadline` (text): Supporting text under headline
- `ctaText` (string): Call-to-action button text
- `ctaLink` (string): Call-to-action button URL
- `featuredWork` (array of references): Featured case studies
- `seo` (object): SEO metadata
  - `title` (string): Meta title
  - `description` (text): Meta description

### Playbook

**Document ID**: `playbook`

**Purpose**: Playbook page with downloadable PDF

**Fields**:
- `title` (string, required): Page title
- `description` (text): Page description
- `content` (portable text): Rich text content
- `pdfFile` (file): Playbook PDF for download
- `seo` (object): SEO metadata

### Framework Page

**Document ID**: `frameworkPage`

**Purpose**: Framework/methodology page

**Fields**:
- `title` (string, required): Page title
- `description` (text): Page description
- `sections` (array): Framework sections
  - `heading` (string): Section heading
  - `content` (portable text): Section content
  - `order` (number): Display order
- `seo` (object): SEO metadata

## Collections

Collections allow multiple documents of the same type.

### Case Study

**Document Type**: `caseStudy`

**Purpose**: Portfolio case studies

**Fields**:
- `title` (string, required): Case study title
- `slug` (slug, required): URL-friendly identifier
- `excerpt` (text): Short summary for listings
- `client` (string): Client name
- `industry` (string): Client industry
- `publishedAt` (datetime, required): Publication date
- `featuredImage` (image): Hero image
- `tags` (array of strings): Category tags
- `sections` (array): Content sections
  - `sectionType` (string): Type - text, image, stats, or quote
  - `heading` (string): Section heading
  - `content` (portable text): Section content
  - `image` (image): Section image (if type is image)
  - `stats` (array): Statistics (if type is stats)
    - `label` (string): Stat description
    - `value` (string): Stat value
- `seo` (object): SEO metadata

**Section Types**:
1. **text**: Standard text section with heading and content
2. **image**: Image section
3. **stats**: Statistics grid (e.g., "2x growth", "50% faster")
4. **quote**: Blockquote section

### Talk

**Document Type**: `talk`

**Purpose**: Speaking engagements and presentations

**Fields**:
- `title` (string, required): Talk title
- `slug` (slug, required): URL-friendly identifier
- `description` (text): Talk description
- `date` (datetime, required): Talk date
- `type` (string, required): Talk type
  - Options: conference, workshop, webinar, podcast, panel
- `status` (string, required): Talk status
  - Options: upcoming, past, cancelled
- `venue` (string): Venue name
- `location` (string): Location (city, country, or "Online")
- `recordingUrl` (url): Link to recording (YouTube, Vimeo, etc.)
- `slidesUrl` (url): Link to presentation slides

## Content Guidelines

### Headlines & Copy

**Linear-inspired style**:
- Short, punchy headlines
- Clear, direct language
- No marketing jargon
- Focus on outcomes, not features

**Examples**:
- ✅ "Build faster with AI"
- ✅ "Intelligent systems that augment human capability"
- ❌ "Leverage cutting-edge AI to revolutionize your workflow"
- ❌ "The #1 AI platform for digital transformation"

### Portable Text (Rich Text)

Portable Text supports:
- Paragraphs
- Headings (H2, H3)
- Bold and italic
- Lists (bullet and numbered)
- Links

**Styles available**:
- Normal (paragraph)
- H2 (subheading)
- H3 (smaller subheading)

### Images

When uploading images:
- Use high-quality images (min 1920px wide)
- Prefer simple, clean compositions
- Avoid stock photos with visible watermarks
- No cheesy AI/robot imagery

### Tags

Use tags to categorize content:
- Keep tags short (1-2 words)
- Use title case
- Examples: "AI", "Automation", "Enterprise", "Healthcare"

## Querying Content

All GROQ queries are defined in `/lib/queries.ts`

### Common Patterns

**Fetch singleton**:
```groq
*[_type == "homePage"][0] { ... }
```

**Fetch all of a type**:
```groq
*[_type == "caseStudy"] | order(publishedAt desc) { ... }
```

**Fetch by slug**:
```groq
*[_type == "caseStudy" && slug.current == $slug][0] { ... }
```

**Dereference (populate)**:
```groq
featuredWork[]-> { ... }
```

## PDF File Handling

The Playbook document includes a PDF file field:

1. **Upload**: In Sanity Studio, click "Upload" in the PDF File field
2. **Access**: The PDF URL is available at `pdfFile.asset.url`
3. **Download**: Implemented in `/app/playbook/page.tsx`

```tsx
<a
  href={data.pdfFile.asset.url}
  download={data.pdfFile.asset.originalFilename}
  target="_blank"
  rel="noopener noreferrer"
>
  Download Playbook
</a>
```

## Validation Rules

All schemas include validation:

- `validation: (Rule) => Rule.required()` - Field is mandatory
- `validation: (Rule) => Rule.min(10)` - Minimum length
- `validation: (Rule) => Rule.max(160)` - Maximum length

Edit validation in `/sanity/schemas/*.ts`

## Extending Schemas

To add a new field:

1. Open the schema file (e.g., `/sanity/schemas/caseStudy.ts`)
2. Add the field definition:

```ts
defineField({
  name: 'newField',
  title: 'New Field',
  type: 'string',
  description: 'Field description',
})
```

3. Update the GROQ query in `/lib/queries.ts`:

```ts
export const caseStudyBySlugQuery = `
  *[_type == "caseStudy" && slug.current == $slug][0] {
    ...,
    newField
  }
`
```

4. Update the TypeScript interface in the page component
5. Render the field in the component

## Best Practices

1. **Always publish**: Content must be published to appear on the site
2. **Use slugs**: Generate slugs from titles using the "Generate" button
3. **Write for humans**: Clear, concise, conversational tone
4. **Test content**: View changes on localhost before deploying
5. **Keep it minimal**: Less is more - don't over-explain
