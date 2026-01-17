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

echo "Login successful."

echo "2. Create Company..."
COMPANY_RESPONSE=$(curl -s -X POST $BASE_URL/job-board/companies \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": 17,
    "industry_type_id": 1,
    "organization_type_id": 1,
    "team_size_id": 1,
    "establishment_date": "2020-01-01",
    "website": "https://example.com"
  }')

echo "Company Response: $COMPANY_RESPONSE"
COMPANY_ID=$(echo $COMPANY_RESPONSE | grep -o '"id":[0-9]*' | head -1 | cut -d':' -f2)

if [ -z "$COMPANY_ID" ]; then
  echo "Failed to create company"
  # Continue anyway to try job post if check failed but creation worked
fi
echo "Company Created with ID: $COMPANY_ID"

echo "3. Create Job Post..."
JOB_RESPONSE=$(curl -s -X POST $BASE_URL/job-board/job-posts \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Senior Laravel Developer",
    "company_id": '$COMPANY_ID',
    "category_id": 1,
    "role_id": 1,
    "experience_id": 1,
    "education_id": 1,
    "job_type_id": 1,
    "salary_type_id": 1,
    "vacancies": "2",
    "min_salary": 5000,
    "max_salary": 8000,
    "deadline": "2025-12-31",
    "description": "We are looking for an expert Laravel developer."
  }')

echo "Job Response: $JOB_RESPONSE"

echo "4. List Jobs..."
LIST_RESPONSE=$(curl -s -X GET $BASE_URL/job-board/job-posts \
  -H "Authorization: Bearer $TOKEN")

echo "List Response Summary: $(echo $LIST_RESPONSE | cut -c 1-200)..."

echo "Verification Complete."
