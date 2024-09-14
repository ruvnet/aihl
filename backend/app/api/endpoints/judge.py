from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.ai_judge_service import evaluate_code_submission
from typing import Any

router = APIRouter()

@router.post("/submit", response_model=dict)
async def submit_code(file: UploadFile = File(...), language: str = "Python") -> Any:
    try:
        contents = await file.read()
        code = contents.decode('utf-8')
        evaluation = evaluate_code_submission(code, language)
        if "error" in evaluation:
            raise HTTPException(status_code=500, detail=evaluation["error"])
        return evaluation
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
