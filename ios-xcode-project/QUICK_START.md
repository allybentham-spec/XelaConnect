# XelaConnect iOS - Quick Start (2 Minutes)

## 🚀 Get Running in 2 Minutes

---

## Step 1: Extract (10 seconds)
```bash
tar -xzf XelaConnect-iOS-Xcode-Project.tar.gz
cd ios-xcode-project
```

## Step 2: Open Workspace (10 seconds)
```bash
open XelaConnect.xcworkspace
```

**⚠️ Open `.xcworkspace` NOT `.xcodeproj`**

## Step 3: Configure (30 seconds)

### A. Update Backend URL
File: `XelaConnect/Services/NetworkService.swift` line 15
```swift
private let baseURL = "https://your-api-url.com/api"
```

### B. Select Team
1. Click "XelaConnect" in left sidebar
2. Select "XelaConnect" target
3. "Signing & Capabilities" tab
4. Choose your Team

## Step 4: Run (1 minute)
```
Press ⌘R (Cmd + R)
```

**Done!** App launches in simulator 🎉

---

## 📱 What You'll See

1. **Welcome Screen** - Gradient with ✨
2. **Get Started** - Signup form
3. **Sign In** - Login form
4. **Dashboard** - Stats & progress
5. **5 Tabs** - Dashboard, Community, Discover, Messages, Profile

---

## 🔧 Troubleshooting

### Build Fails?
```bash
# Clean build
⌘⇧K

# Rebuild
⌘B
```

### No Team?
```
Xcode → Settings → Accounts → + → Add Apple ID
```

### Backend Not Connecting?
- Update backend URL in NetworkService.swift
- Ensure backend is running
- Check URL format: `https://domain.com/api`

---

## ✅ Success Checklist

- [ ] Extracted package
- [ ] Opened `.xcworkspace`
- [ ] Updated backend URL
- [ ] Selected team
- [ ] Built successfully (⌘B)
- [ ] App running (⌘R)

---

## 📖 Need More Help?

- **Detailed Setup:** Read `INSTALLATION_GUIDE.md`
- **Project Info:** Read `README.md`
- **App Code:** Explore `XelaConnect/` folder

---

**That's it! You're running XelaConnect on iOS!** 🚀
