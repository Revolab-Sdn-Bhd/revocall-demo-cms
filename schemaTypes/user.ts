import {defineField, defineType} from 'sanity'
import {PasswordInput} from '../components/PasswordInput'

export const userType = defineType({
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'password',
      title: 'Password',
      type: 'string',
      validation: (rule) => rule.required().min(6),
      description: 'Password will be automatically hashed when saved',
      components: {
        input: PasswordInput,
      },
    }),
    defineField({
      name: 'createdAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'useCaseCategories',
      title: 'Use Case Categories',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'useCaseCategory'}],
        },
      ],
      description: 'Select multiple use case categories for this user',
    }),
  ],
})
