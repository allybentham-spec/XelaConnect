# XelaConnect iOS - Complete Installation Guide

## 📱 Everything You Need to Get Started Tomorrow

---

## 📦 Package Contents

Your complete iOS app package includes:

### 1. Xcode Project Files
- ✅ `XelaConnect.xcodeproj` - Main project file
- ✅ `XelaConnect.xcworkspace` - Workspace file (OPEN THIS!)
- ✅ Complete project configuration
- ✅ All build settings pre-configured

### 2. Source Code (19 Swift Files)
```
XelaConnect/
├── XelaConnectApp.swift          # App entry point
├── ContentView.swift              # Main navigation
├── Info.plist                     # App configuration
├── Models/
│   └── User.swift                 # User data models
├── ViewModels/
│   └── AuthViewModel.swift        # Auth logic
├── Views/
│   ├── Auth/
│   │   ├── WelcomeView.swift     # Onboarding
│   │   ├── LoginView.swift       # Login screen
│   │   └── SignupView.swift      # Registration
│   ├── Main/
│   │   ├── MainTabView.swift     # Tab navigation
│   │   ├── DashboardView.swift   # Dashboard
│   │   ├── CommunityView.swift   # Community
│   │   ├── DiscoverView.swift    # Discover
│   │   └── MessagesView.swift    # Messages
│   └── Profile/
│       └── ProfileView.swift     # Profile screen
├── Services/
│   ├── NetworkService.swift      # API client
│   └── KeychainService.swift     # Secure storage
├── Utilities/
│   ├── Colors.swift               # Brand colors
│   └── GlassCard.swift            # UI components
└── Assets.xcassets/               # Images & colors
```

### 3. Documentation
- ✅ README.md - Project overview
- ✅ INSTALLATION_GUIDE.md - This file
- ✅ DOWNLOAD_INSTRUCTIONS.md - Download help

---

## 🚀 Step-by-Step Setup (5 Minutes)

### Step 1: Extract the Package
```bash
# On your Mac, extract the downloaded file
tar -xzf XelaConnect-iOS-Xcode-Project.tar.gz

# Navigate to the project
cd ios-xcode-project
```

### Step 2: Open the Workspace (IMPORTANT!)
```bash
# Open the WORKSPACE file (not the project file)
open XelaConnect.xcworkspace
```

**⚠️ Important:** Always open `XelaConnect.xcworkspace`, not `XelaConnect.xcodeproj`

### Step 3: First Launch Configuration

When Xcode opens:

1. **Trust the Project**
   - Xcode may show a security warning
   - Click "Trust and Open"

2. **Select Scheme**
   - Top toolbar: Select "XelaConnect" scheme
   - Select "iPhone 15 Pro" simulator

3. **Wait for Indexing**
   - Xcode will index the project
   - Wait for "Indexing..." to complete (1-2 minutes)

### Step 4: Configure Backend URL

**File:** `XelaConnect/Services/NetworkService.swift`

Find line 15 and update:
```swift
// BEFORE
private let baseURL = "YOUR_BACKEND_URL_HERE/api"

// AFTER (use your actual backend URL)
private let baseURL = "https://your-api.com/api"
```

**Examples:**
- Production: `"https://api.xelaconnect.com/api"`
- Staging: `"https://staging-api.xelaconnect.com/api"`
- Local: `"http://localhost:8001/api"` (for testing)

### Step 5: Configure Code Signing

1. **Select Target**
   - Click "XelaConnect" in Project Navigator
   - Select "XelaConnect" target

2. **Signing & Capabilities Tab**
   - Under "Signing", check "Automatically manage signing"
   - Select your Team (Apple ID)
   - Xcode will generate provisioning profile

3. **No Apple Developer Account?**
   - Use your personal Apple ID (free)
   - Good for simulator & personal device testing
   - Limited to 3 devices, 7-day certificates

### Step 6: Build & Run!

1. **Build the Project**
   - Press ⌘B (or Product → Build)
   - Wait for "Build Succeeded"

2. **Run on Simulator**
   - Press ⌘R (or Product → Run)
   - Simulator launches
   - App installs and opens
   - You'll see the Welcome screen! 🎉

---

## 🧪 Testing Your Setup

### Test Checklist
- [ ] Welcome screen displays with gradient
- [ ] Can navigate to Login screen
- [ ] Can navigate to Signup screen
- [ ] Login form accepts input
- [ ] Signup form accepts input
- [ ] Tab bar visible at bottom
- [ ] All 5 tabs are clickable
- [ ] Dashboard shows stats
- [ ] Profile screen displays

### Quick Test Flow
1. **Launch App** → See Welcome screen
2. **Tap "Get Started"** → See Signup screen
3. **Tap "Back"** → Return to Welcome
4. **Tap "Sign In"** → See Login screen
5. **Enter test email** (any email format)
6. **Enter test password** (any password)
7. **Tap "Sign In"** → Should see error (backend not connected yet)

---

## 📱 Running on Physical Device

### Requirements
- iPhone running iOS 17.0+
- Lightning/USB-C cable
- Same Apple ID as Xcode

### Steps

1. **Connect iPhone**
   - Plug iPhone into Mac
   - Unlock iPhone
   - Trust computer if prompted

2. **Select Device**
   - In Xcode, top toolbar
   - Click device menu
   - Select your iPhone (appears when connected)

3. **Build & Run**
   - Press ⌘R
   - Xcode installs app on device
   - App launches automatically

4. **Trust Developer (First Time)**
   - Settings → General → VPN & Device Management
   - Tap your developer profile
   - Tap "Trust [Your Name]"
   - Return to app

---

## 🔧 Common Setup Issues & Solutions

### Issue: "Failed to open workspace"
**Solution:**
```bash
# Make sure you opened the workspace, not project
open XelaConnect.xcworkspace  # ✅ Correct
# NOT: open XelaConnect.xcodeproj  # ❌ Wrong
```

### Issue: "No such module 'SwiftUI'"
**Solution:**
- Check Deployment Target is iOS 17.0+
- Clean build: ⌘⇧K
- Rebuild: ⌘B

### Issue: "Signing for XelaConnect requires a development team"
**Solution:**
1. Select XelaConnect target
2. Signing & Capabilities tab
3. Select your Team
4. If no team, add Apple ID: Xcode → Settings → Accounts → +

### Issue: "Unable to install app"
**Solution:**
- Check device is unlocked
- Trust computer on device
- Check device iOS version (17.0+ required)
- Try different USB port

### Issue: Build takes very long
**Solution:**
- First build always takes longer (5-10 min)
- Subsequent builds are much faster (30 sec)
- Close other apps to free up RAM

### Issue: Preview crashes
**Solution:**
- Previews are optional
- Close all previews: Editor → Canvas → Hide Canvas
- Focus on building and running

---

## 🎨 Customization Before Launch

### 1. Update App Name
**File:** `Info.plist`
```xml
<key>CFBundleDisplayName</key>
<string>XelaConnect</string>  <!-- Change this -->
```

### 2. Update Bundle Identifier
**Xcode:** Target → General → Bundle Identifier
```
com.xelaconnect.app  <!-- Use your company domain -->
```

### 3. Add App Icon
1. Prepare 1024x1024px PNG (with transparency)
2. Drag to `Assets.xcassets/AppIcon.appiconset`
3. Xcode generates all sizes

### 4. Update Colors (Optional)
**File:** `XelaConnect/Utilities/Colors.swift`
```swift
static let xelaPurple = Color(red: 0.53, green: 0.20, blue: 0.68)
static let xelaTeal = Color(red: 0.22, green: 0.80, blue: 0.72)
```

---

## 📊 Project Configuration

### Build Settings
- **Deployment Target:** iOS 17.0
- **Swift Version:** 5.9
- **Supported Devices:** iPhone only
- **Supported Orientations:** Portrait only
- **UI Style:** Dark mode only

### Capabilities
- ✅ Keychain Sharing (for auth)
- ✅ Camera access
- ✅ Photo library access
- ✅ Network access

### Privacy Permissions
All configured in `Info.plist`:
- Camera usage description
- Photo library usage description
- Microphone usage description (future video calls)

---

## 🔐 Security & Privacy

### Token Storage
- Uses iOS Keychain (secure)
- Tokens never stored in UserDefaults
- Automatic cleanup on logout

### Network Security
- HTTPS enforced (App Transport Security)
- Secure password entry
- No credentials in source code

### Privacy Compliance
- Camera/photo permissions requested when needed
- Clear usage descriptions
- No data collection without permission

---

## 📦 Building for Distribution

### For Testing (TestFlight)
1. **Archive Build**
   ```
   Product → Archive
   Wait 5-10 minutes
   ```

2. **Distribute**
   ```
   Click "Distribute App"
   Select "App Store Connect"
   Upload
   ```

3. **TestFlight**
   ```
   Go to App Store Connect
   My Apps → XelaConnect → TestFlight
   Add testers
   Submit for beta review
   ```

### For App Store
1. Complete app metadata in App Store Connect
2. Upload screenshots (required sizes)
3. Submit for review
4. Wait 1-3 days
5. Approve for release

---

## 📁 File Structure Reference

```
ios-xcode-project/
│
├── XelaConnect.xcworkspace/      ← OPEN THIS IN XCODE
│   ├── contents.xcworkspacedata
│   └── xcshareddata/
│       └── IDEWorkspaceChecks.plist
│
├── XelaConnect.xcodeproj/        ← Referenced by workspace
│   ├── project.pbxproj
│   ├── xcshareddata/
│   │   └── xcschemes/
│   │       └── XelaConnect.xcscheme
│   └── project.xcworkspace/
│       └── contents.xcworkspacedata
│
├── XelaConnect/                   ← All source code
│   ├── XelaConnectApp.swift
│   ├── ContentView.swift
│   ├── Info.plist
│   ├── Models/
│   ├── ViewModels/
│   ├── Views/
│   ├── Services/
│   ├── Utilities/
│   ├── Assets.xcassets/
│   └── Preview Content/
│
└── Documentation/
    ├── README.md
    ├── INSTALLATION_GUIDE.md
    └── DOWNLOAD_INSTRUCTIONS.md
```

---

## ✅ Launch Checklist

### Before First Build
- [ ] Extracted package
- [ ] Opened `.xcworkspace` (not `.xcodeproj`)
- [ ] Updated backend URL
- [ ] Selected development team
- [ ] Selected simulator or device
- [ ] Waited for indexing to complete

### After Successful Build
- [ ] App launches without errors
- [ ] Welcome screen displays correctly
- [ ] Can navigate between screens
- [ ] All UI elements visible
- [ ] No console errors (minor warnings OK)

### Before Device Testing
- [ ] Device connected and unlocked
- [ ] Device selected in Xcode
- [ ] Trusted computer on device
- [ ] Developer profile trusted

### Before App Store
- [ ] Updated backend URL (production)
- [ ] Added app icon
- [ ] Updated bundle identifier
- [ ] Updated version number
- [ ] Tested on multiple devices
- [ ] Prepared screenshots
- [ ] Written privacy policy

---

## 🎯 Success Metrics

After setup, you should be able to:
1. ✅ Open project without errors
2. ✅ Build project successfully
3. ✅ Run on simulator
4. ✅ See Welcome screen
5. ✅ Navigate all screens
6. ✅ Test on physical device (optional)

---

## 📞 Need Help?

### Documentation
1. **Quick Start:** README.md in project root
2. **Detailed Docs:** XelaConnect/README.md
3. **This Guide:** INSTALLATION_GUIDE.md

### Apple Resources
- [Xcode Help](https://developer.apple.com/documentation/xcode)
- [SwiftUI Tutorials](https://developer.apple.com/tutorials/swiftui)
- [Signing Guide](https://developer.apple.com/support/code-signing/)

### Common Commands
```bash
# Build
⌘B (Cmd + B)

# Run
⌘R (Cmd + R)

# Clean
⌘⇧K (Cmd + Shift + K)

# Stop
⌘. (Cmd + Period)

# Show console
⌘⇧Y (Cmd + Shift + Y)
```

---

## 🎉 You're All Set!

Your XelaConnect iOS app is ready to:
1. ✅ Build and run
2. ✅ Deploy to devices
3. ✅ Submit to TestFlight
4. ✅ Launch on App Store

**Next Steps:**
1. Open `XelaConnect.xcworkspace`
2. Update backend URL
3. Build & run (⌘R)
4. Start developing!

---

**Made with ❤️ for XelaConnect**

*Premium emotional wellness, now on iOS*
