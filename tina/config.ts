import { defineConfig } from "tinacms";

export default defineConfig({
  branch: "TinaCMS",
  clientId: "3762ea7a-f581-499c-a630-5f518a9f567b",
  token: "14357f5f976469c86ef7e53dd3aa3cf72b50aa3e",
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        label: "Website Content",
        name: "website",
        match: {
          include: ["home.json", "services.json", "site.json", "testimonials.json"],
        },
        templates: [
          {
            name: "home",
            label: "Home Page",
            match: {
              include: "home.json",
            },
            fields: [
              { type: "string", name: "heroTitle", label: "Hero Title" },
              { type: "string", name: "heroDescription", label: "Hero Description" },
              {
                type: "object",
                name: "features",
                label: "Features",
                list: true,
                fields: [
                  { type: "string", name: "title", label: "Feature Title" },
                  { type: "string", name: "description", label: "Feature Description" },
                ],
              },
            ],
          },
          {
            name: "services",
            label: "Services",
            match: {
              include: "services.json",
            },
            fields: [
              {
                type: "object",
                name: "0",
                label: "Services",
                list: true,
                fields: [
                  { type: "string", name: "title", label: "Service Title" },
                  { type: "string", name: "description", label: "Service Description" },
                ],
              },
            ],
          },
          {
            name: "site",
            label: "Site Configuration",
            match: {
              include: "site.json",
            },
            fields: [
              { type: "string", name: "siteName", label: "Site Name" },
              { type: "string", name: "logo", label: "Logo Path" },
              {
                type: "object",
                name: "navigation",
                label: "Navigation Links",
                list: true,
                fields: [
                  { type: "string", name: "label", label: "Link Label" },
                  { type: "string", name: "href", label: "Link URL" },
                ],
              },
              {
                type: "object",
                name: "footerLinks",
                label: "Footer Links",
                list: true,
                fields: [
                  { type: "string", name: "label", label: "Link Label" },
                  { type: "string", name: "href", label: "Link URL" },
                  { type: "boolean", name: "enabled", label: "Enabled" },
                ],
              },
            ],
          },
          {
            name: "testimonials",
            label: "Testimonials",
            match: {
              include: "testimonials.json",
            },
            fields: [
              {
                type: "object",
                name: "testimonials",
                label: "Testimonials",
                list: true,
                fields: [
                  { type: "string", name: "name", label: "Client Name" },
                  { type: "string", name: "text", label: "Testimonial Text" },
                  { type: "string", name: "location", label: "Client Location" },
                ],
              },
            ],
          },
        ],
        path: "src/data",
        format: "json",
      },
      {
        name: "pages",
        label: "Pages",
        path: "src/content",
        format: "json",
        match: {
          include: "*.json",
        },
        fields: [
          { type: "string", name: "title", label: "Title" },
          { type: "rich-text", name: "body", label: "Body Content" },
        ],
      },
    ],
  },
});