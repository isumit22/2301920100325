# Campus Notifications

A React campus notification dashboard for browsing, filtering, prioritizing, and tracking viewed campus updates. The app is built for the evaluation service API and includes frontend logging calls for notification fetches and view-state actions.

## Features

- All Notifications and Priority Notifications views
- Filters for `All`, `Placement`, `Result`, and `Event`
- Pagination with configurable page size
- Priority view sorted by newest notifications first
- Viewed notification tracking with `localStorage`
- Reset viewed state action
- Frontend logging through the evaluation service `/logs` endpoint
- Material UI based responsive interface

## Screenshots

### All Notifications

![All Notifications](<./Screenshot (529).png>)

### Priority Notifications

![Priority Notifications](<./Screenshot (528).png>)

### Paginated Notifications

![Paginated Notifications](<./Screenshot (527).png>)

## Repository Structure

```text
.
+-- evaluation-service/       # Evaluation API request/registration JSON files
+-- logging-middleware/       # Logging middleware notes
+-- notification-app-be/      # Backend notes/placeholders
+-- notification-app-fe/      # React + Vite frontend
+-- notification-system-design.md
+-- LICENSE
+-- README.md
+-- Screenshot (527).png
+-- Screenshot (528).png
+-- Screenshot (529).png
```

## Tech Stack

- React 19
- Vite
- Material UI
- JavaScript ES modules
- Browser `localStorage` for viewed-notification state

## Getting Started

### Prerequisites

- Node.js and npm installed
- Access to the evaluation service API
- An evaluation service access token, if the API requires authorization

### Run the Frontend

```bash
cd notification-app-fe
npm install
npm run dev
```

The Vite dev server is configured to run at:

```text
http://127.0.0.1:3000
```

On Windows PowerShell, if script execution blocks `npm`, run the same commands with `npm.cmd`:

```powershell
cd notification-app-fe
npm.cmd install
npm.cmd run dev
```

## Environment Variables

Create a `.env` file inside `notification-app-fe/` when you need to override the defaults:

```env
VITE_API_BASE_URL=http://4.224.186.213/evaluation-service
VITE_ACCESS_TOKEN=your_access_token
VITE_TOKEN_TYPE=Bearer
```

`VITE_API_BASE_URL` defaults to `http://4.224.186.213/evaluation-service` if it is not set.

## Available Scripts

Run these from `notification-app-fe/`:

```bash
npm run dev      # Start the local Vite server
npm run build    # Build production assets
npm run preview  # Preview the production build
npm run lint     # Run ESLint
```

## API Usage

The frontend reads notifications from:

```text
GET /notifications?limit={limit}&page={page}&notification_type={type}
```

When the filter is `All`, `notification_type` is omitted.

Frontend logs are sent to:

```text
POST /logs
```

Log payloads use the allowed values implemented in `notification-app-fe/src/middleware/logger.js`:

- `stack`: `frontend`, `backend`
- `level`: `debug`, `info`, `warn`, `error`, `fatal`
- `package`: `auth`, `config`, `middleware`, `utils`

## Notes

- Do not commit real access tokens or client secrets.
- `evaluation-service/registration.json` is useful for evaluation setup, but credentials should be rotated or moved to environment variables before sharing the repository publicly.
- Viewed notifications are stored locally in the browser under `viewed-notification-ids`.
