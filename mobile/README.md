# XelaConnect Mobile App

React Native mobile application for XelaConnect - the premium emotional wellness social platform.

## 📱 Features

- **Authentication**: Email/password signup and login
- **Dashboard**: Beautiful stats, emotional path tracking, quick actions
- **Profile**: User profile with stats and settings
- **Navigation**: Bottom tab navigation with 5 main sections
- **Coming Soon**: Community, Discover, and Messages features

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (Mac) or Android Emulator

### Installation

1. Navigate to the mobile directory:
```bash
cd /app/mobile
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Edit `.env` file with your backend URL:
```
EXPO_PUBLIC_BACKEND_URL=http://YOUR_BACKEND_URL:8001
```

### Running the App

**Start Expo development server:**
```bash
npm start
```

**Run on iOS:**
```bash
npm run ios
```

**Run on Android:**
```bash
npm run android
```

**Run on Web:**
```bash
npm run web
```

## 📂 Project Structure

```
mobile/
├── App.js                 # Main app entry point
├── app.json              # Expo configuration
├── package.json          # Dependencies
├── .env                  # Environment variables
└── src/
    ├── screens/          # All screen components
    │   ├── WelcomeScreen.js
    │   ├── LoginScreen.js
    │   ├── SignupScreen.js
    │   ├── DashboardScreen.js
    │   ├── ProfileScreen.js
    │   ├── CommunityScreen.js
    │   ├── DiscoverScreen.js
    │   └── MessagesScreen.js
    ├── navigation/       # Navigation configuration
    │   └── AppNavigator.js
    ├── context/          # React Context (Auth)
    │   └── AuthContext.js
    ├── utils/            # Utilities
    │   └── api.js
    └── components/       # Reusable components
```

## 🎨 Design System

### Colors
- Primary Purple: `#8834AE`
- Primary Teal: `#39CCB7`
- Background Dark: `#1a1a2e`
- Background Light: `#2d2d44`

### Typography
- Headers: System Bold
- Body: System Regular
- Size range: 12-36px

## 🔧 Configuration

### app.json
```json
{
  "expo": {
    "name": "XelaConnect",
    "slug": "xelaconnect",
    "version": "1.0.0",
    "ios": {
      "bundleIdentifier": "com.xelaconnect.app"
    },
    "android": {
      "package": "com.xelaconnect.app"
    }
  }
}
```

## 📦 Dependencies

### Core
- `expo` - Expo framework
- `react` - React library
- `react-native` - React Native

### Navigation
- `@react-navigation/native` - Navigation library
- `@react-navigation/native-stack` - Stack navigator
- `@react-navigation/bottom-tabs` - Tab navigator

### UI
- `expo-linear-gradient` - Gradient backgrounds
- `@expo/vector-icons` - Icon library

### Storage & API
- `@react-native-async-storage/async-storage` - Local storage
- `axios` - HTTP client

## 🏗️ Building for Production

### iOS (requires Mac)

1. Install EAS CLI:
```bash
npm install -g eas-cli
```

2. Login to Expo:
```bash
eas login
```

3. Configure build:
```bash
eas build:configure
```

4. Build for iOS:
```bash
eas build --platform ios
```

### Android

1. Build for Android:
```bash
eas build --platform android
```

### Submit to App Stores

**iOS App Store:**
```bash
eas submit --platform ios
```

**Google Play Store:**
```bash
eas submit --platform android
```

## 📱 Testing

### Using Expo Go App

1. Install Expo Go on your phone:
   - iOS: https://apps.apple.com/app/expo-go/id982107779
   - Android: https://play.google.com/store/apps/details?id=host.exp.exponent

2. Scan QR code from terminal after running `npm start`

### Using Simulators

**iOS Simulator:**
- Install Xcode from Mac App Store
- Open Xcode > Preferences > Components > Install iOS Simulator
- Run: `npm run ios`

**Android Emulator:**
- Install Android Studio
- Create AVD (Android Virtual Device)
- Run: `npm run android`

## 🔐 Authentication

The app uses JWT-based authentication with the FastAPI backend:

1. User signs up with email/password
2. Backend returns user data + session_token
3. Token stored in AsyncStorage
4. Token sent with all API requests via axios interceptor

## 🌐 API Integration

All API calls go through `src/utils/api.js`:

```javascript
import api from '../utils/api';

// GET request
const response = await api.get('/users/me');

// POST request
const response = await api.post('/auth/login', {
  email: 'user@example.com',
  password: 'password'
});
```

## 🐛 Troubleshooting

### Metro bundler issues
```bash
npx react-native start --reset-cache
```

### iOS build issues
```bash
cd ios && pod install && cd ..
```

### Android build issues
```bash
cd android && ./gradlew clean && cd ..
```

## 📝 Next Steps

Phase 2 will include:
- Community Circles integration
- Discover page with user matching
- Real-time messaging
- Video calling with Daily.co
- Push notifications
- Camera/photo access
- Biometric authentication

## 📄 License

Private - XelaConnect

## 👥 Support

For support, contact the XelaConnect development team.
