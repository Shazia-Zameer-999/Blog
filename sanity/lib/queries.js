export const postQuery = `*[_type == "post"] | order(publishedAt desc) {
  title,
  slug,
  publishedAt,
  image,
  content
}`

export const projectQuery = `*[_type == "project"] | order(_createdAt desc) {
  title,
  slug,
  description,
  link,
  image
}`
export const aboutQuery = `*[_type == "about"][0]{
  title,
  name,
  role,
  description,
  "socialLinks": socialLinks[]{platform, url, icon},
  "skills": skills[]{title, percent}
}`
