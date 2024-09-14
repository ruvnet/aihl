import openai
from app.core.config import settings
from cachetools import TTLCache, cached
import json

openai.api_key = settings.OPENAI_API_KEY

# Cache for evaluations, max 1000 items, TTL of 1 hour
evaluation_cache = TTLCache(maxsize=1000, ttl=3600)

@cached(evaluation_cache)
def evaluate_code_submission(code: str, language: str = "Python") -> dict:
    prompt = f"""
You are an AI code reviewer proficient in {language}. Evaluate the following code submission based on the following criteria:
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
            model=settings.AI_MODEL,
            messages=[
                {"role": "user", "content": prompt}
            ]
        )
        evaluation = response['choices'][0]['message']['content']
        return json.loads(evaluation)
    except json.JSONDecodeError:
        return {"error": "Failed to parse AI response as JSON."}
    except Exception as e:
        return {"error": str(e)}
