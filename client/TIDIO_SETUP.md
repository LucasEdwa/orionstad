# Tidio Chatbot Setup Guide for OrionStad

## Overview
This guide will help you set up Tidio chatbot on your OrionStad cleaning service website.

## Step 1: Create Tidio Account
1. Go to [tidio.com](https://www.tidio.com)
2. Click "Sign up for free"
3. Create your account with your business email
4. Complete the setup wizard

## Step 2: Get Your Tidio Key
1. After logging into Tidio dashboard
2. Go to "Settings" → "Developer" → "Integration"
3. Copy your unique Tidio key (it looks like: `abc123def456ghi789`)

## Step 3: Configure Your Environment
1. Open `/client/.env.local` file
2. Replace `YOUR_TIDIO_KEY_HERE` with your actual Tidio key:
   ```
   VITE_TIDIO_KEY=abc123def456ghi789
   ```
3. Save the file

## Step 4: Customize Tidio for Your Business

### Language Settings
1. In Tidio dashboard, go to "Settings" → "Chatbot"
2. Set up responses in English, Spanish, and Swedish
3. The widget will automatically adapt to your website's language switching

### Business Information Setup
1. **Company Name**: OrionStad
2. **Industry**: Cleaning Services
3. **Business Hours**: Set your actual operating hours
4. **Location**: Add your service areas

### Chatbot Responses
Set up common responses for cleaning service questions:

#### FAQ Suggestions:
- "What cleaning services do you offer?"
- "How much does house cleaning cost?"
- "Do you provide your own cleaning supplies?"
- "How do I schedule a cleaning appointment?"
- "What areas do you serve?"
- "Do you offer one-time or recurring cleanings?"
- "Are you insured and bonded?"

#### Auto-responses in Multiple Languages:
- **English**: "Hi! I'm here to help with your cleaning needs. How can I assist you today?"
- **Spanish**: "¡Hola! Estoy aquí para ayudarte con tus necesidades de limpieza. ¿Cómo puedo asistirte hoy?"
- **Swedish**: "Hej! Jag är här för att hjälpa dig med dina städbehov. Hur kan jag hjälpa dig idag?"

## Step 5: Integration Features

### Lead Generation
- Set up lead capture forms in the chat
- Connect to your existing contact system
- Automatically collect contact information

### Business Hours Integration
- Set automatic responses during off-hours
- Redirect to contact form when offline
- Schedule callback requests

### Service Integration
You can use the provided `useTidio` hook to:
```tsx
import { useTidio } from '../utils/useTidio';

// In your component:
const { openChat, closeChat } = useTidio();

// Open chat programmatically
<button onClick={openChat}>
  Need Help? Chat with us!
</button>
```

## Step 6: Testing
1. Start your development server: `npm run dev`
2. Visit your website
3. You should see the Tidio chat widget in the bottom right corner
4. Test the multilingual functionality by switching languages

## Step 7: Go Live
1. The same configuration will work in production
2. Make sure to add your production domain to Tidio's allowed domains
3. Monitor chat conversations in the Tidio dashboard

## Customization Options

### Advanced Features (Available in Tidio)
- **AI Chatbot**: Enable AI responses for 24/7 support
- **Live Chat**: Connect real team members
- **Email Integration**: Send chat transcripts via email
- **Mobile App**: Manage chats on the go
- **Analytics**: Track chat performance and customer satisfaction

### Custom Triggers
Set up chatbot triggers based on:
- Time on page
- Pages visited (e.g., Services page)
- User behavior (e.g., about to leave)
- Return visitors

## Pricing
- **Free Plan**: Up to 100 conversations/month
- **Paid Plans**: Start at $18/month for unlimited conversations
- **Features**: AI responses, multiple operators, advanced analytics

## Support
- Tidio Documentation: [docs.tidio.com](https://docs.tidio.com)
- For technical issues with the integration, check the browser console
- The integration automatically respects your existing language switching system

## Next Steps
1. Set up your Tidio account
2. Add your key to `.env.local`
3. Customize the chatbot responses
4. Test thoroughly before going live
5. Monitor and optimize based on customer interactions

The chatbot is now fully integrated with your React app and will automatically adapt to your existing internationalization system!
