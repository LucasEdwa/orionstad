export type HomeHero = {
  welcome: string;
  subtitle: string;
  heroImgAlt: string;
  logoImgAlt: string;
};

export type HomeSection = {
  title: string;
  paragraphs: string[];
};

export type BookingFormContent = {
  title: string;
  intro: string;
  serviceLabel: string;
  serviceOptions: { value: string; label: string }[];
  sizeLabel: string;
  frequencyLabel: string;
  frequencyOptions: { value: string; label: string }[];
  nextLabel: string;
};

export type CustomerFormContent = {
  title: string;
  fields: { type: string; placeholder: string }[];
  backLabel: string;
  submitLabel: string;
};

export const HOME_HERO: HomeHero = {
  welcome: "Welcome to Orion Städ",
  subtitle: "Your trusted partner for professional cleaning services",
  heroImgAlt: "Cleaning Service",
  logoImgAlt: "Orion Städ Logo",
};

export const HOME_SECTIONS: HomeSection[] = [
  {
    title: "About Orion Städ",
    paragraphs: [
      "At Orion Städ, we believe in delivering excellence with every clean. Our team of dedicated professionals is committed to ensuring your home is spotless and sparkling, giving you more time to enjoy the things that matter most.",
      "We offer a range of customizable cleaning services tailored to meet your specific needs. From regular home cleaning to deep cleaning, our goal is to provide a stress-free experience with results you can trust.",
    ],
  },
  {
    title: "Why Choose Us?",
    paragraphs: [
      "Orion Städ stands out for its commitment to quality and customer satisfaction. We use eco-friendly products and the latest cleaning techniques to ensure your home is not only clean but also safe for you and your loved ones.",
      "Our services are flexible and affordable, making it easy to keep your home in top shape without breaking the bank. Join the many satisfied customers who trust Orion Städ for their home cleaning needs.",
    ],
  },
];

export const BOOKING_FORM_CONTENT: BookingFormContent = {
  title: "Book a Cleaning Service",
  intro: "Ready to experience the Orion Städ difference? Booking a cleaning service is easy! Simply click the button below to get started.",
  serviceLabel: "Select Service Type and Enter Home Size",
  serviceOptions: [
    { value: "", label: "Select Service Type" },
    { value: "regular", label: "Regular Cleaning" },
    { value: "deep", label: "Deep Cleaning" },
    { value: "move-in-out", label: "Move In/Out Cleaning" },
  ],
  sizeLabel: "Enter Home Size (m²):",
  frequencyLabel: "Select Cleaning Frequency:",
  frequencyOptions: [
    { value: "", label: "Select Frequency" },
    { value: "one-time", label: "One-Time Cleaning" },
    { value: "weekly", label: "Weekly Cleaning" },
    { value: "bi-weekly", label: "Bi-Weekly Cleaning" },
    { value: "monthly", label: "Monthly Cleaning" },
  ],
  nextLabel: "Next",
};

export const CUSTOMER_FORM_CONTENT: CustomerFormContent = {
  title: "Customer Information",
  fields: [
    { type: "text", placeholder: "Full Name" },
    { type: "email", placeholder: "Email Address" },
    { type: "tel", placeholder: "Phone Number" },
    { type: "text", placeholder: "Address" },
    { type: "text", placeholder: "Number of Rooms" },
    { type: "text", placeholder: "Number of Bathrooms" },
    { type: "text", placeholder: "How to Access Your Home" },
    { type: "text", placeholder: "Priority Areas to Clean" },
    { type: "text", placeholder: "Any Special Instructions" },
    { type: "text", placeholder: "Sensitive Materials or Allergies" },
    { type: "text", placeholder: "Pets in the Home" },
  ],
  backLabel: "Back",
  submitLabel: "Submit",
};
