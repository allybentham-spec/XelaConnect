//
//  MessagesView.swift
//  XelaConnect
//

import SwiftUI

struct MessagesView: View {
    var body: some View {
        NavigationStack {
            ZStack {
                LinearGradient.darkGradient
                    .ignoresSafeArea()
                
                VStack(spacing: 20) {
                    Image(systemName: "messages" == "community" ? "person.3" : "messages" == "discover" ? "sparkles" : "message")
                        .font(.system(size: 64))
                        .foregroundColor(.white.opacity(0.3))
                    
                    Text("Messages")
                        .font(.system(size: 24, weight: .bold))
                        .foregroundColor(.white)
                    
                    Text("Coming soon in the next update")
                        .font(.system(size: 16))
                        .foregroundColor(.white.opacity(0.6))
                }
            }
            .navigationTitle("Messages")
        }
    }
}
