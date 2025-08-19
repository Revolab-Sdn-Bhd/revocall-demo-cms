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
          type: 'string',
          options: {
            list: [
              {title: 'Card Lost', value: 'Card Lost'},
              {title: 'Electric Bill', value: 'Electric Bill'},
              {title: 'Loan Application', value: 'Loan Application'},
              {title: 'Loan Repayment', value: 'Loan Repayment'},
              {title: 'Clinic Appointment', value: 'Clinic Appointment'},
              {title: 'Complaint', value: 'Complaint'},
              {title: 'Insurance Renewal', value: 'Insurance Renewal'},
              {title: 'Bill Overdue (EN)', value: 'Bill Overdue (EN)'},
              {title: 'Bill Overdue (BM)', value: 'Bill Overdue (BM)'},
              {title: 'To Be Confirmed', value: 'TBC'},
            ],
          },
        },
      ],
      description: 'Select multiple use case categories for this user',
    }),
  ],
})
