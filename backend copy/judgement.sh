#!/bin/bash

# judgement.sh - Script to add the AI Judging System to the AI Hacking League Backend
# This script updates the backend codebase to include the AI Judging System,
# including necessary dependencies, configuration, and code.

# Exit immediately if a command exits with a non-zero status
set -e

# Ensure we're running from the root of the backend directory
if [ ! -f "pyproject.toml" ]; then
  echo "Error: pyproject.toml not found. Please run this script from the root of the backend directory."
  exit 1
fi

echo "Adding AI Judging System to the backend..."

# Add necessary dependencies
echo "Adding OpenAI Python client library..."
poetry add openai

# Update .env.example to include OPENAI_API_KEY
echo "Updating .env.example with OPENAI_API_KEY..."
if ! grep -q "OPENAI_API_KEY" .env.example; then
    echo "OPENAI_API_KEY=your_openai_api_key" >> .env.example
fi

# Update app/core/config.py to include OPENAI_API_KEY
echo "Updating app/core/config.py to include OPENAI_API_KEY..."
if ! grep -q "OPENAI_API_KEY" app/core/config.py; then
    sed -i "/class Settings/a\ \ \ \ OPENAI_API_KEY: str = os.getenv(\"OPENAI_API_KEY\", \"\")" app/core/config.py
fi

# Create the AI Judge service
echo "Creating app/services/ai_judge_service.py..."
cat <<EOL > app/services/ai_judge_service.py
import openai
from app.core.config import settings

openai.api_key = settings.OPENAI_API_KEY

def evaluate_code_submission(code: str) -> dict:
    # Define the prompt for the AI
    prompt = f\"\"\"
You are an AI code reviewer. Evaluate the following code submission based on the following criteria:
1. Functionality (40%): How well does the solution solve the given problem?
2. Innovation (30%): Does the solution present novel approaches or creative use of AI technologies?
3. Efficiency (20%): How optimized and performant is the code?
4. Code Quality (10%): Is the code well-structured, readable, and following best practices?

Provide a score out of 100 and detailed feedback for each criterion.

Code Submission:
{code}
\"\"\"
    try:
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "user", "content": prompt}
            ]
        )
        evaluation = response['choices'][0]['message']['content']
        return {"evaluation": evaluation}
    except Exception as e:
        return {"error": str(e)}
EOL

# Create the judge endpoint
echo "Creating app/api/endpoints/judge.py..."
cat <<EOL > app/api/endpoints/judge.py
from fastapi import APIRouter, UploadFile, File, Depends, HTTPException, status
from app.services.ai_judge_service import evaluate_code_submission
from typing import Any

router = APIRouter()

@router.post("/submit", response_model=dict)
async def submit_code(file: UploadFile = File(...)) -> Any:
    try:
        contents = await file.read()
        code = contents.decode('utf-8')
        evaluation = evaluate_code_submission(code)
        if "error" in evaluation:
            raise HTTPException(status_code=500, detail=evaluation["error"])
        return evaluation
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
EOL

# Update app/api/endpoints/__init__.py to include judge
echo "Updating app/api/endpoints/__init__.py to include judge..."
if ! grep -q "from . import judge" app/api/endpoints/__init__.py; then
    echo "from . import judge" >> app/api/endpoints/__init__.py
fi

# Update app/api/api.py to include the judge router
echo "Updating app/api/api.py to include judge router..."
if ! grep -q "from app.api.endpoints import judge" app/api/api.py; then
    sed -i "/from app.api.endpoints import/a\    judge," app/api/api.py
fi

if ! grep -q "api_router.include_router(judge.router" app/api/api.py; then
    sed -i "/api_router.include_router(users.router.*tags=\[\"users\"\])/a\api_router.include_router(judge.router, prefix=\"\/judge\", tags=\[\"judge\"\])" app/api/api.py
fi

echo "AI Judging System added successfully!"
