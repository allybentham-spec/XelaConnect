//
//  SignupView.swift
//  XelaConnect
//

import SwiftUI

struct SignupView: View {
    @EnvironmentObject var authViewModel: AuthViewModel
    @Environment(\.dismiss) var dismiss
    
    @State private var name = ""
    @State private var email = ""
    @State private var password = ""
    @State private var age = ""
    @State private var city = ""
    @State private var showAlert = false
    
    var body: some View {
        ZStack {
            LinearGradient.xelaGradient
                .ignoresSafeArea()
            
            ScrollView {
                VStack(spacing: 32) {
                    VStack(spacing: 8) {
                        Text("Join XelaConnect")
                            .font(.system(size: 36, weight: .bold))
                            .foregroundColor(.white)
                        
                        Text("Create your account")
                            .font(.system(size: 16))
                            .foregroundColor(.white.opacity(0.7))
                    }
                    .padding(.top, 60)
                    
                    VStack(spacing: 20) {
                        FormField(title: "Name *", text: $name, placeholder: "Your name")
                        FormField(title: "Email *", text: $email, placeholder: "you@example.com", keyboardType: .emailAddress)
                        FormField(title: "Password *", text: $password, placeholder: "Create a password", isSecure: true)
                        FormField(title: "Age", text: $age, placeholder: "25", keyboardType: .numberPad)
                        FormField(title: "City", text: $city, placeholder: "San Francisco")
                        
                        Button {
                            Task {
                                let ageInt = Int(age)
                                await authViewModel.signup(name: name, email: email, password: password, age: ageInt, city: city.isEmpty ? nil : city)
                                if authViewModel.errorMessage != nil {
                                    showAlert = true
                                }
                            }
                        } label: {
                            if authViewModel.isLoading {
                                ProgressView().tint(.xelaPurple)
                            } else {
                                Text("Create Account")
                                    .font(.system(size: 18, weight: .semibold))
                                    .foregroundColor(.xelaPurple)
                            }
                        }
                        .frame(maxWidth: .infinity)
                        .padding()
                        .background(Color.white)
                        .cornerRadius(12)
                        .disabled(authViewModel.isLoading)
                        .padding(.top, 12)
                    }
                    .padding(.horizontal, 32)
                    
                    Spacer()
                }
            }
        }
        .navigationBarBackButtonHidden(true)
        .toolbar {
            ToolbarItem(placement: .navigationBarLeading) {
                Button {
                    dismiss()
                } label: {
                    HStack(spacing: 4) {
                        Image(systemName: "chevron.left")
                        Text("Back")
                    }
                    .foregroundColor(.white)
                }
            }
        }
        .alert("Error", isPresented: $showAlert) {
            Button("OK", role: .cancel) {
                authViewModel.errorMessage = nil
            }
        } message: {
            Text(authViewModel.errorMessage ?? "Unknown error")
        }
    }
}

struct FormField: View {
    let title: String
    @Binding var text: String
    let placeholder: String
    var keyboardType: UIKeyboardType = .default
    var isSecure: Bool = false
    
    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(title)
                .font(.system(size: 14, weight: .medium))
                .foregroundColor(.white)
            
            if isSecure {
                SecureField(placeholder, text: $text)
                    .textContentType(.password)
                    .padding()
                    .background(Color.glassLight)
                    .cornerRadius(12)
                    .foregroundColor(.white)
                    .overlay(
                        RoundedRectangle(cornerRadius: 12)
                            .stroke(Color.glassBorder, lineWidth: 1)
                    )
            } else {
                TextField(placeholder, text: $text)
                    .keyboardType(keyboardType)
                    .autocapitalization(keyboardType == .emailAddress ? .none : .words)
                    .padding()
                    .background(Color.glassLight)
                    .cornerRadius(12)
                    .foregroundColor(.white)
                    .overlay(
                        RoundedRectangle(cornerRadius: 12)
                            .stroke(Color.glassBorder, lineWidth: 1)
                    )
            }
        }
    }
}
