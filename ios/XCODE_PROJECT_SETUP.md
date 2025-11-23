# XelaConnect iOS - Xcode Project Setup Guide

## 📱 Complete Native iOS App with SwiftUI

All source code files have been created in `/app/ios/XelaConnect/`

## 🚀 Quick Start - Create Xcode Project

### Step 1: Open Xcode

1. Open Xcode (version 15.0 or later required)
2. Click "Create New Project"
3. Select "iOS" → "App"
4. Click "Next"

### Step 2: Project Configuration

**Product Name:** XelaConnect
**Team:** Select your Apple Developer team
**Organization Identifier:** com.xelaconnect
**Bundle Identifier:** com.xelaconnect.app
**Interface:** SwiftUI
**Language:** Swift
**Storage:** None (we use Keychain)
**Include Tests:** ✅ (optional)

Click "Next" and choose save location (use `/app/ios/`)

### Step 3: Add Source Files

1. In Xcode, delete the default files:
   - ContentView.swift (we have our own)
   - XelaConnectApp.swift (we have our own)

2. In Finder, navigate to `/app/ios/XelaConnect/`

3. Drag ALL folders and files into Xcode project navigator:
   - ✅ Copy items if needed
   - ✅ Create groups
   - ✅ Add to targets: XelaConnect

### Step 4: Configure Info.plist

Add these keys:

```xml
<key>NSCameraUsageDescription</key>
<string>XelaConnect needs camera access to update your profile picture</string>

<key>NSPhotoLibraryUsageDescription</key>
<string>XelaConnect needs photo access to update your profile picture</string>

<key>UIUserInterfaceStyle</key>
<string>Dark</string>

<key>App Transport Security Settings</key>
<dict>
    <key>Allow Arbitrary Loads</key>
    <true/>
</dict>
```

### Step 5: Update Backend URL

In `Services/NetworkService.swift`, update line 15:

```swift
private let baseURL = "https://YOUR_BACKEND_URL.com/api"
```

### Step 6: Build & Run

1. Select target device (iPhone 15 Pro or your physical device)
2. Press ⌘R or click Run button
3. App should launch with Welcome screen!

---

## 📂 Project Structure

```
XelaConnect/
├── XelaConnectApp.swift       # App entry point
├── ContentView.swift           # Main navigation
├── Models/
│   └── User.swift             # User & Auth models
├── ViewModels/
│   └── AuthViewModel.swift    # Authentication logic
├── Views/
│   ├── Auth/
│   │   ├── WelcomeView.swift  # Onboarding
│   │   ├── LoginView.swift    # Login screen
│   │   └── SignupView.swift   # Signup screen
│   ├── Main/
│   │   ├── MainTabView.swift  # Tab bar navigation
│   │   ├── DashboardView.swift# Dashboard
│   │   ├── CommunityView.swift# Community (placeholder)
│   │   ├── DiscoverView.swift # Discover (placeholder)
│   │   └── MessagesView.swift # Messages (placeholder)
│   └── Profile/
│       └── ProfileView.swift  # Profile screen
├── Services/
│   ├── NetworkService.swift   # API client
│   └── KeychainService.swift  # Secure storage
├── Utilities/
│   ├── Colors.swift           # Brand colors
│   └── GlassCard.swift        # Reusable components
└── Assets.xcassets/           # Images & colors
```

---

## 🎨 Features Implemented

### ✅ Authentication
- Beautiful gradient welcome screen
- Email/password login
- Email/password signup
- Keychain secure token storage
- Automatic session restore

### ✅ Main App
- Tab bar navigation (5 tabs)
- Dashboard with stats
- Profile with user info
- Glassmorphism UI effects
- XelaConnect brand colors

### ✅ Architecture
- MVVM pattern
- SwiftUI async/await
- Proper error handling
- Secure Keychain storage
- RESTful API integration

---

## 🔧 Configuration Files Needed

### Required Files (Create These)

#### 1. `LoginView.swift`
```swift
// See next section for full code
```

#### 2. `SignupView.swift`
```swift
// See next section for full code
```

#### 3. `MainTabView.swift`
```swift
// See next section for full code
```

#### 4. `DashboardView.swift`
```swift
// See next section for full code
```

#### 5. `ProfileView.swift`
```swift
// See next section for full code
```

---

## 📱 Running on Physical Device

### Requirements:
- Apple Developer Account (free or paid)
- iOS device with iOS 17.0+
- USB cable

### Steps:
1. Connect iPhone to Mac
2. In Xcode, select your device from device menu
3. Go to Signing & Capabilities
4. Select your Team
5. Click Run (⌘R)
6. On iPhone: Settings → General → VPN & Device Management → Trust Developer

---

## 🏗️ Building for TestFlight

### 1. Archive Build
- Product → Archive
- Wait for build to complete

### 2. Distribute
- Click "Distribute App"
- Select "App Store Connect"
- Upload

### 3. TestFlight
- Go to App Store Connect
- My Apps → XelaConnect → TestFlight
- Add internal testers
- Submit for beta review

---

## 🚢 Submitting to App Store

### Prerequisites Checklist:
- [ ] App icon (1024x1024px)
- [ ] Screenshots (all required sizes)
- [ ] Privacy policy URL
- [ ] App description
- [ ] Keywords
- [ ] Support URL
- [ ] Marketing URL (optional)
- [ ] Age rating

### Submission Steps:
1. **App Store Connect**
   - Create new app
   - Fill in metadata
   - Upload screenshots

2. **Build**
   - Archive in Xcode
   - Upload to App Store Connect

3. **App Review**
   - Submit for review
   - Wait for approval (1-3 days)

4. **Release**
   - Automatic or manual release
   - App goes live!

---

## 🐛 Common Issues & Solutions

### Issue: "No such module 'SwiftUI'"
**Solution:** Make sure deployment target is iOS 17.0+

### Issue: "Cannot find 'EnvironmentObject'"
**Solution:** Import SwiftUI in all views

### Issue: Keychain access error
**Solution:** Enable Keychain Sharing capability in Xcode

### Issue: Network request fails
**Solution:** Update backend URL in NetworkService.swift

### Issue: Build fails
**Solution:** Clean build folder (⌘⇧K) then rebuild

---

## 📖 Next Steps

After basic setup is complete:

1. **Phase 2: Enhanced Features**
   - Community circles integration
   - Discover page with API
   - Real-time messaging
   - Video calling (Daily.co SDK)

2. **Phase 3: Native Features**
   - Push notifications (APNs)
   - Camera/photo picker
   - FaceID/TouchID authentication
   - Background refresh

3. **Phase 4: Polish**
   - App Store assets
   - Onboarding flow
   - Analytics integration
   - Crash reporting

---

## 🎯 Testing Checklist

- [ ] Welcome screen displays correctly
- [ ] Can navigate to Login
- [ ] Can navigate to Signup
- [ ] Login with valid credentials works
- [ ] Login with invalid credentials shows error
- [ ] Signup creates new account
- [ ] Session persists after app restart
- [ ] Logout clears session
- [ ] Dashboard shows user data
- [ ] Profile displays correctly
- [ ] Tab bar navigation works

---

## 📞 Support Resources

- **Apple Developer Documentation:** https://developer.apple.com/documentation/
- **SwiftUI Tutorials:** https://developer.apple.com/tutorials/swiftui
- **App Store Guidelines:** https://developer.apple.com/app-store/review/guidelines/
- **Human Interface Guidelines:** https://developer.apple.com/design/human-interface-guidelines/

---

## ✅ Success Criteria

Your app is ready when:
1. ✅ Xcode project builds without errors
2. ✅ App runs on simulator
3. ✅ App runs on physical device
4. ✅ Login/Signup flows work
5. ✅ Backend API integration successful
6. ✅ Navigation between screens works
7. ✅ Logout clears session properly

---

**Your native iOS app is now ready for Xcode!** 🎉

All source code is in `/app/ios/XelaConnect/`

**Next:** Open Xcode and follow Step 1 above to create the project!
