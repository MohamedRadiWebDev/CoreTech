
# JSON Files Editing Guide

This guide explains how to edit the JSON files in the `client/public/data` directory to update website content.

## 📁 File Structure

All content JSON files are located in `client/public/data/`:
- `blog.json` - Blog posts
- `portfolio.json` - Portfolio projects
- `pricing.json` - Pricing plans
- `services.json` - Service offerings
- `testimonials.json` - Client testimonials

## ✏️ Editing Guidelines

### Blog Posts (`blog.json`)

```json
{
  "id": "unique-post-id",
  "title": "Post Title",
  "category": "Category Name",
  "author": "Author Name",
  "authorRole": "Author Role",
  "authorImage": "https://url-to-author-image.jpg",
  "date": "Month DD, YYYY",
  "image": "https://url-to-post-image.jpg",
  "excerpt": "Brief description of the post",
  "content": "<p>HTML formatted content</p>",
  "tags": ["Tag1", "Tag2"]
}
```

### Portfolio Projects (`portfolio.json`)

```json
{
  "id": "project-id",
  "title": "Project Title",
  "category": "category-id",
  "categoryName": "Category Name",
  "image": "/images/portfolio/image.webp",
  "shortDescription": "Brief project description",
  "shortDescription_ar": "Arabic brief description",
  "fullDescription": "Detailed project description",
  "fullDescription_ar": "Arabic detailed description",
  "website": "https://project-url.com",
  "year": "YYYY",
  "services": ["Service 1", "Service 2"],
  "technologies": ["Tech 1", "Tech 2"],
  "impact": {
    "value": "Value",
    "label": "Label"
  }
}
```

### Services (`services.json`)

```json
{
  "id": "service-id",
  "title": "Service Title",
  "icon": "<svg path>",
  "description": "Service description",
  "features": [
    "Feature 1",
    "Feature 2"
  ],
  "image": "https://url-to-service-image.jpg"
}
```

### Pricing Plans (`pricing.json`)

```json
{
  "id": "plan-id",
  "name": "Plan Name",
  "price": 999,
  "popular": false,
  "description": "Plan description",
  "features": [
    {
      "text": "Feature description",
      "included": true
    }
  ]
}
```

### Testimonials (`testimonials.json`)

```json
{
  "id": "testimonial-id",
  "name": "Client Name",
  "role": "Client Role",
  "image": "https://url-to-client-image.jpg",
  "text": "Testimonial content",
  "rating": 5,
  "date": "Month DD, YYYY",
  "projectId": "related-project-id",
  "projectName": "Project Name"
}
```

## 🔍 Important Notes

1. Always maintain valid JSON format
2. Keep IDs unique within each file
3. Use proper image paths:
   - For portfolio images: `/images/portfolio/filename.webp`
   - For external images: Full HTTPS URLs
4. Follow HTML formatting for blog content
5. Include Arabic translations where applicable (`_ar` suffix)
6. Maintain consistent date formats (Month DD, YYYY)

## 🚫 Common Mistakes to Avoid

1. Missing commas between objects
2. Invalid JSON syntax
3. Duplicate IDs
4. Broken image links
5. Missing required fields
6. Inconsistent data formats

## ✅ Best Practices

1. Back up files before editing
2. Use a JSON validator to check syntax
3. Test changes in development environment first
4. Keep content concise and well-formatted
5. Use descriptive IDs
6. Optimize images before adding them
