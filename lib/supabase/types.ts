export type CarouselImage = {
  id: string
  url: string
  storage_path: string
  caption: string | null
  display_order: number
  active: boolean
  created_at: string
}

export type GalleryImage = {
  id: string
  url: string
  storage_path: string
  caption: string | null
  category: string
  display_order: number
  created_at: string
}

export type Service = {
  id: string
  title: string
  description: string
  icon_name: string
  features: string[]
  display_order: number
  created_at: string
}

export type PricingPackage = {
  id: string
  name: string
  price_label: string
  description: string
  features: string[]
  is_popular: boolean
  event_type: string
  display_order: number
  created_at: string
}

export type Testimonial = {
  id: string
  client_name: string
  wedding_date: string | null
  location: string | null
  review: string
  rating: number
  image_url: string | null
  display_order: number
  created_at: string
}

export type FAQ = {
  id: string
  question: string
  answer: string
  category: string
  display_order: number
  created_at: string
}

export type SiteSetting = {
  id: string
  key: string
  value: Record<string, string>
  updated_at: string
}

export type ContactSettings = {
  phone: string
  email: string
  address: string
  hours: string
}

export type SocialSettings = {
  instagram: string
  facebook: string
  pinterest: string
}

export type AboutSettings = {
  tagline: string
  story: string
}
