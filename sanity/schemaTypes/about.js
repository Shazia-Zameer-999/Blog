// schemas/about.js
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'about',
  title: 'About Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string'
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string'
    }),
    defineField({
      name: 'role',
      title: 'Role / Profession',
      type: 'string'
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text'
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'platform', title: 'Platform Name', type: 'string' },
            { name: 'url', title: 'Profile URL', type: 'url' },
            { name: 'icon', title: 'Icon Name', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'skills',
      title: 'Skills',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Skill Name', type: 'string' },
            { name: 'percent', title: 'Proficiency (%)', type: 'number' },
          ],
        },
      ],
    }),
  ],
})