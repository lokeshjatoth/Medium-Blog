# Medium Blog App

A modern blogging platform built with a React frontend and a Hono backend, deployed on Cloudflare Workers. This application leverages TypeScript for type safety and Zod for validation, ensuring a robust development experience.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Folder Structure](#folder-structure)
- [Type Validation with Zod](#type-validation-with-zod)
- [Database Configuration](#database-configuration)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Responsive UI:** A clean and user-friendly interface built with React and Tailwind CSS.
- **Type Safety:** All code is written in TypeScript, providing static type checking.
- **Type Validation:** Utilizes Zod for runtime type validation, enhancing the reliability of data handling.
- **Full-Stack Architecture:** A decoupled architecture with a Hono backend and React frontend.
- **Database Integration:** Uses PostgreSQL with Prisma ORM for seamless database management.
- **Connection Pooling:** Implements Prisma architecture for connection pooling to optimize database interactions.
- **Deployment on Cloudflare Workers:** Fast and scalable hosting solution.

## Technologies Used

### Frontend:
- React
- Tailwind CSS
- TypeScript

### Backend:
- Hono
- TypeScript
- Zod (for type validation)
- PostgreSQL
- Prisma ORM

### Deployment:
- Cloudflare Workers (via Wrangler)

## Getting Started

To set up the project locally, follow these steps:

### 1. Clone the Repository
```bash
git clone https://github.com/lokeshjatoth/Medium-Blog.git
cd Medium-Blog
```

### 2. Install Dependencies
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### 3. Configure the Database

This app uses PostgreSQL with Prisma ORM for database management. To set up your database connection:

- Add your connection pool URL and JWT secret in the `wrangler.json` file.

### 4. Start the Development Server
```bash
# Start the frontend
cd frontend
npm start

# Start the backend
cd ../backend
npm start
```

## Folder Structure
```
Medium-Blog/
│── frontend/       # React frontend
│── backend/        # Hono backend
│── prisma/         # Prisma database schema and migrations
│── wrangler.json   # Cloudflare Workers configuration
│── package.json    # Project dependencies
│── README.md       # Documentation
```

## Type Validation with Zod

Zod is used for runtime type validation to ensure data integrity. Example usage:
```typescript
import { z } from 'zod';

const BlogSchema = z.object({
  title: z.string(),
  content: z.string(),
  author: z.string(),
});

const validateBlog = (data: unknown) => {
  return BlogSchema.safeParse(data);
};
```

## Database Configuration

- Prisma is used to manage PostgreSQL.
- Run migrations using:
```bash
npx prisma migrate dev --name init
```

## Deployment

To deploy the application on Cloudflare Workers:

1. Install Wrangler CLI:
```bash
npm install -g wrangler
```
2. Authenticate with Cloudflare:
```bash
wrangler login
```
3. Deploy the application:
```bash
wrangler publish
```

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to your branch (`git push origin feature-branch`).
5. Create a pull request.

## License

This project is licensed under the MIT License.

