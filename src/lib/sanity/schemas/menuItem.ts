export const menuItem = {
  name: 'menuItem',
  title: 'Menu Item',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'object',
      fields: [
        { name: 'zh', title: '中文', type: 'string' },
        { name: 'en', title: 'English', type: 'string' },
        { name: 'ja', title: '日本語', type: 'string' },
      ],
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name.en' },
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'menuCategory' }],
    },
    {
      name: 'description',
      title: 'Description',
      type: 'object',
      fields: [
        { name: 'zh', title: '中文', type: 'text' },
        { name: 'en', title: 'English', type: 'text' },
        { name: 'ja', title: '日本語', type: 'text' },
      ],
    },
    {
      name: 'price',
      title: 'Price',
      type: 'object',
      fields: [
        { name: 'twd', title: 'TWD (NT$)', type: 'number' },
        { name: 'jpy', title: 'JPY (¥)', type: 'number' },
      ],
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'badges',
      title: 'Badges',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Signature', value: 'signature' },
          { title: 'Seasonal', value: 'seasonal' },
          { title: 'New', value: 'new' },
          { title: 'Limited', value: 'limited' },
        ],
      },
    },
    {
      name: 'isFeatured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'isAvailable',
      title: 'Available',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'seasonalDates',
      title: 'Seasonal Dates',
      type: 'object',
      fields: [
        { name: 'start', title: 'Start', type: 'date' },
        { name: 'end', title: 'End', type: 'date' },
      ],
    },
    {
      name: 'pairsWith',
      title: 'Pairs With',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'menuItem' }] }],
    },
    {
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      initialValue: 0,
    },
  ],
  preview: {
    select: { title: 'name.en', subtitle: 'category.name.en', media: 'image' },
  },
};
