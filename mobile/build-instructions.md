# XelaConnect Mobile App - Build Instructions

## 🚀 Quick Start - Build with EAS (Easiest)

### Prerequisites
- Expo account (free): https://expo.dev/signup
- EAS CLI installed globally

### Step 1: Install EAS CLI
```bash
npm install -g eas-cli
```

### Step 2: Login to Expo
```bash
cd /app/mobile
eas login
```

### Step 3: Configure EAS Build
```bash
eas build:configure
```

This creates `eas.json` with build profiles.

### Step 4: Build for Android (APK)
```bash
eas build --platform android --profile preview
```

**Build Types:**
- `preview` - Creates APK for direct install (no Google Play)
- `production` - Creates AAB for Google Play Store

**Output:** Direct download link + file saved to Expo dashboard

### Step 5: Build for iOS (IPA)
```bash
eas build --platform ios --profile preview
```

**Note:** iOS builds require Apple Developer Account ($99/year)

---

## 📦 What You Get

### Android Build
- **File Type:** `.apk` (preview) or `.aab` (production)
- **Size:** ~50-80MB
- **Install:** Transfer to phone and install directly
- **Download:** Link provided after build + Expo dashboard

### iOS Build
- **File Type:** `.ipa`
- **Size:** ~60-100MB
- **Install:** Requires TestFlight or App Store
- **Download:** Link provided after build + Expo dashboard

---

## 🏗️ Build Profiles (eas.json)

After running `eas build:configure`, edit `eas.json`:

```json
{
  "build": {
    "preview": {
      "android": {
        "buildType": "apk"
      },
      "ios": {
        "simulator": true
      }
    },
    "production": {
      "android": {
        "buildType": "aab"
      },
      "ios": {
        "bundleIdentifier": "com.xelaconnect.app"
      }
    }
  }
}
```

---

## 📱 Installing on Your Phone

### Android (APK)
1. Download the APK file from build link
2. Transfer to Android phone
3. Enable "Install from Unknown Sources" in Settings
4. Tap APK file to install
5. Open XelaConnect app!

### iOS (TestFlight)
1. Build with production profile
2. Submit to TestFlight via EAS
3. Install TestFlight app on iPhone
4. Get invite link
5. Install XelaConnect via TestFlight

---

## 🏪 Submitting to App Stores

### Google Play Store

**1. Create Google Play Developer Account**
- Cost: $25 one-time fee
- Link: https://play.google.com/console/signup

**2. Build Production AAB**
```bash
eas build --platform android --profile production
```

**3. Submit to Play Store**
```bash
eas submit --platform android
```

**Required:**
- App icon (512x512px)
- Screenshots (multiple sizes)
- Privacy policy URL
- App description
- Content rating questionnaire

### Apple App Store

**1. Create Apple Developer Account**
- Cost: $99/year
- Link: https://developer.apple.com/programs/

**2. Build Production IPA**
```bash
eas build --platform ios --profile production
```

**3. Submit to App Store**
```bash
eas submit --platform ios
```

**Required:**
- App icon (1024x1024px)
- Screenshots (multiple sizes per device)
- Privacy policy URL
- App description
- Age rating
- App Store Connect account

---

## 🔧 Troubleshooting

### Build Failed - Missing Dependencies
```bash
cd /app/mobile
rm -rf node_modules
npm install
eas build --platform android --profile preview
```

### Build Failed - Environment Variables
Make sure `.env` file exists with:
```
EXPO_PUBLIC_BACKEND_URL=https://your-backend-url.com
```

### iOS Build Failed - No Apple Developer Account
Use simulator build for testing:
```bash
eas build --platform ios --profile preview
```

### Can't Download Build
1. Go to https://expo.dev/accounts/[username]/projects/xelaconnect/builds
2. Click on the completed build
3. Click "Download" button

---

## 🎯 Quick Commands Cheat Sheet

```bash
# Login to Expo
eas login

# Build Android APK (direct install)
eas build --platform android --profile preview

# Build Android AAB (Play Store)
eas build --platform android --profile production

# Build iOS Simulator
eas build --platform ios --profile preview

# Build iOS Production
eas build --platform ios --profile production

# Submit to Google Play
eas submit --platform android

# Submit to App Store
eas submit --platform ios

# Check build status
eas build:list

# View build logs
eas build:view [build-id]
```

---

## 💡 Tips

1. **First Build Takes Longer** (~15-30 minutes)
   - Subsequent builds are faster (~5-10 minutes)

2. **Test with Preview Build First**
   - Install APK directly on Android
   - Use simulator for iOS

3. **Update app.json Before Production**
   - Increment version number
   - Update bundle identifiers
   - Add app icons

4. **Backend URL Must Be Accessible**
   - Use production backend URL, not localhost
   - Ensure HTTPS for production builds

5. **Free Tier Limits**
   - Expo free tier: Limited build minutes
   - Consider upgrading for frequent builds

---

## 📞 Support

- Expo Docs: https://docs.expo.dev/build/introduction/
- Expo Discord: https://chat.expo.dev/
- Stack Overflow: Tag with `expo` and `react-native`

---

## ✅ Checklist Before Building

- [ ] All dependencies installed (`npm install`)
- [ ] `.env` file configured with backend URL
- [ ] `app.json` has correct bundle identifiers
- [ ] Expo account created and logged in
- [ ] Backend server is live and accessible
- [ ] Tested app with `npm start` and Expo Go

---

## 🎉 Success!

Once your build completes:
1. You'll receive an email with download link
2. Build appears in Expo dashboard
3. Download and install on your device
4. Share with testers or submit to stores!
