# Calendar

A modern, interactive calendar application built with React, TypeScript, and Vite. This application allows users to create, manage, and visualize events in a clean and intuitive interface.

<img width="1464" height="822" alt="Screenshot 2025-08-13 at 9 14 14 PM" src="https://github.com/user-attachments/assets/a4808184-5c61-4226-9cb0-47c4c5bb88f2" />

## Features

- **Interactive Calendar**: View, create, and manage events in a user-friendly interface
- **Event Management**: Add, edit, delete, and reschedule events with drag-and-drop functionality
- **Time Management**: Navigate between dates and view events in a time grid format
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Toast Notifications**: Get real-time feedback on your actions

## Technology Stack

- React 19
- TypeScript
- Vite
- FullCalendar
- DayJS for date manipulation
- React Day Picker for date selection
- React Toastify for notifications
- MSW (Mock Service Worker) for API mocking
- Vitest for testing

## Getting Started

### Prerequisites

- Node.js (v18 or newer)
- Yarn or npm

### Installation

1. Install dependencies:

   ```
   yarn install
   ```

   or

   ```
   npm install
   ```

2. Start the development server:

   ```
   yarn dev
   ```

   or

   ```
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `yarn dev` - Start the development server
- `yarn build` - Build the application for production
- `yarn lint` - Run ESLint to check for code quality issues
- `yarn preview` - Preview the production build locally
- `yarn test` - Run tests with Vitest

## Testing

This project uses Vitest for testing with MSW (Mock Service Worker) for API mocking. Tests are located in the `src/tests` directory.

### Running Tests

```
# Run all tests
yarn test

# Run tests in watch mode
yarn test --watch

# Run tests with coverage
yarn test --coverage

# Run a specific test file
yarn test src/tests/components/Calendar.test.tsx
```

## Project Structure

```
rec-calendar/
├── public/             # Public assets
│   └── mockServiceWorker.js  # MSW service worker
├── src/
│   ├── api/            # API integration and services
│   ├── assets/         # Static assets
│   ├── components/     # React components
│   │   ├── Calendar/   # Calendar component
│   │   ├── Editor/     # Event editor component
│   │   └── ...
│   ├── constants/      # Application constants
│   ├── hooks/          # Custom React hooks
│   ├── logger/         # Logging utilities
│   ├── mocks/          # Mock data and API handlers for MSW
│   ├── tests/          # Test files
│   ├── types/          # TypeScript type definitions
│   └── utils/          # Utility functions
└── ...
```

## Development Notes

- API mocking is handled by MSW (Mock Service Worker)
- The application uses FullCalendar for the calendar component
- Events can be dragged and resized directly on the calendar
- The project follows a modular structure for better maintainability

## License

This project is licensed under the MIT License.

## Acknowledgements

- [FullCalendar](https://fullcalendar.io/) for the calendar component
- [React](https://reactjs.org/) for the UI library
- [Vite](https://vitejs.dev/) for the build tool
- [MSW](https://mswjs.io/) for API mocking
