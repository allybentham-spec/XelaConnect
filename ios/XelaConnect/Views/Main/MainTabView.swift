//
//  MainTabView.swift
//  XelaConnect
//

import SwiftUI

struct MainTabView: View {
    @State private var selectedTab = 0
    
    var body: some View {
        TabView(selection: $selectedTab) {
            DashboardView()
                .tabItem {
                    Image(systemName: selectedTab == 0 ? "house.fill" : "house")
                    Text("Dashboard")
                }
                .tag(0)
            
            CommunityView()
                .tabItem {
                    Image(systemName: selectedTab == 1 ? "person.3.fill" : "person.3")
                    Text("Community")
                }
                .tag(1)
            
            DiscoverView()
                .tabItem {
                    Image(systemName: selectedTab == 2 ? "sparkles" : "sparkles")
                    Text("Discover")
                }
                .tag(2)
            
            MessagesView()
                .tabItem {
                    Image(systemName: selectedTab == 3 ? "message.fill" : "message")
                    Text("Messages")
                }
                .tag(3)
            
            ProfileView()
                .tabItem {
                    Image(systemName: selectedTab == 4 ? "person.fill" : "person")
                    Text("Profile")
                }
                .tag(4)
        }
        .tint(.xelaTeal)
    }
}
