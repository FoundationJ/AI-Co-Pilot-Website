import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'talk',
  title: 'Talk',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Talk Type',
      type: 'string',
      options: {
        list: [
          { title: 'Conference', value: 'conference' },
          { title: 'Workshop', value: 'workshop' },
          { title: 'Webinar', value: 'webinar' },
          { title: 'Podcast', value: 'podcast' },
          { title: 'Panel', value: 'panel' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Upcoming', value: 'upcoming' },
          { title: 'Past', value: 'past' },
          { title: 'Cancelled', value: 'cancelled' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'venue',
      title: 'Venue',
      type: 'string',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'City, Country or "Online"',
    }),
    defineField({
      name: 'recordingUrl',
      title: 'Recording URL',
      type: 'url',
      description: 'YouTube, Vimeo, etc.',
    }),
    defineField({
      name: 'slidesUrl',
      title: 'Slides URL',
      type: 'url',
      description: 'Link to presentation slides',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'venue',
      status: 'status',
    },
    prepare(selection) {
      const { title, subtitle, status } = selection
      return {
        title,
        subtitle: `${subtitle || 'TBD'} • ${status}`,
      }
    },
  },
})
