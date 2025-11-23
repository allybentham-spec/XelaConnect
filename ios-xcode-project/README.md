# XelaConnect - Native iOS App (Xcode Project)

## 🎉 Complete Xcode-Ready Project

This is a production-ready Xcode project for XelaConnect - a premium emotional wellness social platform.

---

## 📦 What's Included

### Complete Xcode Project
- ✅ `XelaConnect.xcodeproj` - Full Xcode project file
- ✅ All Swift source files (19 files)
- ✅ Asset catalogs configured
- ✅ Build schemes configured
- ✅ iOS 17.0+ deployment target
- ✅ SwiftUI + MVVM architecture

### Source Files (19 Swift Files)
1. **Core**: XelaConnectApp.swift, ContentView.swift
2. **Models**: User.swift
3. **ViewModels**: AuthViewModel.swift
4. **Services**: NetworkService.swift, KeychainService.swift
5. **Utilities**: Colors.swift, GlassCard.swift
6. **Auth Views**: WelcomeView.swift, LoginView.swift, SignupView.swift
7. **Main Views**: MainTabView.swift, DashboardView.swift, CommunityView.swift, DiscoverView.swift, MessagesView.swift
8. **Profile**: ProfileView.swift

---

## 🚀 Getting Started

### Step 1: Extract the Project
```bash
# If you have a tar.gz file
tar -xzf XelaConnect.tar.gz

# Or unzip if you have a zip file
unzip XelaConnect.zip
```

### Step 2: Open in Xcode
1. Double-click `XelaConnect.xcodeproj`
2. OR: Open Xcode → File → Open → Select `XelaConnect.xcodeproj`

### Step 3: Configure Backend URL
1. Open `XelaConnect/Services/NetworkService.swift`
2. Update line 15:
```swift
private let baseURL = "https://YOUR_BACKEND_URL.com/api"
```

### Step 4: Configure Signing
1. Select XelaConnect target
2. Go to "Signing & Capabilities"
3. Select your Team
4. Xcode will auto-generate provisioning profile

### Step 5: Build & Run
1. Select iPhone 15 Pro simulator (or your device)
2. Press ⌘R or click Run button
3. App launches! 🎉

---

## 🎨 Features

### Authentication
- Beautiful gradient welcome screen
- Email/password login & signup
- Secure Keychain storage
- Automatic session restoration
- Error handling with alerts

### Main App
- Tab bar navigation (5 tabs)
- Dashboard with stats & emotional path
- Profile with user info & settings
- Glassmorphism UI design
- XelaConnect brand colors

### Architecture
- MVVM (Model-View-ViewModel)
- SwiftUI with async/await
- RESTful API integration
- Secure Keychain storage
- Proper separation of concerns

---

## 📱 Testing

### Simulator
1. Build project (⌘B)
2. Select simulator (iPhone 15 Pro recommended)
3. Run (⌘R)
4. Test all flows

### Physical Device
1. Connect iPhone via USB
2. Select device from device menu
3. Configure signing (Xcode will prompt)
4. Build & run
5. Trust developer on device

---

## 🔧 Project Configuration

### Deployment Target
- iOS 17.0+
- Swift 5.9+
- Xcode 15.0+

### Bundle Identifier
`com.xelaconnect.app`

### Capabilities
- Keychain Sharing (for secure storage)
- Camera Usage (for profile pictures)
- Photo Library Access (for profile pictures)

### Build Settings
- Dark mode only
- Portrait orientation only
- iPhone only (no iPad support yet)

---

## 📦 Building for Distribution

### Archive for TestFlight
1. Product → Archive
2. Wait for build to complete
3. Click "Distribute App"
4. Select "App Store Connect"
5. Upload

### TestFlight Distribution
1. Go to App Store Connect
2. My Apps → XelaConnect
3. TestFlight tab
4. Add internal/external testers
5. Submit for beta review

### App Store Submission
**Prerequisites:**
- [ ] Screenshots (all required sizes)
- [ ] App icon (1024x1024px)
- [ ] Privacy policy URL
- [ ] App description
- [ ] Keywords
- [ ] Age rating

**Steps:**
1. Archive build (above)
2. Upload to App Store Connect
3. Fill in app metadata
4. Submit for review
5. Wait for approval
6. Release!

---

## 🎨 Customization

### Colors
Edit `XelaConnect/Utilities/Colors.swift`:
```swift
static let xelaPurple = Color(red: 0.53, green: 0.20, blue: 0.68)
static let xelaTeal = Color(red: 0.22, green: 0.80, blue: 0.72)
```

### Backend URL
Edit `XelaConnect/Services/NetworkService.swift`:
```swift
private let baseURL = "YOUR_API_URL"
```

### App Icon
1. Create 1024x1024px icon
2. Add to `Assets.xcassets/AppIcon.appiconset`
3. Xcode auto-generates all sizes

---

## 🐛 Troubleshooting

### Build Fails - "No such module"
- Clean build folder: ⌘⇧K
- Rebuild: ⌘B

### Signing Error
- Select your Team in Signing & Capabilities
- Enable "Automatically manage signing"

### Keychain Errors
- Add Keychain Sharing capability
- Check bundle identifier

### Network Errors
- Update backend URL in NetworkService.swift
- Check backend is running and accessible

### Preview Crashes
- Clean build
- Restart Xcode
- Close all previews

---

## 📂 Project Structure

```
XelaConnect.xcodeproj/
├── project.pbxproj                 # Main project file
├── xcshareddata/
│   └── xcschemes/
│       └── XelaConnect.xcscheme   # Build scheme
└── project.xcworkspace/
    └── contents.xcworkspacedata   # Workspace

XelaConnect/
├── XelaConnectApp.swift           # Entry point
├── ContentView.swift              # Navigation
├── Models/
│   └── User.swift
├── ViewModels/
│   └── AuthViewModel.swift
├── Views/
│   ├── Auth/                      # Login, Signup, Welcome
│   ├── Main/                      # Dashboard, Tabs
│   └── Profile/                   # Profile screen
├── Services/
│   ├── NetworkService.swift       # API client
│   └── KeychainService.swift      # Secure storage
├── Utilities/
│   ├── Colors.swift               # Brand colors
│   └── GlassCard.swift            # UI components
├── Assets.xcassets/               # Images & colors
└── Preview Content/               # Preview assets
```

---

## 🔐 Security

- ✅ Keychain storage for tokens
- ✅ HTTPS API communication
- ✅ Secure password fields
- ✅ Token expiration handling
- ✅ No hardcoded credentials

---

## 🔮 Next Features

### Phase 2
- Community circles with live data
- Discover page with user matching
- Real-time messaging
- Video calling (Daily.co SDK)
- XelaTalks AI integration

### Phase 3
- Push notifications
- Face ID / Touch ID
- Photo picker
- Share extension
- Widgets

---

## 📖 Resources

- [Xcode Documentation](https://developer.apple.com/documentation/xcode)
- [SwiftUI Tutorials](https://developer.apple.com/tutorials/swiftui)
- [App Store Guidelines](https://developer.apple.com/app-store/review/guidelines/)

---

## ✅ Quick Start Checklist

- [ ] Extract project files
- [ ] Open XelaConnect.xcodeproj in Xcode
- [ ] Update backend URL in NetworkService.swift
- [ ] Configure signing (select your Team)
- [ ] Build project (⌘B)
- [ ] Run on simulator (⌘R)
- [ ] Test login/signup flows
- [ ] Test on physical device
- [ ] Archive for TestFlight
- [ ] Submit to App Store!

---

## 🎉 You're Ready!

Your complete Xcode project is ready to build, run, and submit to the App Store!

**Questions?** Read the comprehensive README in `XelaConnect/README.md`

**Made with ❤️ by XelaConnect Team**
