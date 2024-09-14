from lionagi import Branch, iModel
from .model_config import model_config
from .rubric.rubric import Rubric
from .rubric.rubric_form import CodeAnalysisForm
from .rubric.code_quality_rubric import code_quality_rubric


async def judge_code_submission(
    submission_code: str,
    language: str = "Python",
    rubric: Rubric = code_quality_rubric,
) -> tuple[dict, str]:
    
    try:
        imodel = iModel(**model_config)
        form = CodeAnalysisForm(
            code_submission=submission_code,
            rubric=rubric,
            language=language,
        )
        branch = Branch(system=form.system_prompt, model=imodel)
        form: CodeAnalysisForm = await branch.chat(form=form)
        output_dict = form.to_output_dict()
        msg = f"""
        The AI Judge has evaluated your submission.
        Here is the result:
        {form.display_message}
        """
        return (output_dict, msg)
    except Exception as e:
        return ({"error": str(e)}, "Error in judging code submission")
