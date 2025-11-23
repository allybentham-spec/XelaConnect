//
//  CommunityView.swift
//  XelaConnect
//

import SwiftUI

struct CommunityView: View {
    var body: some View {
        NavigationStack {
            ZStack {
                LinearGradient.darkGradient
                    .ignoresSafeArea()
                
                VStack(spacing: 20) {
                    Image(systemName: "community" == "community" ? "person.3" : "community" == "discover" ? "sparkles" : "message")
                        .font(.system(size: 64))
                        .foregroundColor(.white.opacity(0.3))
                    
                    Text("Community")
                        .font(.system(size: 24, weight: .bold))
                        .foregroundColor(.white)
                    
                    Text("Coming soon in the next update")
                        .font(.system(size: 16))
                        .foregroundColor(.white.opacity(0.6))
                }
            }
            .navigationTitle("Community")
        }
    }
}
