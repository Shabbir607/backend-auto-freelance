#!/bin/bash

BASE_URL="http://localhost:8000/api"

echo "0. Setup Bidder User..."
php artisan tinker --execute="
\$user = \App\Models\User::firstOrCreate(
    ['email' => 'bid_tester@example.com'],
    ['name' => 'Bid Tester', 'password' => bcrypt('password')]
);
\$user->assignRole('freelancer');
" > /dev/null

echo "1. Login as Bidder..."
LOGIN_RESPONSE=$(curl -s -X POST $BASE_URL/login \
  -H "Content-Type: application/json" \
  -d '{"email": "bid_tester@example.com", "password": "password"}')

TOKEN=$(echo $LOGIN_RESPONSE | sed -n 's/.*"token":"\([^"]*\)".*/\1/p')

if [ -z "$TOKEN" ]; then
  echo "Login failed for Bidder"
  exit 1
fi

echo "Login successful."

PROJECT_ID=1

echo "2. Place Bid on Project $PROJECT_ID..."
BID_RESPONSE=$(curl -s -X POST $BASE_URL/projects/$PROJECT_ID/bids \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 500,
    "period": 7,
    "description": "I can do this backend work in 1 week."
  }')

echo "Bid Response: $BID_RESPONSE"

echo "3. List Bids..."
LIST_RESPONSE=$(curl -s -X GET $BASE_URL/projects/$PROJECT_ID/bids \
  -H "Authorization: Bearer $TOKEN")

echo "List Response Summary: $(echo $LIST_RESPONSE | cut -c 1-200)..."

echo "Verification Complete."
