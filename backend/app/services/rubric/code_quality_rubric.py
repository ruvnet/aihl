from .rubric import Rubric, RubricItem



functionality = RubricItem(
    name="Functionality",
    prompt="Assess how well the code meets the functional requirements.",
)

readability = RubricItem(
    name="Readability",
    prompt="Evaluate the readability and clarity of the code.",
)

efficiency = RubricItem(
    name="Efficiency",
    prompt="Examine the efficiency of the algorithms used.",
)

style_compliance = RubricItem(
    name="Style Compliance",
    prompt="Check adherence to coding style guidelines.",
)

error_handling = RubricItem(
    name="Error Handling",
    prompt="Analyze the robustness of error handling mechanisms.",
)

code_quality_rubric = Rubric(
    name="Code Quality Rubric",
    title="Rubric for Evaluating Code Quality",
    background="Used for assessing code submissions in programming challenges.",
    rubric_items={
        "functionality": functionality,
        "readability": readability,
        "efficiency": efficiency,
        "style_compliance": style_compliance,
        "error_handling": error_handling,
    },
    rubric_weights={
        "functionality": 0.4,
        "readability": 0.2,
        "efficiency": 0.2,
        "style_compliance": 0.1,
        "error_handling": 0.1,
    },
)
