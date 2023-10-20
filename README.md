# Country Info App

This application lets users search for a country and displays relevant information about it.

## Setup & Running

There are two methods to set up and run the application.

### Method 1: Running Frontend and Backend Separately

#### Frontend:
1. Navigate to the `frontend/` directory.
    ```bash
    cd frontend/
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm start
    ```

#### Backend:
1. Navigate to the `backend/` directory.
    ```bash
    cd backend/
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the server:
    ```bash
    node server.js
    ```

### Method 2: Unified Start from Backend

1. Ensure you've installed dependencies in both the `frontend` and `backend` directories.

2. Navigate to the `backend/` directory.
    ```bash
    cd backend/
    ```

3. Start both the backend and frontend with a single command:
    ```bash
    npm start
    ```


## Deployment:

The app is deployed on Heroku. [Link to Heroku app](https://country-info-task-app-fa8f688978df.herokuapp.com/)


## Testing:

### Frontend:
**Testing Tool:** Cypress

**How to run:**
1. Navigate to the `frontend/` directory.
2. Use the command `npx cypress open` to run tests 

### Backend:
**Testing Tool:** Jest

**How to run:**
1. Navigate to the `backend/` directory.
2. Run the command `npm test`.

Jest will automatically find and run all test files, giving you a concise report on each test's status.


## Features:

- User input for country search.
- Display of country data.
- Error handling and loading logic.

## Author:

[Jiahao Liu](https://github.com/everEvergolw/Country-Info-App)

