#!/bin/bash

BASE_URL="http://localhost:8000/api"

# 1. Login as Recruiter (User 17 - Project Owner from before, ensuring Company exists)
echo "1. Login as Recruiter..."
LOGIN_RECRUITER=$(curl -s -X POST $BASE_URL/login \
  -H "Content-Type: application/json" \
  -d '{"email": "api_tester@example.com", "password": "password"}')
TOKEN_RECRUITER=$(echo $LOGIN_RECRUITER | sed -n 's/.*"token":"\([^"]*\)".*/\1/p')

# 2. Login as Candidate (User 18 - Bidder from before, need to ensure Candidate profile exists)
echo "2. Login as Candidate..."
LOGIN_CANDIDATE=$(curl -s -X POST $BASE_URL/login \
  -H "Content-Type: application/json" \
  -d '{"email": "bid_tester@example.com", "password": "password"}')
TOKEN_CANDIDATE=$(echo $LOGIN_CANDIDATE | sed -n 's/.*"token":"\([^"]*\)".*/\1/p')

# Ensure Candidate Profile for User 18
echo "3. Creating Candidate Profile if not exists..."
# Using artisan to fast-track profile creation
php artisan tinker --execute="
\$user = \App\Models\User::where('email', 'bid_tester@example.com')->first();
\App\Models\Candidate::firstOrCreate(['user_id' => \$user->id], [
    'title' => 'Backend Expert',
    'profile_complete' => 80
]);
" > /dev/null

# 4. Post Job
echo "4. Recruiter Posts Job..."
JOB_RESPONSE=$(curl -s -X POST $BASE_URL/recruitment/jobs \
  -H "Authorization: Bearer $TOKEN_RECRUITER" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Interview Test Job",
    "category_id": 1,
    "role_id": 1,
    "experience_id": 1,
    "education_id": 1,
    "job_type_id": 1,
    "salary_type_id": 1,
    "vacancies": 1,
    "min_salary": 1000,
    "max_salary": 2000,
    "deadline": "2025-12-31",
    "description": "Job for testing interviews."
  }')
JOB_ID=$(echo $JOB_RESPONSE | grep -o '"id":[0-9]*' | head -1 | cut -d':' -f2)
echo "Job Posted: ID $JOB_ID"

# 5. Candidate Applies
echo "5. Candidate Applies for Job $JOB_ID..."
APPLY_RESPONSE=$(curl -s -X POST $BASE_URL/recruitment/jobs/$JOB_ID/apply \
  -H "Authorization: Bearer $TOKEN_CANDIDATE")
echo "Apply Response: $APPLY_RESPONSE"

# 6. Recruiter Schedules Interview
CANDIDATE_ID=$(php artisan tinker --execute="echo \App\Models\Candidate::where('user_id', 18)->first()->id;" | tail -n1)
echo "6. Recruiter Schedules Interview for Candidate ID $CANDIDATE_ID..."

INTERVIEW_RESPONSE=$(curl -s -X POST $BASE_URL/recruitment/jobs/$JOB_ID/interview \
  -H "Authorization: Bearer $TOKEN_RECRUITER" \
  -H "Content-Type: application/json" \
  -d '{
    "candidate_id": '$CANDIDATE_ID',
    "scheduled_at": "2026-02-01 10:00:00",
    "meeting_link": "http://meet.google.com/abc-xyz"
  }')
echo "Interview Response: $INTERVIEW_RESPONSE"

# 7. Recruiter Hires
echo "7. Recruiter Hires Candidate..."
HIRE_RESPONSE=$(curl -s -X POST $BASE_URL/recruitment/jobs/$JOB_ID/hire \
  -H "Authorization: Bearer $TOKEN_RECRUITER" \
  -H "Content-Type: application/json" \
  -d '{
    "candidate_id": '$CANDIDATE_ID',
    "budget": 1500,
    "deadline": "2026-03-01"
  }')
echo "Hire Response: $HIRE_RESPONSE"

echo "Verification Complete."
