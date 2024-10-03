import asyncio
from IPython.display import display, Markdown
from lionagi import Branch, iModel
from aiocache import cached
from ai_judge.rubric import Rubric
from ai_judge.form import CodeAnalysisForm
from config import judge_model_config


@cached(ttl=3600)
async def judge_code(
    code_submission: str,
    rubric: Rubric,
    instruction: str = None,
    context: str = None,
    model_config: dict = None,
    display_message: bool = True,
    verbose: bool = False,
    language: str = "Python",
) -> CodeAnalysisForm:
    branch = Branch(imodel=iModel(**(model_config or judge_model_config)))
    form = CodeAnalysisForm(
        code_submission=code_submission,
        rubric=rubric,
        instruction=instruction,
        context=context,
        language=language,
    )
    if verbose:
        print("Evaluating code submission...")
    form = await branch.chat(form=form)
    if display_message:
        print(form.display_message)
    return form.to_dict()
    
    
async def main():
    from ai_judge.code_quality import code_quality_rubric
    from ai_judge.sample_codes import code1
    
    return await judge_code(
        code_submission=code1,
        rubric=code_quality_rubric,
    )
    
if __name__ == "__main__":
    asyncio.run(main())