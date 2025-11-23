//
//  DashboardView.swift
//  XelaConnect
//

import SwiftUI

struct DashboardView: View {
    @EnvironmentObject var authViewModel: AuthViewModel
    
    private var greeting: String {
        let hour = Calendar.current.component(.hour, from: Date())
        if hour < 12 { return "Good Morning" }
        if hour < 18 { return "Good Afternoon" }
        return "Good Evening"
    }
    
    var body: some View {
        NavigationStack {
            ZStack {
                LinearGradient.darkGradient
                    .ignoresSafeArea()
                
                ScrollView {
                    VStack(spacing: 24) {
                        // Header
                        HStack {
                            VStack(alignment: .leading, spacing: 4) {
                                Text(greeting)
                                    .font(.system(size: 16))
                                    .foregroundColor(.white.opacity(0.6))
                                
                                Text(authViewModel.currentUser?.name ?? "Friend")
                                    .font(.system(size: 28, weight: .bold))
                                    .foregroundColor(.white)
                            }
                            
                            Spacer()
                            
                            Button {} label: {
                                Image(systemName: "sparkles")
                                    .font(.system(size: 20))
                                    .foregroundColor(.xelaTeal)
                                    .frame(width: 48, height: 48)
                                    .background(Color.glass)
                                    .clipShape(Circle())
                            }
                        }
                        .padding(.horizontal)
                        .padding(.top, 20)
                        
                        // Stats
                        HStack(spacing: 12) {
                            StatCard(icon: "flame", label: "Day Streak", value: "7", color: .xelaTeal)
                            StatCard(icon: "person.2", label: "Connections", value: "24", color: .xelaPurple)
                            StatCard(icon: "book", label: "Courses", value: "2", color: .xelaBlue)
                        }
                        .padding(.horizontal)
                        
                        // Emotional Path
                        GlassCard {
                            VStack(alignment: .leading, spacing: 12) {
                                HStack {
                                    Text("Emotional Intelligence Path")
                                        .font(.system(size: 18, weight: .semibold))
                                        .foregroundColor(.white)
                                    
                                    Spacer()
                                    
                                    Image(systemName: "chart.line.uptrend.xyaxis")
                                        .foregroundColor(.xelaTeal)
                                }
                                
                                Text("You're already growing. Keep trusting the process.")
                                    .font(.system(size: 14))
                                    .foregroundColor(.white.opacity(0.6))
                                
                                ProgressView(value: 0.65)
                                    .tint(.xelaTeal)
                                    .padding(.top, 8)
                                
                                Text("65% Complete")
                                    .font(.system(size: 12))
                                    .foregroundColor(.white.opacity(0.6))
                            }
                        }
                        .padding(.horizontal)
                        
                        // XelaTalks
                        GlassCard {
                            HStack(spacing: 16) {
                                Image(systemName: "bubble.left.and.bubble.right.fill")
                                    .font(.system(size: 24))
                                    .foregroundColor(.xelaPurple)
                                    .frame(width: 56, height: 56)
                                    .background(Color.xelaPurple.opacity(0.2))
                                    .clipShape(Circle())
                                
                                VStack(alignment: .leading, spacing: 4) {
                                    Text("Talk with Xela")
                                        .font(.system(size: 18, weight: .semibold))
                                        .foregroundColor(.white)
                                    
                                    Text("Reflect, get motivated, or just chat.")
                                        .font(.system(size: 14))
                                        .foregroundColor(.white.opacity(0.6))
                                }
                                
                                Spacer()
                            }
                        }
                        .padding(.horizontal)
                        
                        // Quick Actions
                        VStack(alignment: .leading, spacing: 16) {
                            Text("Quick Actions")
                                .font(.system(size: 20, weight: .semibold))
                                .foregroundColor(.white)
                                .padding(.horizontal)
                            
                            HStack(spacing: 12) {
                                ActionButton(icon: "video", label: "Video Call")
                                ActionButton(icon: "person.3", label: "Circles")
                                ActionButton(icon: "sparkles", label: "Discover")
                            }
                            .padding(.horizontal)
                        }
                        
                        // Quote
                        GlassCard {
                            Text("Your connections don't need to be many — just meaningful.")
                                .font(.system(size: 14))
                                .foregroundColor(.white.opacity(0.7))
                                .multilineTextAlignment(.center)
                                .italic()
                        }
                        .padding(.horizontal)
                        .padding(.bottom, 24)
                    }
                }
            }
        }
    }
}

struct StatCard: View {
    let icon: String
    let label: String
    let value: String
    let color: Color
    
    var body: some View {
        VStack(spacing: 8) {
            Image(systemName: icon)
                .font(.system(size: 24))
                .foregroundColor(color)
                .frame(width: 48, height: 48)
                .background(color.opacity(0.2))
                .clipShape(Circle())
            
            Text(value)
                .font(.system(size: 24, weight: .bold))
                .foregroundColor(.white)
            
            Text(label)
                .font(.system(size: 12))
                .foregroundColor(.white.opacity(0.6))
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 16)
        .background(Color.glass)
        .cornerRadius(16)
        .overlay(
            RoundedRectangle(cornerRadius: 16)
                .stroke(Color.glassBorder, lineWidth: 1)
        )
    }
}

struct ActionButton: View {
    let icon: String
    let label: String
    
    var body: some View {
        Button {} label: {
            VStack(spacing: 8) {
                Image(systemName: icon)
                    .font(.system(size: 24))
                
                Text(label)
                    .font(.system(size: 12, weight: .medium))
            }
            .foregroundColor(.white)
            .frame(maxWidth: .infinity)
            .padding(.vertical, 20)
            .background(Color.glassLight)
            .cornerRadius(16)
            .overlay(
                RoundedRectangle(cornerRadius: 16)
                    .stroke(Color.glassBorder, lineWidth: 1)
            )
        }
    }
}
