export const getImageUrl = name => new URL(`../assets/images/${name}`, import.meta.url).href
