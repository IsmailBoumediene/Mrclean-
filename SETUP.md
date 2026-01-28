# KeepClean Website - Setup Instructions

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                      # Next.js App Router
│   ├── [lang]/              # Language-based routing
│   │   ├── page.tsx         # Home page
│   │   ├── services/        # Services page
│   │   ├── about/           # About page
│   │   ├── careers/         # Careers page
│   │   └── contact/         # Contact page
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Global styles
├── components/              # Reusable components
│   ├── Header.tsx           # Navigation header
│   ├── Footer.tsx           # Footer
│   ├── LanguageSwitcher.tsx # Language toggle
│   ├── ServiceCard.tsx      # Service display card
│   ├── TestimonialCard.tsx  # Testimonial display
│   ├── ContactForm.tsx      # Contact form
│   └── CareerForm.tsx       # Career application form
├── lib/                     # Utilities
│   └── i18n/               # Internationalization
│       ├── config.ts        # i18n configuration
│       └── getDictionary.ts # Translation loader
└── locales/                 # Translation files
    ├── en.json             # English translations
    └── fr.json             # French translations
```

## Features Implemented

### ✅ Bilingual Support (FR/EN)
- Automatic language detection based on browser settings
- Manual language switcher on all pages
- URL-based routing (`/fr/...` and `/en/...`)

### ✅ SEO Optimization
- Meta titles and descriptions in both languages
- Semantic HTML structure
- Proper heading hierarchy

### ✅ Pages
1. **Home** - Hero, services overview, testimonials, CTA
2. **Services** - Detailed service descriptions for:
   - Residential Cleaning
   - Commercial Cleaning
   - Airbnb Cleaning
   - Staffing & Trained Resources
3. **About Us** - Company info, values, statistics
4. **Careers** - Job benefits, requirements, application form
5. **Contact** - Contact info, quote request form

### ✅ Forms
- Contact/Quote Request Form
- Career Application Form
- Form validation
- Success/error messages

### ✅ Design
- Mobile-first responsive design
- Clean, modern UI with Tailwind CSS
- Accessible components
- Smooth transitions and hover effects

## Customization

### Change Colors
Edit [tailwind.config.ts](tailwind.config.ts):
```typescript
colors: {
  primary: { ... },  // Main brand color
  accent: { ... },   // Secondary/accent color
}
```

### Update Content
Edit translation files:
- [src/locales/en.json](src/locales/en.json) - English content
- [src/locales/fr.json](src/locales/fr.json) - French content

### Add Images
Place images in `public/images/` directory and reference them:
```jsx
<img src="/images/your-image.jpg" alt="Description" />
```

### Contact Information
Update in both translation files:
- Phone: (514) 123-4567
- Email: info@keepclean.ca
- Location: Montreal, QC

## Building for Production

```bash
npm run build
npm start
```

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Deploy automatically

### Other Platforms
1. Build: `npm run build`
2. Deploy the `.next` folder
3. Set Node.js environment

## Next Steps

1. **Add real images** - Replace placeholder content with actual photos
2. **Set up forms** - Connect forms to email service or CRM
3. **Add Google Analytics** - Track visitor behavior
4. **Optimize images** - Use Next.js Image component
5. **Add testimonials** - Collect and add real customer reviews
6. **Create blog** - Add a blog section for SEO
7. **Set up domain** - Configure custom domain
8. **Add live chat** - Integrate customer support chat

## Support

For questions or issues, refer to:
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Icons](https://react-icons.github.io/react-icons/)

## License

Private - All rights reserved by KeepClean
