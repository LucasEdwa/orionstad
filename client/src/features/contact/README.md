# Contact Feature - Clean Architecture

This feature follows clean architecture principles with clear separation of concerns across different layers.

## Architecture Layers

### 🏛️ Domain Layer (`/domain`)
Contains the core business entities and types that define the structure of contact-related data.

- `entities/Contact.ts` - Core contact entities, form fields, quick actions, and page data types
- `entities/ContactForm.ts` - Contact form state and email submission result types

### ⚙️ Application Layer (`/application`)
Contains business logic and use cases for managing contact data and form handling.

- `ContactDataService.ts` - Business logic for organizing and accessing contact page data
- `ContactFormService.ts` - Business logic for form validation, state management, and submission handling
- `ContactIconService.ts` - Business logic for icon mapping and styling based on contact action types

### 🔌 Infrastructure Layer (`/infrastructure`)
Handles external concerns like email service integration and asset management.

- `EmailRepository.ts` - Manages EmailJS integration for sending contact form submissions
- `ContactAssetsRepository.ts` - Manages contact page images and logo assets

### 🎨 Presentation Layer (`/presentation`)
Contains React components, hooks, and UI-related logic.

#### Components (`/presentation/components`)
- `Contact.tsx` - Main contact page component
- `ContactHeroSection.tsx` - Hero section with background image and title
- `QuickActions.tsx` - Quick contact action cards (phone, email, WhatsApp, etc.)
- `ContactForm.tsx` - Contact form with validation and submission handling
- `ContactInfo.tsx` - Contact information display (email, phone, address, WhatsApp)
- `BusinessHoursSection.tsx` - Business hours display component
- `WhyContactUs.tsx` - Motivational section explaining why to contact

#### Hooks (`/presentation/hooks`)
- `useContactData.ts` - Custom hook for fetching and organizing contact page data
- `useContactForm.ts` - Custom hook for managing form state and submission logic

## Key Benefits

1. **Separation of Concerns**: Each layer has a single responsibility
2. **Testability**: Business logic is isolated and easily testable
3. **Maintainability**: Changes to one layer don't affect others
4. **Reusability**: Components and services can be reused across the application
5. **Scalability**: Easy to extend with new contact methods and features
6. **Email Integration**: Clean abstraction over EmailJS service
7. **Form Validation**: Robust client-side validation with error handling
8. **Responsive Design**: Mobile-first approach with touch-friendly interfaces

## Usage

```tsx
import { Contact } from '../features/contact';

// Use in your page component
export const ContactPage = () => {
  return <Contact />;
};
```

## Data Flow

1. **UI Request** → `useContactData` hook
2. **Hook** → `ContactDataService` (business logic)
3. **Service** → `ContactAssetsRepository` (asset management)
4. **Form Submission** → `useContactForm` hook
5. **Hook** → `ContactFormService` (validation) → `EmailRepository` (email sending)
6. **Repository** → Returns submission result
7. **Result** → Displayed in UI with success/error feedback

## Component Hierarchy

```
Contact
├── ContactHeroSection
├── QuickActions
│   └── ContactIconService (icon mapping)
└── Main Content
    ├── ContactForm
    │   └── useContactForm (form handling)
    └── Contact Information
        ├── ContactInfo
        ├── BusinessHoursSection
        └── WhyContactUs
```

## Email Service Integration

The contact form integrates with EmailJS for reliable email delivery:

- **Environment Variables**: Requires VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_IDCONTACT, and VITE_EMAILJS_PUBLIC_KEY
- **Error Handling**: Graceful fallback and user feedback for email failures
- **Validation**: Client-side validation before submission
- **Loading States**: Visual feedback during form submission

## Features

### 🎨 User Experience Enhancements
- **Hero Section**: Stunning background image with overlay and logo
- **Quick Actions**: One-click contact options (call, WhatsApp, email)
- **Form Validation**: Real-time validation with helpful error messages
- **Loading States**: Visual feedback during form submission
- **Success/Error Feedback**: Toast notifications for submission results

### 📱 Mobile-First Design
- **Responsive Grid**: Adapts from single column on mobile to two columns on desktop
- **Touch-Friendly**: Large touch targets for mobile devices
- **Accessible**: Proper form labels and ARIA attributes
- **Fast Loading**: Optimized images and lazy loading

### 🔗 Contact Methods
- **Phone**: Direct calling with tel: links
- **Email**: Mailto links for email clients
- **WhatsApp**: Direct messaging integration
- **Contact Form**: Full-featured form with EmailJS integration
- **Business Hours**: Clear availability information
