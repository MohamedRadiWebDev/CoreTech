
# CoreTech - Web Services Portfolio

A modern, multilingual web application built with React, TypeScript, and Express showcasing digital services and portfolio work.

## 🚀 Quick Start

### Running on  (Recommended)
1. Fork this template in 
2. Click the "Run" button to start the development server
3. The application will be available at the URL shown in your  workspace

### Running Locally
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:5000`

Note: The application uses Node.js 20+. Make sure you have it installed on your system.

## 🛠 Tech Stack

- Frontend: React + TypeScript
- Styling: Tailwind CSS + Shadcn UI
- Backend: Express.js
- Internationalization: i18n
- State Management: React Context
- Animation: Framer Motion

## 📦 Features

- Responsive design
- Dark/Light theme support
- Arabic/English language support
- Portfolio showcase
- Blog system
- Contact form
- Service overview
- Pricing plans
- Testimonials section

## 🔧 Development

### Prerequisites

The following are automatically installed in your  workspace:

- Node.js 20+
- npm 10+

### Project Structure

```
client/
  ├── src/
  │   ├── components/    # Reusable components
  │   ├── data/         # Static data and translations
  │   ├── hooks/        # Custom React hooks
  │   ├── lib/          # Utility functions
  │   ├── pages/        # Page components
  │   └── types/        # TypeScript definitions
server/
  ├── index.ts          # Express server setup
  ├── routes.ts         # API routes
  └── storage.ts        # Data storage logic
```

### Running the Application

The application will automatically start when you click the "Run" button in .

Development server runs on:
- Frontend: Auto-assigned Replit URL
- Backend API: Port 5000

### Adding Translations

1. Navigate to `client/src/data/translations/`
2. Edit `en.json` for English or `ar.json` for Arabic
3. Add new translation keys and their corresponding values

### Customizing Styles

1. Edit `tailwind.config.ts` for theme customization
2. Modify `client/src/index.css` for global styles
3. Use Tailwind classes in components

## 🚀 Deployment

1. Open the "Deployment" tab in your Replit workspace
2. Click "Deploy" to publish your changes
3. Your app will be live at your Replit deployment URL

## 🤝 Contributing

1. Fork the project in Replit
2. Create a new branch
3. Make your changes
4. Open a pull request

## 🐛 Troubleshooting

Common issues and solutions:

1. **Missing Translations**
   - Check translation keys in `client/src/data/translations/`
   - Ensure all keys exist in both `en.json` and `ar.json`

2. **Styling Issues**
   - Clear browser cache
   - Check Tailwind class names
   - Verify theme context is working

3. **API Errors**
   - Confirm server is running on port 5000
   - Check browser console for errors
   - Verify API route definitions in `server/routes.ts`

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.
