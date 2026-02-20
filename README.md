# Gather Clone

[Watch the demo](https://www.youtube.com/watch?v=AnhsC7Fmt20)

A clone of Gather.town featuring fully customizable spaces and seamless proximity based video chat.

The project is a fork of Realms, my previous project inspired by Gather. You can check it out [here.](https://github.com/trevorwrightdev/realms)

The app was designed to include the core features of Gather, including:

- Customizable spaces using tilesets
- Proximity video chat
- Private area video chat 
- Multiplayer networking
- Tile-based movement

Built as a TypeScript web app primarily using Next.js, PostgreSQL, Socket.io, TailwindCSS, Pixi.js, and Agora for video chat. 

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Agora account (for video chat)

### How to install

First, clone the repo.
`git clone https://github.com/trevorwrightdev/gather-clone.git`

Install client dependencies.
```bash
cd frontend
npm install
```

Install server dependencies.
```bash
cd backend
npm install
```

### Database Setup

1. Create a PostgreSQL database (e.g., `game1`)
2. Run the schema file to create tables:
```bash
psql -U postgres -d game1 -f backend/schema.sql
```

### Environment Variables

Create a `.env` file in the `backend` directory with the following variables:
```
FRONTEND_URL=http://localhost:3000
DATABASE_URL=postgresql://postgres:123456789@localhost:5432/game1
JWT_SECRET=your-secret-key-change-in-production
```

Create a `.env.local` file in the `frontend` directory with the following variables:
```
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
NEXT_PUBLIC_AGORA_APP_ID=your-agora-app-id
```

For the video chat feature, you'll need to create an account at [Agora](https://www.agora.io/) and get an App ID.

### Running the Application

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. In a new terminal, start the frontend:
```bash
cd frontend
npm run dev
```

3. Open http://localhost:3000 in your browser

### Default Login

The application uses username/password authentication. Register a new account or use the application without video chat features (Agora setup required for video).

## Project Structure

- `/frontend` - Next.js frontend application
- `/backend` - Express.js backend server with Socket.io
- `/backend/schema.sql` - PostgreSQL database schema
