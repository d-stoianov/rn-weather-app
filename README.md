# React Native Weather App

This project is a mobile application that displays weather data for various cities provided by the API. The app is designed with a focus on user experience, performance and architecture including features like offline mode, error handling and localization.

The development of this app was completed within a tight deadline of five days.

<img alt="home" src="https://github.com/user-attachments/assets/61dd88a9-8594-4eee-ac01-8c042fdab56f">
<img alt="details" src="https://github.com/user-attachments/assets/8ecad3bc-05b8-4d5f-8a53-99d8d9e275c4">

## Tech Stack

-   **Expo**
-   **React Native**
-   **TypeScript**
-   **React Native Navigation**
-   **Async Storage**
-   **Jest**

## Architecture

The application follows the MVVM (Model-View-ViewModel) architecture pattern.

-   Model: Handles data retrieval from the API and cache.
-   View: Displays data and interacts with the user.
-   ViewModel: Acts as a bridge between the Model and View, managing UI-related data.

## Cache strategy

The data from the API is being cached to the async storage once fetched and images are being cached with expo-image.

-   If data in async storage is fresh enough (12 hours), then we use it within application.
-   If data in async storage is not fresh, then we fetch it from the API.
-   If there is no data in async storage and an error from API (e.g no internet), then error is being displayed.

To force update the data, you can pull-to-refresh and the data will be fetched from API and updated in async storage.

## Getting Started

### Prerequisites

-   Node.js
-   npm

### Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/d-stoianov/rn-weather-app.git
    cd rn-weather-app
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

3.  Setup .env file:

    Create file in the root of the project called `.env`, with the following content:

    ```bash
    API_URL='https://us-central1-mobile-assignment-server.cloudfunctions.net/weather'
    ```

4.  Start the development server:

    ```bash
    npx expo start
    ```

5.  Open the app via Xcode/Android studio/Scan QR Code.

## Project Structure

-   `src/`: Contains all the source code
    -   `screens/`: Components for each screen (Home, Details)
    -   `services/`: Contains data retrieval from API/Cache and MVVM architecture implementation
    -   `components/`: Reusable components (cards, layout)
    -   `localization/`: Contains json file with key-value pairs for localizing the project
    -   `utils/`: Utility functions (e.g. formatting)
    -   `__tests__/`: Unit tests with Jest
    -   `App.tsx`: Navigation setup
    -   `main.ts`: Entry point

## Code Consistency

To keep code consistent and structured I have used Prettier and ESLint.

```bash
npm run lint
```

## Tests

I have used Jest testing library for writing unit tests.

```bash
npm run test
```
