import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'text',
      rows: 2,
      description: '1-2 line headline for hero section',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subheadline',
      title: 'Subheadline',
      type: 'text',
      rows: 3,
      description: 'Short paragraph under the headline',
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
      description: 'e.g., "Get Started", "Learn More"',
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA Button Link',
      type: 'string',
      description: 'e.g., /playbook, /contact',
    }),
    defineField({
      name: 'featuredWork',
      title: 'Featured Work',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'caseStudy' }] }],
      description: 'Select featured case studies to display',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Meta Title',
          type: 'string',
        },
        {
          name: 'description',
          title: 'Meta Description',
          type: 'text',
        },
      ],
    }),
  ],
})
