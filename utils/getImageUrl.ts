export const getImageUrl = (name: string) =>
  new URL(`../assets/images/${name}`, import.meta.url).href
