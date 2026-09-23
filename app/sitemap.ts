import type { MetadataRoute } from "next";
import { events, resources, stories } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://chillparents.hk";
  const staticRoutes = ["", "/stories", "/events", "/groups", "/resources", "/about", "/guidelines", "/join"];
  return [
    ...staticRoutes.map((route) => ({ url: `${base}${route}`, lastModified: new Date("2026-09-23") })),
    ...stories.map((story) => ({ url: `${base}/stories/${story.slug}`, lastModified: new Date(story.date) })),
    ...events.map((event) => ({ url: `${base}/events/${event.slug}`, lastModified: new Date(event.date) })),
    ...resources.map((resource) => ({ url: `${base}/resources/${resource.slug}`, lastModified: new Date("2026-09-23") })),
  ];
}
