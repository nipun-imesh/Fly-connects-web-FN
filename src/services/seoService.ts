interface SEOConfig {
  title: string
  description: string
  keywords?: string
  image?: string
  url?: string
  type?: "website" | "article" | "product"
}

export const updatePageSEO = (config: SEOConfig): void => {
  const { title, description, keywords, image, url, type = "website" } = config

  // Update title
  document.title = title

  // Update or create meta tags
  updateMetaTag("meta[name='description']", "content", description)
  updateMetaTag("meta[property='og:title']", "content", title)
  updateMetaTag("meta[property='og:description']", "content", description)
  updateMetaTag("meta[property='twitter:title']", "content", title)
  updateMetaTag("meta[property='twitter:description']", "content", description)

  if (keywords) {
    updateMetaTag("meta[name='keywords']", "content", keywords)
  }

  if (image) {
    updateMetaTag("meta[property='og:image']", "content", image)
    updateMetaTag("meta[property='twitter:image']", "content", image)
  }

  if (url) {
    updateMetaTag("meta[property='og:url']", "content", url)
    updateMetaTag("meta[property='twitter:url']", "content", url)
    updateCanonical(url)
  }

  if (type) {
    updateMetaTag("meta[property='og:type']", "content", type)
  }

  // Scroll to top
  window.scrollTo(0, 0)
}

const updateMetaTag = (selector: string, attribute: string, content: string): void => {
  let element = document.querySelector(selector) as HTMLMetaElement | null

  if (!element) {
    const name = selector.includes("name=") ? selector.split("'")[1] : selector.split("'")[1]
    const isProperty = selector.includes("property=")
    element = document.createElement("meta")
    if (isProperty) {
      element.setAttribute("property", name)
    } else {
      element.setAttribute("name", name)
    }
    document.head.appendChild(element)
  }

  element.setAttribute(attribute, content)
}

const updateCanonical = (url: string): void => {
  let canonical = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null

  if (!canonical) {
    canonical = document.createElement("link")
    canonical.setAttribute("rel", "canonical")
    document.head.appendChild(canonical)
  }

  canonical.href = url
}

export const addStructuredData = (data: Record<string, any>): void => {
  const existingScript = document.querySelector("script[data-structured-data='true']")
  if (existingScript) {
    existingScript.remove()
  }

  const script = document.createElement("script")
  script.type = "application/ld+json"
  script.setAttribute("data-structured-data", "true")
  script.textContent = JSON.stringify(data)
  document.head.appendChild(script)
}
