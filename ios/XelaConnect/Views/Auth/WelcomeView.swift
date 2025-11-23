//
//  WelcomeView.swift
//  XelaConnect
//
//  Created by XelaConnect Team
//

import SwiftUI

struct WelcomeView: View {
    @State private var showLogin = false
    @State private var showSignup = false
    
    var body: some View {
        NavigationStack {
            ZStack {
                // Gradient Background
                LinearGradient.xelaGradient
                    .ignoresSafeArea()
                
                VStack(spacing: 0) {
                    Spacer()
                    
                    // Logo & Title
                    VStack(spacing: 20) {
                        Text("✨")
                            .font(.system(size: 80))
                        
                        Text("XelaConnect")
                            .font(.system(size: 48, weight: .bold, design: .rounded))
                            .foregroundColor(.white)
                        
                        Text("Where meaningful connections happen")
                            .font(.system(size: 18))
                            .foregroundColor(.white.opacity(0.8))
                            .multilineTextAlignment(.center)
                            .padding(.horizontal, 40)
                    }
                    
                    Spacer()
                    
                    // Buttons
                    VStack(spacing: 16) {
                        Button {
                            showSignup = true
                        } label: {
                            Text("Get Started")
                                .font(.system(size: 18, weight: .semibold))
                                .foregroundColor(.xelaPurple)
                                .frame(maxWidth: .infinity)
                                .padding()
                                .background(Color.white)
                                .cornerRadius(16)
                        }
                        .shadow(color: .black.opacity(0.3), radius: 8, y: 4)
                        
                        Button {
                            showLogin = true
                        } label: {
                            Text("Sign In")
                                .font(.system(size: 18, weight: .semibold))
                                .foregroundColor(.white)
                                .frame(maxWidth: .infinity)
                                .padding()
                                .background(Color.white.opacity(0.2))
                                .cornerRadius(16)
                                .overlay(
                                    RoundedRectangle(cornerRadius: 16)
                                        .stroke(Color.white.opacity(0.3), lineWidth: 1)
                                )
                        }
                    }
                    .padding(.horizontal, 32)
                    
                    Text("Your people are waiting for you")
                        .font(.system(size: 14))
                        .foregroundColor(.white.opacity(0.7))
                        .padding(.top, 40)
                        .padding(.bottom, 60)
                }
            }
            .navigationDestination(isPresented: $showLogin) {
                LoginView()
            }
            .navigationDestination(isPresented: $showSignup) {
                SignupView()
            }
        }
    }
}

#Preview {
    WelcomeView()
        .environmentObject(AuthViewModel())
}
