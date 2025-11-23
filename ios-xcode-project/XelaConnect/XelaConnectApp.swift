//
//  XelaConnectApp.swift
//  XelaConnect
//
//  Created by XelaConnect Team
//

import SwiftUI

@main
struct XelaConnectApp: App {
    @StateObject private var authViewModel = AuthViewModel()
    
    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(authViewModel)
        }
    }
}
