//
//  Colors.swift
//  XelaConnect
//
//  Created by XelaConnect Team
//

import SwiftUI

extension Color {
    // XelaConnect Brand Colors
    static let xelaPurple = Color(red: 0.53, green: 0.20, blue: 0.68) // #8834AE
    static let xelaTeal = Color(red: 0.22, green: 0.80, blue: 0.72) // #39CCB7
    static let xelaBlue = Color(red: 0.13, green: 0.46, blue: 0.56) // #207690
    
    // Background Colors
    static let bgDark = Color(red: 0.10, green: 0.10, blue: 0.18) // #1a1a2e
    static let bgLight = Color(red: 0.18, green: 0.18, blue: 0.27) // #2d2d44
    
    // Glass Effect Colors
    static let glass = Color.white.opacity(0.05)
    static let glassBorder = Color.white.opacity(0.1)
    static let glassLight = Color.white.opacity(0.15)
}

// MARK: - Gradients
extension LinearGradient {
    static let xelaGradient = LinearGradient(
        colors: [Color.xelaPurple, Color.xelaTeal],
        startPoint: .topLeading,
        endPoint: .bottomTrailing
    )
    
    static let darkGradient = LinearGradient(
        colors: [Color.bgDark, Color.bgLight],
        startPoint: .top,
        endPoint: .bottom
    )
}
