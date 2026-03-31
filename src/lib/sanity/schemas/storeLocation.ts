export const storeLocation = {
  name: 'storeLocation',
  title: 'Store Location',
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
      name: 'country',
      title: 'Country',
      type: 'string',
      options: {
        list: [
          { title: 'Taiwan', value: 'taiwan' },
          { title: 'Japan', value: 'japan' },
        ],
      },
    },
    {
      name: 'city',
      title: 'City',
      type: 'object',
      fields: [
        { name: 'zh', title: '中文', type: 'string' },
        { name: 'en', title: 'English', type: 'string' },
        { name: 'ja', title: '日本語', type: 'string' },
      ],
    },
    {
      name: 'address',
      title: 'Address',
      type: 'object',
      fields: [
        { name: 'zh', title: '中文', type: 'string' },
        { name: 'en', title: 'English', type: 'string' },
        { name: 'ja', title: '日本語', type: 'string' },
      ],
    },
    {
      name: 'coordinates',
      title: 'Coordinates',
      type: 'object',
      fields: [
        { name: 'lat', title: 'Latitude', type: 'number' },
        { name: 'lng', title: 'Longitude', type: 'number' },
      ],
    },
    {
      name: 'hours',
      title: 'Hours',
      type: 'object',
      fields: [
        { name: 'zh', title: '中文', type: 'string' },
        { name: 'en', title: 'English', type: 'string' },
        { name: 'ja', title: '日本語', type: 'string' },
      ],
    },
    {
      name: 'nearestTransit',
      title: 'Nearest Transit',
      type: 'object',
      fields: [
        { name: 'zh', title: '中文', type: 'string' },
        { name: 'en', title: 'English', type: 'string' },
        { name: 'ja', title: '日本語', type: 'string' },
      ],
    },
    {
      name: 'phone',
      title: 'Phone',
      type: 'string',
    },
    {
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'googleMapsUrl',
      title: 'Google Maps URL',
      type: 'url',
    },
    {
      name: 'instagramHandle',
      title: 'Instagram Handle',
      type: 'string',
    },
    {
      name: 'isComingSoon',
      title: 'Coming Soon',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      initialValue: 0,
    },
  ],
  preview: {
    select: { title: 'name.en', subtitle: 'country' },
  },
};
