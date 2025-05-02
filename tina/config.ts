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
          include: ["home.json", "services.json", "contact.json"],
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
              { type: "string", name: "heroSubtitle", label: "Hero Subtitle" },
            ],
          },
          {
            name: "services",
            label: "Services",
            match: {
              include: "services.json",
            },
            fields: [
              { type: "string", name: "sectionTitle", label: "Section Title" },
              {
                type: "object",
                name: "items",
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
            name: "contact",
            label: "Contact Page",
            match: {
              include: "contact.json",
            },
            fields: [
              { type: "string", name: "headline", label: "Headline" },
              { type: "string", name: "subtext", label: "Subtext" },
            ],
          },
        ],
        path: "src/content",
        format: "json",
      },
      {
        name: "pages",
        label: "Pages",
        path: "src/content",
        format: "json",
        match: {
          exclude: ["home.json", "services.json", "contact.json"],
        },
        fields: [
          { type: "string", name: "title", label: "Title" },
          { type: "rich-text", name: "body", label: "Body Content" },
        ],
      },
    ],
  },
});
