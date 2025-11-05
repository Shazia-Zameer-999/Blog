// schemas/service.js
import { defineType, defineField } from 'sanity'

export const serviceType = defineType({
  name: 'service',
  title: 'Services',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Service Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Service Description',
      type: 'text',
    }),
    defineField({
      name: 'iconBlack',
      title: 'Black Icon (light theme)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'iconWhite',
      title: 'White Icon (hover/dark theme)',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
})