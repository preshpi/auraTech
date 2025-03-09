import {Rule} from '@sanity/types'

export default {
  name: 'newArrival',
  title: 'New Arrival',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'products',
      title: 'Products',
      type: 'array',
      of: [{type: 'reference', to: {type: 'product'}}],
      validation: (rule: Rule) =>
        rule.max(10).error('You can only have up to 8 products in the best seller'),
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
}
