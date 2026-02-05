import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'playbook',
  title: 'Playbook',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
          ],
        },
      ],
    }),
    defineField({
      name: 'pdfFile',
      title: 'PDF File',
      type: 'file',
      description: 'Upload the playbook PDF',
      options: {
        accept: '.pdf',
      },
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
