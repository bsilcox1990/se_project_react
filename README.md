# WTWR (What to Wear?): Front End

The WTWR (What to Wear) front end is a responsive, user-friendly single-page application (SPA) built with React.js. It powers a weather-based clothing recommendation application by providing an intuitive interface for users to browse clothing items, manage their profiles, and receive personalized outfit suggestions based on weather data. The frontend communicates with the WTWR Express.js backend via RESTful API calls to fetch and manage clothing items and user data, delivering a seamless and engaging user experience.

## Features

- Clothing item management

  - Browse Clothing Items: Display a gallery of clothing items fetched from the backend, with details like name, image, and weather suitability.
  - Add Clothing Items: Authenticated users can add new clothing items through a form, uploading images and specifying details.
  - Like/Unlike Items: Authenticated users can like or unlike clothing items, with real-time updates to the UI.
  - Delete Items: Authenticated users can remove their own clothing items from the database.
  - Weather-Based Filtering: Filter clothing items based on current weather conditions retrieved from a weather API.

- User Management

  - Sign up: Create a new user account with a simple registration form.
  - Sign In: Securely log in to access authenticated features.
  - Profile Management: Authenticated users can update their profile information.
  - View Profile: Display current user information, including account details and liked items.

- Weather Integration

  - Real-Time Weather Data: Fetch current weather data via a third-party weather API to recommend appropriate clothing.
  - Dynamic Recommendations: Display outfit suggestions tailored to the user's location and current weather.

- Responsive Design

  - Mobile-Friendly: Optimized for various screen sizes, ensuring a consistent experience on desktops, tablets, and smartphones.

- Authentication

  - Secure Login: Users authenticate via JWT, with tokens stored securely in local storage.
  - Protected Routes: Restrict access to certain features to authenticated users only.
  - Session Persistence: Maintain user sessions across page refreshes using token-based authentication.

- Form Validation

  - Real-time Input Validation: The forms validate inputs as the user types, providing immediate feedback on errors.
  - Custom Error Messages: Each input field displays specific error messages based on HTML5 validation constraints.
  - Form Submission Control: Submit buttons are disabled until all inputs are valid, preventing submission of invalid data.
  - Reset Functionality: After successful registration, the forms reset to its initial state, clearing all inputs and errors.

## Tech Stack

- React.js: JavaScript library for building a dynamic, component-based user interface.
- React Router: Handles client-side routing for seamless navigation within the SPA.
- ESLint & Prettier: Enforces code quality and consistent formatting.
- Vite: Build tool for fast development and optimized production builds.
- React Hooks: Manages state and side effects in functional components.
- React Context: Centralized state management for user data and weather.
- CSS: Component-specific CSS files, with each React component paired with a dedicated .css file, styled using the BEM naming convention for clear, conflict-free class naming.
- Weather API: Provides real-time weather data for clothing recommendations.
- Figma: Used for designing the UI prototype.
- Fetch API: Native browser API for making RESTful API calls to the Express.js backend, supporting CRUD operations for clothing items and user data, with JWT-based authentication headers.

## Images

![Screenshot of project](/src/assets/WTWR.png)

![Screenshot of image Modal](/src/assets/WTWR-imageModal.png)

![Screenshot of form Modal](/src/assets/WTWR-formModal.png)

## Link to backend server

-[Link to server repo on github](https://github.com/bsilcox1990/se_project_express)

## Deployment Link

This website is deployed on GitHub pages.

-[Deployment Link](https://bsilcox1990.github.io/se_project_react/)

## Video explination of website

-[Google drive link](https://drive.google.com/file/d/1O4uf2jHUS5Wo3Wf5dxaCJfcxkPdOijQJ/view?usp=drive_link)

## Available plugins

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
