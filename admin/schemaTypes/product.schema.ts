import {Rule} from '@sanity/types'

export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'product_name',
      title: 'Product Name',
      type: 'string',
      validation: (Rule: Rule) => Rule.required().error('Product Name is required'),
    },
    {
      name: 'product_desc',
      title: 'Product Description',
      type: 'string',
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule: Rule) => Rule.required().error('Price is required'),
    },
    {
      name: 'imgUrl',
      title: 'Main Image',
      type: 'image',
    },
    {
      name: 'otherImages',
      title: 'Other Images',
      type: 'array',
      of: [{type: 'image'}],
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
      validation: (Rule: Rule) => Rule.required().min(1).error('At least one category is required'),
    },
    {
      name: 'colors',
      title: 'Colors',
      type: 'array',
      of: [{type: 'reference', to: {type: 'color'}}],
      validation: (Rule: Rule) => Rule.required().min(1).error('At least one color is required'),
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'In Stock', value: 'inStock'},
          {title: 'Out of Stock', value: 'outOfStock'},
          {title: 'Discontinued', value: 'discontinued'},
        ],
      },
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'product_name',
        maxLength: 200,
      },
    },
  ],
}
