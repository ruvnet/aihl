import openai
from app.core.config import settings

openai.api_key = settings.OPENAI_API_KEY

def evaluate_code_submission(code: str) -> dict:
    # Define the prompt for the AI
    prompt = f"""
You are an AI code reviewer. Evaluate the following code submission based on the following criteria:
1. Functionality (40%): How well does the solution solve the given problem?
2. Innovation (30%): Does the solution present novel approaches or creative use of AI technologies?
3. Efficiency (20%): How optimized and performant is the code?
4. Code Quality (10%): Is the code well-structured, readable, and following best practices?

Provide a score out of 100 and detailed feedback for each criterion.

Code Submission:
{code}
"""
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
