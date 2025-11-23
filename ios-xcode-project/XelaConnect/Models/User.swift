//
//  User.swift
//  XelaConnect
//
//  Created by XelaConnect Team
//

import Foundation

struct User: Codable, Identifiable {
    let id: String
    let name: String
    let email: String
    let picture: String?
    let age: Int?
    let city: String?
    let interests: [String]?
    let identityBadge: String?
    let streak: Int?
    let connections: Int?
    let emotionalPathProgress: Int?
    let credits: Int?
    let subscriptionTier: String?
    
    enum CodingKeys: String, CodingKey {
        case id, name, email, picture, age, city, interests
        case identityBadge = "identity_badge"
        case streak, connections
        case emotionalPathProgress = "emotional_path_progress"
        case credits
        case subscriptionTier = "subscription_tier"
    }
}

struct AuthResponse: Codable {
    let user: User
    let sessionToken: String
    
    enum CodingKeys: String, CodingKey {
        case user
        case sessionToken = "session_token"
    }
}

struct LoginRequest: Codable {
    let email: String
    let password: String
}

struct SignupRequest: Codable {
    let name: String
    let email: String
    let password: String
    let age: Int?
    let city: String?
}
