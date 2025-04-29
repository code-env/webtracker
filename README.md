# WebTracker

![WebTracker Logo](/public/og-image.png)

## Overview

WebTracker is a powerful, privacy-focused web analytics platform that helps you understand your website's performance and visitor behavior without compromising user privacy. Built with Next.js and modern web technologies, WebTracker provides real-time insights into your web traffic, user engagement, and more.

## Features

🚀 **Real-Time Analytics** - See visitor activity as it happens with live updates and no delay (Coming Soon)

📊 **Comprehensive Dashboards** - Visualize your web traffic with intuitive charts and graphs

🌎 **Global Audience Tracking** - Track where your visitors are coming from with country-level analytics

📱 **Device Analytics** - Understand what devices and operating systems your visitors use

🔍 **Traffic Source Analysis** - Identify where your visitors are coming from to optimize marketing efforts

⚡ **Performance Metrics** - Monitor page load times and other performance indicators

🔒 **Privacy-Focused** - Collect data without compromising visitor privacy or using cookies

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: NextAuth.js
- **Analytics**: Custom tracking script
- **Visualization**: Recharts, React Simple Maps

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- PostgreSQL database
- bun

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/webtracker.git
   cd webtracker
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Set up environment variables:
   ```
   # Create a .env.local file with the following variables
   DATABASE_URL="postgresql://username:password@localhost:5432/webtracker"
   NEXTAUTH_SECRET="your-nextauth-secret"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. Run the database migrations:
   ```bash
   npx drizzle-kit push
   ```

5. Start the development server:
   ```bash
   bun run dev
   ```

## Usage

### Adding the Tracking Script

#### For JavaScript/React.js Projects:

Add this snippet to your HTML:

```html
<script
  defer
  data-domain="yourdomain.com"
  src="https://webtracker.avikmukherjee.tech/tracking-script.js"
>
</script>
```

#### For Next.js Projects:

Add this snippet to your `app/layout.tsx`:

```tsx
<Script
  defer
  data-domain="yourdomain.com"
  src="https://webtracker.avikmukherjee.tech/tracking-script.js"
/>
```

### Viewing Analytics

1. Register/login to your WebTracker account
2. Navigate to the Dashboard
3. Select your website to view detailed analytics

## Deployment

### Deploying the App

WebTracker can be deployed to any platform that supports Next.js applications:

1. Build the application:
   ```bash
   bun run build
   ```

2. Start the production server:
   ```bash
   bun run start
   ```

### Database Setup for Production

Ensure your production database is properly configured and accessible from your deployment environment. Update your environment variables accordingly.

## Project Structure

```
webtracker/
├── public/             # Static assets and tracking script
├── src/                # Source files
│   ├── app/            # Next.js App Router
│   ├── components/     # React components
│   ├── lib/            # Utilities and database schema
│   └── auth.ts         # Authentication configuration
├── .env.example        # Example environment variables
└── README.md           # Project documentation
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feat/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

## License

This Project is under GNU General Public License - GPL 3.0.

## Contact

Avik Mukherjee - [LinkedIn](https://www.linkedin.com/in/avik-mukherjee-8ab9911bb/) - [Twitter/X](https://x.com/Avikm744)

Project Link: [Repo Link](https://github.com/Avik-creator/webtracker)
