export const siteSettings = {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'siteName',
      title: 'Site Name',
      type: 'object',
      fields: [
        { name: 'zh', title: '中文', type: 'string' },
        { name: 'en', title: 'English', type: 'string' },
        { name: 'ja', title: '日本語', type: 'string' },
      ],
    },
    {
      name: 'tagline',
      title: 'Tagline',
      type: 'object',
      fields: [
        { name: 'zh', title: '中文', type: 'string' },
        { name: 'en', title: 'English', type: 'string' },
        { name: 'ja', title: '日本語', type: 'string' },
      ],
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
      name: 'ogImage',
      title: 'OG Image',
      type: 'image',
    },
    {
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      fields: [
        { name: 'instagram', title: 'Instagram', type: 'url' },
        { name: 'facebook', title: 'Facebook', type: 'url' },
        { name: 'line', title: 'LINE', type: 'url' },
      ],
    },
    {
      name: 'announcementBar',
      title: 'Announcement Bar',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Text',
          type: 'object',
          fields: [
            { name: 'zh', title: '中文', type: 'string' },
            { name: 'en', title: 'English', type: 'string' },
            { name: 'ja', title: '日本語', type: 'string' },
          ],
        },
        { name: 'link', title: 'Link', type: 'url' },
        { name: 'isActive', title: 'Active', type: 'boolean', initialValue: false },
      ],
    },
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' };
    },
  },
};
