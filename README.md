# SuperMart POS - Retail Billing System

A full-stack retail billing and point-of-sale (POS) system built with modern web technologies.

## Features

- 🛒 Complete POS interface for retail operations
- 📊 Product management and inventory tracking
- 💳 Tax calculation and billing
- 👥 User authentication and authorization
- 📱 Responsive design for desktop and mobile
- 🔄 Real-time updates with WebSocket support
- 📄 Bill viewing and management

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for fast development and building
- TailwindCSS for styling
- Radix UI for accessible components
- React Query for data fetching
- Wouter for routing

### Backend
- Node.js with Express
- TypeScript
- PostgreSQL with Drizzle ORM
- Passport.js for authentication
- WebSocket (ws) for real-time features

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- PostgreSQL database
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/jeffreyroshan2006-crypto/Retail-BillFlow.git
cd Retail-BillFlow
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
SESSION_SECRET=your-secret-key
NODE_ENV=development
```

4. Push database schema:
```bash
npm run db:push
```

5. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## Build for Production

```bash
npm run build
```

This will:
1. Build the frontend with Vite → `dist/public/`
2. Bundle the backend with esbuild → `dist/index.cjs`

## Deployment

This application is configured for deployment on Vercel with the included `vercel.json` configuration.

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Set environment variables in Vercel dashboard:
   - `DATABASE_URL`
   - `SESSION_SECRET`
   - `NODE_ENV=production`

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## Project Structure

```
Retail-BillFlow/
├── client/              # Frontend React application
├── server/              # Backend Express server
│   ├── index.ts        # Server entry point
│   └── routes.ts       # API routes
├── shared/              # Shared types and utilities
├── script/              # Build scripts
│   └── build.ts        # Production build script
├── dist/                # Production build output
│   ├── public/         # Frontend static files
│   └── index.cjs       # Backend bundle
├── vercel.json          # Vercel deployment configuration
└── package.json         # Project dependencies
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run check` - Type check with TypeScript
- `npm run db:push` - Push database schema

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
