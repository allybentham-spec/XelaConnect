#!/bin/bash

echo "🚀 XelaConnect Mobile App Builder"
echo "=================================="
echo ""

# Check if EAS CLI is installed
if ! command -v eas &> /dev/null
then
    echo "❌ EAS CLI not found. Installing..."
    npm install -g eas-cli
    echo "✅ EAS CLI installed!"
else
    echo "✅ EAS CLI already installed"
fi

echo ""
echo "Please choose a build option:"
echo "1) Build Android APK (direct install)"
echo "2) Build Android AAB (Google Play Store)"
echo "3) Build iOS Simulator"
echo "4) Build iOS Production (requires Apple Developer Account)"
echo "5) Cancel"
echo ""

read -p "Enter your choice (1-5): " choice

case $choice in
    1)
        echo "🔨 Building Android APK..."
        eas build --platform android --profile preview
        ;;
    2)
        echo "🔨 Building Android AAB for Play Store..."
        eas build --platform android --profile production
        ;;
    3)
        echo "🔨 Building iOS Simulator..."
        eas build --platform ios --profile preview
        ;;
    4)
        echo "🔨 Building iOS Production..."
        eas build --platform ios --profile production
        ;;
    5)
        echo "👋 Build cancelled"
        exit 0
        ;;
    *)
        echo "❌ Invalid choice"
        exit 1
        ;;
esac

echo ""
echo "✅ Build started!"
echo ""
echo "📱 Your build will be available at:"
echo "   https://expo.dev"
echo ""
echo "📧 You'll receive an email when the build completes"
echo "⏱️  Expected time: 10-30 minutes"
echo ""
echo "To check build status:"
echo "   eas build:list"
