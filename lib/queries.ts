// GROQ queries for fetching content from Sanity

export const siteSettingsQuery = `
  *[_type == "siteSettings"][0] {
    _id,
    title,
    description,
    logo,
    navigation[] {
      title,
      slug
    },
    footer
  }
`

export const homePageQuery = `
  *[_type == "homePage"][0] {
    _id,
    headline,
    subheadline,
    ctaText,
    ctaLink,
    featuredWork[]->,
    seo
  }
`

export const playbookQuery = `
  *[_type == "playbook"][0] {
    _id,
    title,
    description,
    content,
    pdfFile {
      asset-> {
        _id,
        url,
        originalFilename,
        size
      }
    },
    seo
  }
`

export const frameworkPageQuery = `
  *[_type == "frameworkPage"][0] {
    _id,
    title,
    description,
    sections[] {
      heading,
      content,
      order
    },
    seo
  }
`

export const allCaseStudiesQuery = `
  *[_type == "caseStudy"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    client,
    industry,
    publishedAt,
    featuredImage,
    tags
  }
`

export const caseStudyBySlugQuery = `
  *[_type == "caseStudy" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    client,
    industry,
    publishedAt,
    featuredImage,
    tags,
    sections[] {
      _key,
      sectionType,
      heading,
      content,
      image,
      stats[] {
        label,
        value
      }
    },
    seo
  }
`

export const allTalksQuery = `
  *[_type == "talk"] | order(date desc) {
    _id,
    title,
    slug,
    description,
    date,
    type,
    status,
    venue,
    location,
    recordingUrl,
    slidesUrl
  }
`
