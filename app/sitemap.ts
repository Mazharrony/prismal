import type { MetadataRoute } from 'next'
import { services } from '@/content/services'
import { getCaseStudies } from '@/lib/work'
import { site } from '@/content/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const staticRoutes = ['', '/work', '/about', '/contact', '/careers'].map((route) => ({
    url: `${site.domain}${route}`,
    lastModified: now,
    priority: route === '' ? 1 : 0.7,
  }))

  const serviceRoutes = services.map((service) => ({
    url: `${site.domain}/services/${service.slug}`,
    lastModified: now,
    priority: 0.9,
  }))

  const workRoutes = getCaseStudies().map((study) => ({
    url: `${site.domain}/work/${study.slug}`,
    lastModified: now,
    priority: 0.8,
  }))

  return [...staticRoutes, ...serviceRoutes, ...workRoutes]
}
