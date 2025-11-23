//
//  AuthViewModel.swift
//  XelaConnect
//
//  Created by XelaConnect Team
//

import Foundation
import SwiftUI

@MainActor
class AuthViewModel: ObservableObject {
    @Published var isAuthenticated = false
    @Published var currentUser: User?
    @Published var isLoading = false
    @Published var errorMessage: String?
    
    init() {
        checkAuthStatus()
    }
    
    func checkAuthStatus() {
        if let token = KeychainService.shared.getToken(),
           let user = KeychainService.shared.getUser() {
            self.currentUser = user
            self.isAuthenticated = true
        }
    }
    
    func login(email: String, password: String) async {
        isLoading = true
        errorMessage = nil
        
        do {
            let response = try await NetworkService.shared.login(email: email, password: password)
            
            KeychainService.shared.saveToken(response.sessionToken)
            KeychainService.shared.saveUser(response.user)
            
            self.currentUser = response.user
            self.isAuthenticated = true
            
        } catch let error as NetworkError {
            switch error {
            case .serverError(let message):
                errorMessage = message
            case .invalidURL:
                errorMessage = "Invalid server URL"
            case .noData:
                errorMessage = "No data received"
            case .decodingError:
                errorMessage = "Failed to process response"
            }
        } catch {
            errorMessage = "Login failed: \(error.localizedDescription)"
        }
        
        isLoading = false
    }
    
    func signup(name: String, email: String, password: String, age: Int?, city: String?) async {
        isLoading = true
        errorMessage = nil
        
        do {
            let response = try await NetworkService.shared.signup(
                name: name,
                email: email,
                password: password,
                age: age,
                city: city
            )
            
            KeychainService.shared.saveToken(response.sessionToken)
            KeychainService.shared.saveUser(response.user)
            
            self.currentUser = response.user
            self.isAuthenticated = true
            
        } catch let error as NetworkError {
            switch error {
            case .serverError(let message):
                errorMessage = message
            case .invalidURL:
                errorMessage = "Invalid server URL"
            case .noData:
                errorMessage = "No data received"
            case .decodingError:
                errorMessage = "Failed to process response"
            }
        } catch {
            errorMessage = "Signup failed: \(error.localizedDescription)"
        }
        
        isLoading = false
    }
    
    func logout() {
        KeychainService.shared.clearAll()
        self.currentUser = nil
        self.isAuthenticated = false
    }
}
