# Footer Feature - Clean Architecture

This feature follows clean architecture principles with modular, reusable components for the website footer.

## Architecture Layers

### 🏛️ Domain Layer (`/domain`)
Contains the core business entities and types that define the structure of footer data.

- `entities/Footer.ts` - Core footer entities including links, social media, company info, and reviews widget

### ⚙️ Application Layer (`/application`)
Contains business logic and use cases for managing footer data.

- `FooterDataService.ts` - Business logic for organizing footer data and managing social icons

### 🔌 Infrastructure Layer (`/infrastructure`)
Handles external concerns like icon management.

- `SocialIconRepository.ts` - Manages React Icons for social media platforms

### 🎨 Presentation Layer (`/presentation`)
Contains React components, hooks, and UI-related logic.

#### Components (`/presentation/components`)
- `Footer.tsx` - Main footer component that orchestrates all sub-components
- `ReviewsWidget.tsx` - Embedded reviews widget from Reco.se
- `CompanyInfo.tsx` - Company details, tagline, and description
- `QuickLinks.tsx` - Navigation links with hover animations
- `SocialMedia.tsx` - Social media links with icons
- `FooterBottom.tsx` - Copyright and bottom tagline

#### Hooks (`/presentation/hooks`)
- `useFooterData.ts` - Custom hook for fetching and organizing footer data

## Enhanced Features

### 🎨 Visual Design
- **Gradient Background**: Purple gradient from dark to light
- **Reviews Widget**: Integrated customer reviews display
- **Hover Animations**: Smooth transitions on links and social icons
- **Responsive Layout**: Adapts from mobile to desktop layouts

### 🚀 Interactive Elements
- **Link Hover Effects**: Arrow animations and underline transitions
- **Social Icon Scaling**: Icons grow on hover for better UX
- **Color Transitions**: Smooth color changes throughout
- **Backdrop Blur**: Modern glass effect on reviews widget

### 📱 Mobile-First Design
- **Responsive Grid**: Adapts from 1 column on mobile to 4 on desktop
- **Touch-Friendly**: Large click areas for mobile users
- **Readable Typography**: Properly scaled fonts and line heights
- **Accessible Colors**: Good contrast ratios for readability

### 🌐 Internationalization
- **Multi-Language Support**: English, Spanish, and Swedish translations
- **Dynamic Content**: All text comes from translation files
- **Fallback Values**: Default values if translations are missing

## Translation Structure

```json
{
  "copyright": "Copyright text",
  "address": "Company address",
  "taglineBottom": "Bottom tagline",
  "quickLinksTitle": "Quick Links",
  "connectTitle": "Connect With Us",
  "companyInfo": {
    "name": "Company Name",
    "tagline": "Company tagline",
    "description": "Company description"
  },
  "links": [
    { "href": "/path", "label": "Link Label" }
  ],
  "social": [
    { "href": "https://...", "label": "Platform", "icon": "IconName" }
  ]
}
```

## Component Hierarchy

```
Footer
├── ReviewsWidget (embedded reviews)
├── CompanyInfo (company details)
├── QuickLinks (navigation links)
├── SocialMedia (social platforms)
└── FooterBottom (copyright & tagline)
```

## Key Benefits

1. **Modular Design**: Each section is a separate, reusable component
2. **Clean Architecture**: Clear separation of concerns across layers
3. **Type Safety**: Full TypeScript support with proper interfaces
4. **Maintainability**: Easy to update content through translation files
5. **Performance**: Optimized rendering with efficient component structure
6. **Accessibility**: Semantic HTML and proper ARIA labels
7. **SEO Friendly**: Proper heading hierarchy and structured content

## Usage

```tsx
import { Footer } from '../features/footer';

// Use in your layout component
export const Layout = () => {
  return (
    <div>
      {/* Other layout components */}
      <Footer />
    </div>
  );
};
```

## Social Icons

Supports the following social media platforms:
- Facebook (`FaFacebook`)
- Instagram (`FaInstagram`) 
- LinkedIn (`FaLinkedin`)
- WhatsApp (`FaWhatsapp`)

Icons are managed through the `SocialIconRepository` and can be easily extended for additional platforms.

This footer implementation provides a professional, modern foundation that enhances the overall user experience while maintaining clean, maintainable code.
