#!/bin/bash

BASE_URL="http://localhost:8000/api"

echo "0. Setup Users..."
# Ensure Bidder exists (ID 18 from previous test)
# Ensure Project 1 exists

echo "1. Login as Project Owner..."
LOGIN_RESPONSE=$(curl -s -X POST $BASE_URL/login \
  -H "Content-Type: application/json" \
  -d '{"email": "api_tester@example.com", "password": "password"}')
TOKEN=$(echo $LOGIN_RESPONSE | sed -n 's/.*"token":"\([^"]*\)".*/\1/p')

if [ -z "$TOKEN" ]; then
  echo "Login failed for Owner"
  exit 1
fi
echo "Login Token: $TOKEN"

# Check User
USER_INFO=$(curl -s -X GET $BASE_URL/user -H "Authorization: Bearer $TOKEN")
echo "User Info: $USER_INFO"

PROJECT_ID=1
BIDDER_ID=18

echo "2. Create Milestone for Project $PROJECT_ID (Bidder $BIDDER_ID)..."
MILESTONE_RESPONSE=$(curl -s -X POST $BASE_URL/projects/$PROJECT_ID/milestones \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "bidder_id": '$BIDDER_ID',
    "amount": 250,
    "reason": "Initial Deposit"
  }')

echo "Milestone Create Response: $MILESTONE_RESPONSE"
MILESTONE_ID=$(echo $MILESTONE_RESPONSE | grep -o '"id":[0-9]*' | head -1 | cut -d':' -f2)

if [ -z "$MILESTONE_ID" ]; then
  echo "Failed to create milestone"
else
    echo "Milestone Created: ID $MILESTONE_ID"

    echo "3. Update Milestone Status to Released..."
    UPDATE_RESPONSE=$(curl -s -X PUT $BASE_URL/projects/$PROJECT_ID/milestones/$MILESTONE_ID \
      -H "Authorization: Bearer $TOKEN" \
      -H "Content-Type: application/json" \
      -d '{
        "status": "released"
      }')
    echo "Update Response: $UPDATE_RESPONSE"
fi

echo "4. List Milestones..."
LIST_RESPONSE=$(curl -s -X GET $BASE_URL/projects/$PROJECT_ID/milestones \
  -H "Authorization: Bearer $TOKEN")

echo "List Response Summary: $LIST_RESPONSE"

echo "Verification Complete."
