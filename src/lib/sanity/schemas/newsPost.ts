export const newsPost = {
  name: 'newsPost',
  title: 'News Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
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
      options: { source: 'title.en' },
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'New Flavor', value: 'new-flavor' },
          { title: 'Store Opening', value: 'store-opening' },
          { title: 'Collaboration', value: 'collaboration' },
          { title: 'Event', value: 'event' },
        ],
      },
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'object',
      fields: [
        { name: 'zh', title: '中文', type: 'text' },
        { name: 'en', title: 'English', type: 'text' },
        { name: 'ja', title: '日本語', type: 'text' },
      ],
    },
    {
      name: 'body',
      title: 'Body',
      type: 'object',
      fields: [
        { name: 'zh', title: '中文', type: 'array', of: [{ type: 'block' }, { type: 'image' }] },
        { name: 'en', title: 'English', type: 'array', of: [{ type: 'block' }, { type: 'image' }] },
        { name: 'ja', title: '日本語', type: 'array', of: [{ type: 'block' }, { type: 'image' }] },
      ],
    },
    {
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    },
    {
      name: 'isFeatured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    },
  ],
  preview: {
    select: { title: 'title.en', subtitle: 'category', media: 'featuredImage' },
  },
  orderings: [
    {
      title: 'Published Date',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
};
