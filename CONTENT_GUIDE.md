# Content management guide

This project uses local JSON files in `client/public/data/` for editable bilingual content.

## General rules
- Keep static interface text in `client/src/translations/en.json` and `client/src/translations/ar.json`.
- Keep editable business/content records in JSON files under `client/public/data/`.
- Every content record should include English fields plus matching `_ar` fields for Arabic content.
- Use stable internal identifiers (`id`, `slug`, `category`) for lookups and filtering.
- Keep slugs lowercase, URL-safe, and unique.
- Store image paths as either public-relative paths (for local assets) or full URLs.

## Files to edit

### Services
- File: `client/public/data/services.json`
- Required fields:
  - `id`, `slug`
  - `title`, `title_ar`
  - `description`, `description_ar`
  - `features`, `features_ar`
  - `image`, `iconKey`
- Optional fields:
  - `featured`, `order`
  - `seoTitle`, `seoTitle_ar`, `seoDescription`, `seoDescription_ar`
- `iconKey` must match one of the safe icon mappings used in code.

### Portfolio projects
- File: `client/public/data/portfolio.json`
- Required fields:
  - `id`, `slug`
  - `title`, `title_ar`
  - `category`, `category_ar`
  - `categoryName`, `categoryName_ar`
  - `image`
  - `shortDescription`, `shortDescription_ar`
  - `fullDescription`, `fullDescription_ar`
  - `year`, `website`
  - `services`, `services_ar`
  - `technologies`, `technologies_ar`
  - `impact.value`, `impact.label`, `impact.label_ar`
- Optional fields:
  - `gallery`
  - `client`, `client_ar`
  - `featured`
  - SEO fields

### Blog posts
- File: `client/public/data/blog.json`
- Required fields:
  - `id`, `slug`
  - `title`, `title_ar`
  - `excerpt`, `excerpt_ar`
  - `content`, `content_ar`
  - `category`, `category_ar`
  - `author`, `author_ar`
  - `authorRole`, `authorRole_ar`
  - `authorImage`, `date`, `image`
  - `tags`, `tags_ar`
- Optional fields:
  - `featured`
  - SEO fields
- Content may include limited HTML. Supported tags are rendered safely by the content renderer.

### Testimonials
- File: `client/public/data/testimonials.json`
- Required fields:
  - `id`
  - `name`, `name_ar`
  - `role`, `role_ar`
  - `company`, `company_ar`
  - `text`, `text_ar`
  - `image`, `rating`, `date`
- Optional fields:
  - `projectId`
  - `projectName`, `projectName_ar`
  - `featured`

### Service options
- File: `client/public/data/service-options.json`
- Required fields:
  - `id`
  - `label`, `label_ar`

### Site config
- File: `client/public/data/site-config.json`
- Use this for company profile data such as company name, tagline, email, phone, address, and numeric stats.

### Social links
- File: `client/public/data/social-links.json`
- Holds platform URLs only.

## Notes
- `pricing.json` was removed because it was not used by the current application.
- To add a new item to any collection, duplicate an existing record and update all bilingual fields together.
- After editing content, run `npm run check` and `npm run build` to validate the site.
