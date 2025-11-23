//
//  GlassCard.swift
//  XelaConnect
//
//  Created by XelaConnect Team
//

import SwiftUI

struct GlassCard<Content: View>: View {
    let content: Content
    
    init(@ViewBuilder content: () -> Content) {
        self.content = content()
    }
    
    var body: some View {
        content
            .padding(20)
            .background(
                RoundedRectangle(cornerRadius: 20)
                    .fill(Color.glass)
                    .overlay(
                        RoundedRectangle(cornerRadius: 20)
                            .stroke(Color.glassBorder, lineWidth: 1)
                    )
            )
    }
}

struct GlassButton: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .padding()
            .frame(maxWidth: .infinity)
            .background(
                RoundedRectangle(cornerRadius: 12)
                    .fill(Color.glassLight)
                    .overlay(
                        RoundedRectangle(cornerRadius: 12)
                            .stroke(Color.glassBorder, lineWidth: 1)
                    )
            )
            .scaleEffect(configuration.isPressed ? 0.98 : 1.0)
            .animation(.easeInOut(duration: 0.1), value: configuration.isPressed)
    }
}
