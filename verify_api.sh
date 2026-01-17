#!/bin/bash

BASE_URL="http://localhost:8000/api"

echo "1. Login..."
LOGIN_RESPONSE=$(curl -s -X POST $BASE_URL/login \
  -H "Content-Type: application/json" \
  -d '{"email": "api_tester@example.com", "password": "password"}')

TOKEN=$(echo $LOGIN_RESPONSE | sed -n 's/.*"token":"\([^"]*\)".*/\1/p')

if [ -z "$TOKEN" ]; then
  echo "Login failed: $LOGIN_RESPONSE"
  exit 1
fi

echo "Login successful. Token: $TOKEN"

echo "2. Create Project..."
PROJECT_RESPONSE=$(curl -s -X POST $BASE_URL/test-projects \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Implementation Project",
    "description": "Testing the backend implementation",
    "status": "active",
    "priority": "high",
    "start_date": "2023-01-01",
    "deadline": "2023-12-31"
  }')

echo "Project Response: $PROJECT_RESPONSE"
PROJECT_ID=$(echo $PROJECT_RESPONSE | grep -o '"id":[0-9]*' | head -1 | cut -d':' -f2)

if [ -z "$PROJECT_ID" ]; then
  echo "Failed to create project"
  exit 1
fi

echo "Project Created with ID: $PROJECT_ID"

echo "3. Create Task..."
TASK_RESPONSE=$(curl -s -X POST $BASE_URL/test-projects/$PROJECT_ID/tasks \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Backend Verification Task",
    "description": "Verify that tasks can be created",
    "status": "todo",
    "priority": "medium"
  }')

echo "Task Response: $TASK_RESPONSE"

echo "4. Create Daily Update..."
UPDATE_RESPONSE=$(curl -s -X POST $BASE_URL/test-projects/$PROJECT_ID/updates \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "This is a daily update for testing.",
    "date": "2023-10-27"
  }')

echo "Update Response: $UPDATE_RESPONSE"

echo "5. Get Project Details..."
GET_RESPONSE=$(curl -s -X GET $BASE_URL/test-projects/$PROJECT_ID \
  -H "Authorization: Bearer $TOKEN")

echo "Get Response Summary: $(echo $GET_RESPONSE | cut -c 1-200)..."

echo "Verification Complete."
