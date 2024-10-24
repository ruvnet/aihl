from .rubric import Rubric, RubricItem

functionality = RubricItem(
    name="functionality",
    prompt=(
        "Assess how well the code meets the functional requirements:\n"
        "- **Excellent**: Implements all required features correctly, handles all "
        "edge cases, and passes all test cases, including additional ones beyond "
        "the provided examples.\n"
        "- **Good**: Implements all required features correctly and handles most "
        "edge cases; passes all standard test cases.\n"
        "- **Fair**: Implements most required features but misses some edge cases "
        "or has minor bugs; passes some test cases.\n"
        "- **Poor**: Missing significant features, produces incorrect results, or "
        "fails to handle common cases; fails most test cases."
    ),
    weight=3.0,
)

readability = RubricItem(
    name="readability",
    prompt=(
        "Evaluate the readability and clarity of the code:\n"
        "- **Excellent**: Code is well-organized with clear, descriptive variable "
        "and function names; includes helpful comments and documentation for "
        "complex logic; follows a logical structure that is easy to follow.\n"
        "- **Good**: Code is generally well-organized with meaningful names; "
        "comments are present but may lack detail; overall structure is coherent.\n"
        "- **Fair**: Code has some disorganization or unclear naming; comments are "
        "minimal or lacking; structure may be hard to follow in places.\n"
        "- **Poor**: Code is difficult to read due to poor organization, unclear "
        "naming, and lack of comments; structure is confusing."
    ),
    weight=1.5,
)

efficiency = RubricItem(
    name="efficiency",
    prompt=(
        "Examine the efficiency of the algorithms used:\n"
        "- **Excellent**: Utilizes the most efficient algorithms and data "
        "structures appropriate for the problem; optimized for both time and "
        "space complexity.\n"
        "- **Good**: Uses efficient algorithms with acceptable time and space "
        "complexity; performance is adequate for the task.\n"
        "- **Fair**: Algorithms are correct but not optimized; may have higher "
        "time or space complexity than necessary.\n"
        "- **Poor**: Inefficient algorithms leading to significant unnecessary "
        "computation or resource usage; performance issues are evident."
    ),
    weight=1.5,
)

style_compliance = RubricItem(
    name="style_compliance",
    prompt=(
        "Check adherence to coding style guidelines (e.g., PEP 8 for Python):\n"
        "- **Excellent**: Consistently follows style guidelines in all aspects, "
        "including naming conventions, indentation, spacing, and formatting; no "
        "style errors detected by linters.\n"
        "- **Good**: Generally follows style guidelines with minor inconsistencies "
        "or deviations; few style warnings from linters.\n"
        "- **Fair**: Several instances of style guideline violations; code may "
        "generate multiple warnings from linters.\n"
        "- **Poor**: Frequently violates style guidelines; code is difficult to "
        "read due to inconsistent or incorrect styling; numerous linter errors."
    ),
    weight=1.0,
)

error_handling = RubricItem(
    name="error_handling",
    prompt=(
        "Analyze the robustness of error handling mechanisms:\n"
        "- **Excellent**: Anticipates and gracefully handles all potential errors "
        "and exceptions; provides clear and informative messages to the user; "
        "ensures program stability under all conditions.\n"
        "- **Good**: Handles most common errors and exceptions appropriately; "
        "error messages are understandable; minor issues may occur under rare "
        "conditions.\n"
        "- **Fair**: Some error handling is implemented but misses important "
        "cases; error messages may be vague; program may crash under certain "
        "conditions.\n"
        "- **Poor**: Little to no error handling; program frequently crashes or "
        "exits unexpectedly; error messages are missing or unhelpful."
    ),
    weight=1.2,
)

code_quality_rubric = Rubric(
    name="code_quality_rubric",
    description=(
        "Rubric for assessing code submissions in programming challenges, "
        "focusing on functionality, readability, efficiency, style compliance, "
        "and error handling."
    ),
    items={
        i.name: i
        for i in [
            functionality,
            readability,
            efficiency,
            style_compliance,
            error_handling,
        ]
    },
)

__all__ = ["code_quality_rubric"]
