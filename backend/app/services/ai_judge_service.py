import asyncio
from lionagi import Branch, iModel
from aiocache import cached
from ai_judge.rubric import Rubric
from ai_judge.form import CodeAnalysisForm
from config import judge_model_config
from dotenv import load_dotenv
load_dotenv()


@cached(ttl=3600)
async def judge_code(
    code_submission: str,
    rubric: Rubric,
    instruction: str = None,
    context: str = None,
    model_config: dict = None,
    display_message: bool = True,
    verbose: bool = True,
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
        print(f"Evaluating code submission with {rubric.name}...")
    form = await branch.chat(form=form)
    if display_message:
        print(f"Result for {rubric.name}:\n")
        print(form.display_message)
    return form.to_dict()
    
    
async def main():
    from ai_judge.code_documentation_rubric import documentation_rubric
    from ai_judge.code_quality import code_quality_rubric
    from ai_judge.project_management_rubric import project_management_rubric
    from ai_judge.software_design_rubric import software_design_rubric
    from ai_judge.ui_design_rubric import ui_design_rubric
    from ai_judge.sample_codes import code1, code2
    from lionfuncs import alcall
    
    rubrics = [
        documentation_rubric,
        code_quality_rubric,
        project_management_rubric,
        software_design_rubric,
        ui_design_rubric,
    ]
    
    async def _judge(rubric, code_submission: str, language="Python"):
        return await judge_code(
            code_submission=code_submission,
            rubric=rubric,
            language=language,
        )
    
    async def judge_all(code_submission: str, language: str):
        return await alcall(
            rubrics,
            _judge,
            code_submission=code_submission,
            language=language,
        )
    
    await judge_all(code1, "Python")
    await judge_all(code2, "TypeScript")

if __name__ == "__main__":
    asyncio.run(main())