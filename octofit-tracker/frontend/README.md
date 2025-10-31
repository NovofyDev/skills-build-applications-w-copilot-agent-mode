# OctoFit Tracker Frontend

A React-based frontend for the OctoFit Tracker fitness application.

## Features

- **Activities**: View and track fitness activities
- **Leaderboard**: See user rankings and competitive standings
- **Teams**: Manage and view team information
- **Users**: User profiles and management
- **Workouts**: Browse and manage workout routines

## Tech Stack

- **React 19.2.0**: Modern React with hooks
- **React Router DOM 7.9.5**: Client-side routing and navigation
- **Bootstrap 5.3.8**: Responsive UI components and styling
- **ES6+**: Modern JavaScript features

## Setup and Installation

1. **Install dependencies:**
   ```bash
   npm install --prefix /path/to/octofit-tracker/frontend
   ```

2. **Configure environment:**
   - Copy `.env` and update `REACT_APP_CODESPACE_NAME` if using GitHub Codespaces
   - For local development, use the default `http://localhost:8000`

3. **Start development server:**
   ```bash
   npm start --prefix /path/to/octofit-tracker/frontend
   ```

## API Configuration

The frontend connects to the Django REST API backend on port 8000. The API base URL is automatically configured based on your environment:

- **GitHub Codespaces**: `https://[codespace-name]-8000.app.github.dev`
- **Local Development**: `http://localhost:8000`

### API Endpoints

Each component connects to its respective API endpoint:

- Activities: `/api/activities/`
- Leaderboard: `/api/leaderboard/`
- Teams: `/api/teams/`
- Users: `/api/users/`
- Workouts: `/api/workouts/`

## Component Structure

```
src/
├── App.js                 # Main app with navigation and routing
├── index.js              # App entry point with Bootstrap imports
└── components/
    ├── Activities.js     # Activities listing and management
    ├── Leaderboard.js    # User rankings and standings
    ├── Teams.js          # Team management and display
    ├── Users.js          # User profiles and information
    └── Workouts.js       # Workout routines and suggestions
```

## Available Scripts

### `npm start`
Runs the app in development mode on [http://localhost:3000](http://localhost:3000)

### `npm test`
Launches the test runner in interactive watch mode

### `npm run build`
Builds the app for production to the `build` folder

## Features

- **Responsive Design**: Bootstrap-based responsive layout
- **Error Handling**: Comprehensive error states and loading indicators
- **Console Logging**: API calls and responses logged for debugging
- **Flexible Data Handling**: Supports both paginated (`.results`) and plain array API responses
- **Navigation**: Clean navigation menu with React Router

## Development

The frontend is configured to run on port 3000 and automatically proxy API requests to the Django backend on port 8000.

All components include:
- Loading states with spinners
- Error handling with user-friendly messages
- Console logging for debugging
- Responsive card-based layouts
- Bootstrap styling and components
