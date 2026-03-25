# Content Studio Guide

## What it is

`/studio` is a frontend-only content management interface for:

- blog posts
- portfolio projects
- services
- testimonials

It works without a backend and updates the website immediately in the current browser.

## Where content comes from

Default content files remain in `client/public/data/`:

- `blog.json`
- `portfolio.json`
- `services.json`
- `testimonials.json`

The app first loads these defaults, then applies local browser overrides from Content Studio.

## Local persistence model

- Local overrides are stored in browser `localStorage`.
- Storage keys:
  - `coretech-content-overrides-v1`
  - `coretech-content-overrides-meta-v1`
- Overrides are per browser/device. They are **not shared** automatically.

## Live update behavior

When you save inside `/studio`, the central content store updates immediately.
All pages using content hooks reflect changes without a hard refresh:

- Home featured sections
- Services
- Portfolio + Portfolio detail
- Blog + Blog detail
- Testimonials

## Studio workflows

### Create / edit / duplicate / delete

Each collection tab supports:

- search/filter list
- select an item to edit
- create new item
- duplicate item
- delete item
- save validated changes

### Import / export / reset

- **Export bundle:** downloads one JSON bundle for all managed collections.
- **Import bundle:** validates structure and replaces local overrides.
- **Reset collection:** clears local override for one collection.
- **Reset all:** clears all local overrides and falls back to default JSON.

## Validation

Validation uses Zod schemas for each collection:

- required bilingual fields
- id/slug format
- URL/path format for images
- array constraints (tags/features/services/technologies)
- rating bounds for testimonials
- safe service icon key enum

## Frontend-only limitations

- No server persistence
- No multi-user collaboration
- No role-based access/auth
- No publish workflow

Use export/import to move content between browsers or machines.

## Future upgrade path

The architecture separates:

- storage + merge logic (`content-store`)
- data schemas (`studio-schemas`)
- studio UI route (`/studio`)
- site consumption hooks (`use-site-data`)

To upgrade later (Supabase/Firebase/CMS), replace store storage/fetch methods while keeping schemas and UI largely intact.
