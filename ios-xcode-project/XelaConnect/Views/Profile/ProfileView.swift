//
//  ProfileView.swift
//  XelaConnect
//

import SwiftUI

struct ProfileView: View {
    @EnvironmentObject var authViewModel: AuthViewModel
    
    var body: some View {
        NavigationStack {
            ZStack {
                LinearGradient.darkGradient
                    .ignoresSafeArea()
                
                ScrollView {
                    VStack(spacing: 24) {
                        // Profile Card
                        GlassCard {
                            VStack(spacing: 16) {
                                // Avatar
                                AsyncImage(url: URL(string: authViewModel.currentUser?.picture ?? "")) { image in
                                    image
                                        .resizable()
                                        .aspectRatio(contentMode: .fill)
                                } placeholder: {
                                    Color.white.opacity(0.1)
                                }
                                .frame(width: 100, height: 100)
                                .clipShape(Circle())
                                .overlay(
                                    Circle()
                                        .stroke(Color.xelaPurple, lineWidth: 3)
                                )
                                .overlay(
                                    Button {} label: {
                                        Image(systemName: "camera.fill")
                                            .font(.system(size: 16))
                                            .foregroundColor(.white)
                                            .frame(width: 36, height: 36)
                                            .background(Color.xelaPurple)
                                            .clipShape(Circle())
                                    }
                                    .offset(x: 36, y: 36)
                                )
                                
                                Text(authViewModel.currentUser?.name ?? "User")
                                    .font(.system(size: 24, weight: .bold))
                                    .foregroundColor(.white)
                                
                                Text(authViewModel.currentUser?.email ?? "")
                                    .font(.system(size: 14))
                                    .foregroundColor(.white.opacity(0.6))
                                
                                if let city = authViewModel.currentUser?.city {
                                    HStack(spacing: 4) {
                                        Image(systemName: "mappin.circle.fill")
                                            .foregroundColor(.xelaTeal)
                                        Text(city)
                                            .foregroundColor(.xelaTeal)
                                    }
                                    .font(.system(size: 14))
                                }
                            }
                        }
                        .padding(.horizontal)
                        .padding(.top, 20)
                        
                        // Stats Row
                        HStack(spacing: 0) {
                            StatItem(value: "\(authViewModel.currentUser?.connections ?? 24)", label: "Connections")
                            
                            Divider()
                                .background(Color.glassBorder)
                                .frame(height: 40)
                            
                            StatItem(value: "\(authViewModel.currentUser?.streak ?? 7)", label: "Day Streak")
                            
                            Divider()
                                .background(Color.glassBorder)
                                .frame(height: 40)
                            
                            StatItem(value: "\(authViewModel.currentUser?.credits ?? 250)", label: "Credits")
                        }
                        .padding()
                        .background(Color.glass)
                        .cornerRadius(16)
                        .overlay(
                            RoundedRectangle(cornerRadius: 16)
                                .stroke(Color.glassBorder, lineWidth: 1)
                        )
                        .padding(.horizontal)
                        
                        // Menu Items
                        VStack(spacing: 0) {
                            MenuItem(icon: "person", title: "Edit Profile")
                            Divider().background(Color.glassBorder)
                            
                            MenuItem(icon: "gift", title: "Referral Code")
                            Divider().background(Color.glassBorder)
                            
                            MenuItem(icon: "creditcard", title: "Subscription")
                            Divider().background(Color.glassBorder)
                            
                            MenuItem(icon: "gearshape", title: "Settings")
                        }
                        .background(Color.glass)
                        .cornerRadius(16)
                        .overlay(
                            RoundedRectangle(cornerRadius: 16)
                                .stroke(Color.glassBorder, lineWidth: 1)
                        )
                        .padding(.horizontal)
                        
                        // Logout Button
                        Button {
                            authViewModel.logout()
                        } label: {
                            Text("Sign Out")
                                .font(.system(size: 16, weight: .semibold))
                                .foregroundColor(.red)
                                .frame(maxWidth: .infinity)
                                .padding()
                                .background(Color.red.opacity(0.1))
                                .cornerRadius(12)
                                .overlay(
                                    RoundedRectangle(cornerRadius: 12)
                                        .stroke(Color.red.opacity(0.3), lineWidth: 1)
                                )
                        }
                        .padding(.horizontal)
                        
                        Text("Version 1.0.0")
                            .font(.system(size: 12))
                            .foregroundColor(.white.opacity(0.3))
                            .padding(.bottom, 24)
                    }
                }
            }
            .navigationTitle("Profile")
        }
    }
}

struct StatItem: View {
    let value: String
    let label: String
    
    var body: some View {
        VStack(spacing: 4) {
            Text(value)
                .font(.system(size: 24, weight: .bold))
                .foregroundColor(.white)
            
            Text(label)
                .font(.system(size: 12))
                .foregroundColor(.white.opacity(0.6))
        }
        .frame(maxWidth: .infinity)
    }
}

struct MenuItem: View {
    let icon: String
    let title: String
    
    var body: some View {
        Button {} label: {
            HStack(spacing: 12) {
                Image(systemName: icon)
                    .font(.system(size: 20))
                    .foregroundColor(.white)
                    .frame(width: 24)
                
                Text(title)
                    .font(.system(size: 16))
                    .foregroundColor(.white)
                
                Spacer()
                
                Image(systemName: "chevron.right")
                    .font(.system(size: 14))
                    .foregroundColor(.white.opacity(0.4))
            }
            .padding()
        }
    }
}

#Preview {
    ProfileView()
        .environmentObject(AuthViewModel())
}
