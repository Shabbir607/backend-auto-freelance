#!/bin/bash
echo "Starting local environment..."

# Start Laravel backend API server on port 8000
php artisan serve --port=8000 &
BACKEND_PID=$!

# Start Vite dev server for React SPA
npm run dev -- --host &
FRONTEND_PID=$!

echo "Backend running on port 8000 (PID: $BACKEND_PID)"
echo "Frontend running via Vite (PID: $FRONTEND_PID)"
echo "Press Ctrl+C to stop both servers."

trap "kill $BACKEND_PID $FRONTEND_PID" EXIT
wait
