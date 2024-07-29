export type Launchpad = {
  id: string | number
  slug: string
  contract_address: string
  featured_images: string[]
  launchpad_creator: {
    name: string
    avatar_url: string
    slug: string
    wallet_address?: string
  }
  en?: {
    seo?: {
      title?: string
      description?: string
      thumbnail_url?: string
    }
    name?: string
    description?: string
  }
  vn?: {
    seo?: {
      title?: string
      description?: string
      thumbnail_url?: string
    }
    name?: string
    description?: string
  }
}