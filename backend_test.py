#!/usr/bin/env python3
"""
Backend Testing Script for Daily.co Video Calling Integration
Tests all video calling endpoints with authentication
"""

import requests
import json
import time
import uuid
from datetime import datetime

# Configuration
BACKEND_URL = "https://emotion-bridge-3.preview.emergentagent.com"
API_BASE = f"{BACKEND_URL}/api"

class VideoCallingTester:
    def __init__(self):
        self.session_token = None
        self.user_id = None
        self.test_room_name = None
        self.test_results = []
        
    def log_result(self, test_name, success, details="", response_data=None):
        """Log test result"""
        result = {
            "test": test_name,
            "success": success,
            "details": details,
            "response_data": response_data,
            "timestamp": datetime.now().isoformat()
        }
        self.test_results.append(result)
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}: {details}")
        if response_data and not success:
            print(f"   Response: {json.dumps(response_data, indent=2)}")
    
    def create_test_user_and_login(self):
        """Create test user and get authentication token"""
        print("\n=== AUTHENTICATION SETUP ===")
        
        # Generate unique test user
        timestamp = int(time.time())
        test_email = f"videotest.user.{timestamp}@example.com"
        test_password = "TestPassword123!"
        
        # 1. Sign up
        signup_data = {
            "email": test_email,
            "password": test_password,
            "name": "Video Test User"
        }
        
        try:
            response = requests.post(f"{API_BASE}/auth/signup", json=signup_data, timeout=30)
            if response.status_code == 200:
                auth_data = response.json()
                self.session_token = auth_data["session_token"]
                self.user_id = auth_data["user"]["id"]
                self.log_result("User Signup", True, f"Created user: {test_email}")
                return True
            else:
                self.log_result("User Signup", False, f"Status: {response.status_code}", response.json())
                return False
        except Exception as e:
            self.log_result("User Signup", False, f"Exception: {str(e)}")
            return False
    
    def get_auth_headers(self):
        """Get authorization headers"""
        if not self.session_token:
            return {}
        return {"Authorization": f"Bearer {self.session_token}"}
    
    def test_create_room(self):
        """Test POST /api/video/rooms/create"""
        print("\n=== TESTING ROOM CREATION ===")
        
        # Test 1: Create room with default settings (minimal config)
        room_data = {
            "privacy": "public"
        }
        
        try:
            response = requests.post(
                f"{API_BASE}/video/rooms/create",
                json=room_data,
                headers=self.get_auth_headers(),
                timeout=30
            )
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ["url", "name", "privacy", "created_at"]
                if all(field in data for field in required_fields):
                    self.test_room_name = data["name"]  # Store for later tests
                    self.log_result("Create Room (Default)", True, f"Room created: {data['name']}", data)
                else:
                    missing = [f for f in required_fields if f not in data]
                    self.log_result("Create Room (Default)", False, f"Missing fields: {missing}", data)
            else:
                self.log_result("Create Room (Default)", False, f"Status: {response.status_code}", response.json())
        except Exception as e:
            self.log_result("Create Room (Default)", False, f"Exception: {str(e)}")
        
        # Test 2: Create room with custom name and max_participants
        custom_room_name = f"test-room-{int(time.time())}"
        room_data_custom = {
            "room_name": custom_room_name,
            "privacy": "public",
            "max_participants": 50
        }
        
        try:
            response = requests.post(
                f"{API_BASE}/video/rooms/create",
                json=room_data_custom,
                headers=self.get_auth_headers(),
                timeout=30
            )
            
            if response.status_code == 200:
                data = response.json()
                if data.get("name") == custom_room_name:
                    self.log_result("Create Room (Custom Name)", True, f"Custom room created: {custom_room_name}", data)
                else:
                    self.log_result("Create Room (Custom Name)", False, f"Name mismatch: expected {custom_room_name}, got {data.get('name')}", data)
            else:
                self.log_result("Create Room (Custom Name)", False, f"Status: {response.status_code}", response.json())
        except Exception as e:
            self.log_result("Create Room (Custom Name)", False, f"Exception: {str(e)}")
    
    def test_generate_token(self):
        """Test POST /api/video/rooms/token"""
        print("\n=== TESTING TOKEN GENERATION ===")
        
        if not self.test_room_name:
            self.log_result("Generate Token", False, "No test room available")
            return
        
        # Test token generation
        token_data = {
            "room_name": self.test_room_name,
            "user_name": "Video Test User",
            "is_owner": False,
            "expiration_minutes": 120
        }
        
        try:
            response = requests.post(
                f"{API_BASE}/video/rooms/token",
                json=token_data,
                headers=self.get_auth_headers(),
                timeout=30
            )
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ["token", "room_name", "user_name", "expires_at"]
                if all(field in data for field in required_fields):
                    self.log_result("Generate Token", True, f"Token generated for room: {data['room_name']}", data)
                else:
                    missing = [f for f in required_fields if f not in data]
                    self.log_result("Generate Token", False, f"Missing fields: {missing}", data)
            else:
                self.log_result("Generate Token", False, f"Status: {response.status_code}", response.json())
        except Exception as e:
            self.log_result("Generate Token", False, f"Exception: {str(e)}")
        
        # Test owner token
        owner_token_data = {
            "room_name": self.test_room_name,
            "user_name": "Video Test Owner",
            "is_owner": True,
            "expiration_minutes": 60
        }
        
        try:
            response = requests.post(
                f"{API_BASE}/video/rooms/token",
                json=owner_token_data,
                headers=self.get_auth_headers(),
                timeout=30
            )
            
            if response.status_code == 200:
                data = response.json()
                self.log_result("Generate Owner Token", True, f"Owner token generated", data)
            else:
                self.log_result("Generate Owner Token", False, f"Status: {response.status_code}", response.json())
        except Exception as e:
            self.log_result("Generate Owner Token", False, f"Exception: {str(e)}")
    
    def test_get_room(self):
        """Test GET /api/video/rooms/{room_name}"""
        print("\n=== TESTING ROOM RETRIEVAL ===")
        
        if not self.test_room_name:
            self.log_result("Get Room", False, "No test room available")
            return
        
        try:
            response = requests.get(
                f"{API_BASE}/video/rooms/{self.test_room_name}",
                headers=self.get_auth_headers(),
                timeout=30
            )
            
            if response.status_code == 200:
                data = response.json()
                if "name" in data and data["name"] == self.test_room_name:
                    self.log_result("Get Room", True, f"Room details retrieved: {self.test_room_name}", data)
                else:
                    self.log_result("Get Room", False, f"Room name mismatch or missing", data)
            elif response.status_code == 404:
                self.log_result("Get Room", False, f"Room not found: {self.test_room_name}", response.json())
            else:
                self.log_result("Get Room", False, f"Status: {response.status_code}", response.json())
        except Exception as e:
            self.log_result("Get Room", False, f"Exception: {str(e)}")
        
        # Test non-existent room
        try:
            response = requests.get(
                f"{API_BASE}/video/rooms/non-existent-room-12345",
                headers=self.get_auth_headers(),
                timeout=30
            )
            
            if response.status_code == 404:
                self.log_result("Get Non-existent Room", True, "Correctly returned 404 for non-existent room")
            else:
                self.log_result("Get Non-existent Room", False, f"Expected 404, got {response.status_code}", response.json())
        except Exception as e:
            self.log_result("Get Non-existent Room", False, f"Exception: {str(e)}")
    
    def test_list_rooms(self):
        """Test GET /api/video/rooms"""
        print("\n=== TESTING ROOM LISTING ===")
        
        try:
            response = requests.get(
                f"{API_BASE}/video/rooms",
                headers=self.get_auth_headers(),
                timeout=30
            )
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, dict) and "data" in data:
                    rooms = data["data"]
                    self.log_result("List Rooms", True, f"Retrieved {len(rooms)} rooms", {"room_count": len(rooms)})
                elif isinstance(data, list):
                    self.log_result("List Rooms", True, f"Retrieved {len(data)} rooms", {"room_count": len(data)})
                else:
                    self.log_result("List Rooms", True, "Rooms listed successfully", data)
            else:
                self.log_result("List Rooms", False, f"Status: {response.status_code}", response.json())
        except Exception as e:
            self.log_result("List Rooms", False, f"Exception: {str(e)}")
    
    def test_authentication_required(self):
        """Test that endpoints require authentication"""
        print("\n=== TESTING AUTHENTICATION REQUIREMENTS ===")
        
        endpoints = [
            ("POST", "/video/rooms/create", {"privacy": "public"}),
            ("GET", "/video/rooms", None),
            ("POST", "/video/rooms/token", {"room_name": "test", "user_name": "test"})
        ]
        
        for method, endpoint, data in endpoints:
            try:
                if method == "POST":
                    response = requests.post(f"{API_BASE}{endpoint}", json=data, timeout=30)
                else:
                    response = requests.get(f"{API_BASE}{endpoint}", timeout=30)
                
                if response.status_code == 401:
                    self.log_result(f"Auth Required - {method} {endpoint}", True, "Correctly requires authentication")
                else:
                    self.log_result(f"Auth Required - {method} {endpoint}", False, f"Expected 401, got {response.status_code}", response.json())
            except Exception as e:
                self.log_result(f"Auth Required - {method} {endpoint}", False, f"Exception: {str(e)}")
    
    def test_error_handling(self):
        """Test error handling scenarios"""
        print("\n=== TESTING ERROR HANDLING ===")
        
        # Test invalid token generation (missing room_name)
        try:
            response = requests.post(
                f"{API_BASE}/video/rooms/token",
                json={"user_name": "Test User"},  # Missing room_name
                headers=self.get_auth_headers(),
                timeout=30
            )
            
            if response.status_code == 422:  # Validation error
                self.log_result("Invalid Token Request", True, "Correctly rejected invalid token request")
            else:
                self.log_result("Invalid Token Request", False, f"Expected 422, got {response.status_code}", response.json())
        except Exception as e:
            self.log_result("Invalid Token Request", False, f"Exception: {str(e)}")
    
    def run_all_tests(self):
        """Run all tests"""
        print("🚀 Starting Daily.co Video Calling Backend Tests")
        print(f"Backend URL: {BACKEND_URL}")
        print("=" * 60)
        
        # Setup authentication
        if not self.create_test_user_and_login():
            print("❌ Authentication setup failed. Cannot proceed with tests.")
            return
        
        # Run tests
        self.test_authentication_required()
        self.test_create_room()
        self.test_generate_token()
        self.test_get_room()
        self.test_list_rooms()
        self.test_error_handling()
        
        # Summary
        self.print_summary()
    
    def print_summary(self):
        """Print test summary"""
        print("\n" + "=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        
        passed = sum(1 for r in self.test_results if r["success"])
        failed = len(self.test_results) - passed
        
        print(f"Total Tests: {len(self.test_results)}")
        print(f"✅ Passed: {passed}")
        print(f"❌ Failed: {failed}")
        print(f"Success Rate: {(passed/len(self.test_results)*100):.1f}%")
        
        if failed > 0:
            print("\n🔍 FAILED TESTS:")
            for result in self.test_results:
                if not result["success"]:
                    print(f"  • {result['test']}: {result['details']}")
        
        print("\n" + "=" * 60)

if __name__ == "__main__":
    tester = VideoCallingTester()
    tester.run_all_tests()