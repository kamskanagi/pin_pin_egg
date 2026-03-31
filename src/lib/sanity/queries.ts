export const menuItemsQuery = `*[_type == "menuItem" && isAvailable == true] | order(sortOrder asc) {
  _id,
  name,
  slug,
  "category": category->{_id, name, slug},
  description,
  price,
  image,
  badges,
  isFeatured,
  isAvailable,
  seasonalDates,
  sortOrder
}`;

export const featuredMenuItemsQuery = `*[_type == "menuItem" && isFeatured == true && isAvailable == true] | order(sortOrder asc) [0...3] {
  _id,
  name,
  slug,
  "category": category->{_id, name, slug},
  description,
  price,
  image,
  badges,
  isFeatured,
  sortOrder
}`;

export const menuCategoriesQuery = `*[_type == "menuCategory"] | order(sortOrder asc) {
  _id,
  name,
  slug,
  description,
  icon,
  sortOrder
}`;

export const storeLocationsQuery = `*[_type == "storeLocation"] | order(sortOrder asc) {
  _id,
  name,
  slug,
  country,
  city,
  address,
  coordinates,
  hours,
  nearestTransit,
  phone,
  photo,
  googleMapsUrl,
  instagramHandle,
  isComingSoon,
  sortOrder
}`;

export const newsPostsQuery = `*[_type == "newsPost"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  category,
  excerpt,
  featuredImage,
  publishedAt,
  isFeatured
}`;

export const newsPostBySlugQuery = `*[_type == "newsPost" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  category,
  excerpt,
  body,
  featuredImage,
  publishedAt,
  isFeatured
}`;

export const siteSettingsQuery = `*[_type == "siteSettings"][0] {
  siteName,
  tagline,
  description,
  ogImage,
  socialLinks,
  announcementBar
}`;
