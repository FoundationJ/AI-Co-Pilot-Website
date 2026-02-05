import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Site Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'logo',
      title: 'Logo Text',
      type: 'string',
      description: 'Text-based logo',
    }),
    defineField({
      name: 'navigation',
      title: 'Navigation Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
            },
            {
              name: 'slug',
              title: 'Slug',
              type: 'string',
              description: 'e.g., /, /playbook, /work',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'footer',
      title: 'Footer Text',
      type: 'text',
      rows: 2,
    }),
  ],
})
