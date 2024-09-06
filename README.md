<h1 align="center">Welcome to asterideexpoapp 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
</p>



# Asteride Expo App Unlock App

This is a React Native mobile application built using **Expo**. It enables real estate companies to remotely unlock homes for potential buyers to view. The app showcases functionality for state management, location services, and push notifications.

## Features

### 1. Basic UI/UX
- Clean and functional user interface (UI).
- Focused on functionality over design.

### 2. Home List
- After logging in, users can view a list of homes.
- Each home displays basic information such as:
  - Address
  - Image
  - Description.
- Data is fetched from a local JSON file (mock API).

### 3. Home Details and Unlock Feature
- When a user selects a home, they are navigated to the details screen.
- If the user’s current location is within 30 meters of the home (determined using **hard-coded data** for now), an "Unlock" button will appear.
- The "Unlock" button simulates an API call using hard-coded data to unlock the home.
- A success or error message is shown depending on the mock response.

### 4. Push Notifications (Bonus Feature)
- After successfully unlocking a home:
  - The **user** is notified when the home is successfully unlocked.
- Notifications are implemented using **Expo Notifications**.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ynirmal2/AsterideExpoApp.git
   cd real-estate-home-unlock-app
   ```

2. Install the project dependencies:
   ```bash
   npm install
   ```

3. Install the Expo CLI globally if not already installed:
   ```bash
   npm install -g expo-cli
   ```

4. Start the project:
   ```bash
   expo start
   ```

## Usage

1. Open the project in the Expo Go app or run it in an Android/iOS emulator.
2. On the login screen, you can mock login functionality.
3. After logging in, you will see a list of homes that you can unlock.
4. When you select a home, you'll be directed to a details screen. If you're within 30 meters (based on hard-coded location), you can press the "Unlock" button to unlock the home.
5. Upon successful unlocking, push notifications will be sent to both the admin and the user.

## Location and Unlock Simulation

- **Live Location**: The user’s location is determined using the `expo-location` library.
- **Unlock Simulation**: Unlocking a home uses hard-coded data. Future implementations can involve real API calls.

## Push Notifications

- **Admin Notification**: The admin is notified when the user is within the home’s vicinity.
- **User Notification**: The user is notified when the home is successfully unlocked.
- To enable push notifications:
  - Use a physical device or emulator that supports push notifications.
  - Follow Expo’s push notification setup and use Expo's notification services for testing.

### Configuring Push Notifications

1. Install the Expo Notifications package:
   ```bash
   expo install expo-notifications
   ```

2. Follow the [Expo Push Notifications Documentation](https://docs.expo.dev/push-notifications/overview/) to set up push notifications.

3. In the app, push tokens are retrieved and used to send notifications after the home is unlocked.

## Project Structure

```
/assets                # Stores images, icons, and other assets
/components            # Reusable components
/data                  # JSON files to mock API responses
/screens               # Different app screens (Home List, Details, etc.)
/service               # Different app srvices file(notification service)
App.js                 # Main entry point of the app
README.md              # This file
```

## Dependencies

- **React Native** (via Expo)
- **Expo SDK** (v49)
- **expo-location**: For getting the user’s current location.
- **expo-notifications**: For handling push notifications.

## Future Improvements

- Replace the hard-coded unlock feature with a real API integration.
- Improve the UI/UX for a more polished design.
- Implement authentication and role management for users and admins.


## Author

👤 **Yogesh Nirmal**

* Github: [@ynirmal2](https://github.com/ynirmal2)

## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_