# SuperMart POS - Retail Billing System

## Overview

SuperMart POS is a full-stack retail billing system designed for managing point-of-sale operations, inventory, customers, and sales analytics. The application provides role-based access control (admin, manager, cashier) with features including product management, real-time billing with tax and discount calculations, customer loyalty tracking, and sales reporting dashboards.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state caching and synchronization
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Charts**: Recharts for dashboard analytics visualization
- **Forms**: React Hook Form with Zod validation
- **Build Tool**: Vite with path aliases (@/, @shared/, @assets/)

### Backend Architecture
- **Runtime**: Node.js with Express 5
- **Language**: TypeScript with ESM modules
- **Authentication**: Passport.js with Local Strategy, session-based auth stored in PostgreSQL
- **Password Security**: Scrypt hashing with random salts
- **Session Management**: express-session with connect-pg-simple store

### Data Layer
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM with drizzle-zod for schema validation
- **Schema Location**: `shared/schema.ts` (shared between client and server)
- **Migrations**: Drizzle Kit with `db:push` command

### API Design
- **Pattern**: REST API with typed contracts defined in `shared/routes.ts`
- **Validation**: Zod schemas for input validation on both client and server
- **Authentication**: Session-based with middleware protection on all API routes

### Project Structure
```
├── client/           # React frontend
│   └── src/
│       ├── components/   # UI components and shadcn/ui
│       ├── hooks/        # Custom React hooks for data fetching
│       ├── pages/        # Route components
│       └── lib/          # Utilities and query client
├── server/           # Express backend
│   ├── auth.ts       # Authentication setup
│   ├── db.ts         # Database connection
│   ├── routes.ts     # API route handlers
│   └── storage.ts    # Database access layer
├── shared/           # Shared code between client/server
│   ├── schema.ts     # Drizzle database schema
│   └── routes.ts     # API contract definitions
└── migrations/       # Database migrations
```

### Key Design Decisions

1. **Shared Schema Pattern**: Database schema and API contracts are defined once in `/shared` and imported by both frontend and backend, ensuring type safety across the stack.

2. **Role-Based Access**: Three user roles (admin, manager, cashier) with different permission levels. Admins/managers can access inventory and dashboard; cashiers are limited to POS operations.

3. **Monorepo Structure**: Single repository with client, server, and shared directories. The build process compiles both frontend (Vite) and backend (esbuild) into a `dist` folder.

4. **Session Authentication**: Uses PostgreSQL-backed sessions rather than JWTs for simpler server-side session management and easy invalidation.

## External Dependencies

### Database
- **PostgreSQL**: Primary database, connection via `DATABASE_URL` environment variable
- **Drizzle ORM**: Database access and migrations
- **connect-pg-simple**: Session storage in PostgreSQL

### Frontend Libraries
- **Radix UI**: Headless UI primitives for accessible components
- **TanStack Query**: Server state management and caching
- **Recharts**: Data visualization for analytics
- **date-fns**: Date formatting utilities
- **Lucide React**: Icon library

### Backend Libraries
- **Express 5**: HTTP server framework
- **Passport.js**: Authentication middleware
- **passport-local**: Username/password authentication strategy

### Development Tools
- **Vite**: Frontend build and development server
- **esbuild**: Backend bundling for production
- **tsx**: TypeScript execution for development
- **Drizzle Kit**: Database schema management

### Environment Variables Required
- `DATABASE_URL`: PostgreSQL connection string
- `SESSION_SECRET`: Secret key for session encryption (optional, has default for development)