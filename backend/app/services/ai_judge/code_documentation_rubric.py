from .rubric import Rubric, RubricItem

documentation_completeness = RubricItem(
    name="documentation_completeness",
    prompt=(
        "Assess the completeness of the code documentation:\n"
        "- **Excellent**: All classes, functions, and modules have comprehensive "
        "docstrings explaining their purpose, parameters, return values, and "
        "exceptions raised.\n"
        "- **Good**: Most classes and functions are documented; docstrings cover "
        "essential information but may lack detail.\n"
        "- **Fair**: Some documentation present but many classes or functions lack "
        "docstrings; information may be incomplete.\n"
        "- **Poor**: Little to no documentation; code lacks docstrings and comments."
    ),
    weight=2.25,
)

documentation_clarity = RubricItem(
    name="documentation_clarity",
    prompt=(
        "Evaluate the clarity and readability of the documentation:\n"
        "- **Excellent**: Documentation is clear, well-organized, and easy to "
        "understand; uses consistent terminology and formatting.\n"
        "- **Good**: Documentation is generally clear; minor improvements could "
        "enhance readability.\n"
        "- **Fair**: Documentation is somewhat unclear or disorganized; may contain "
        "ambiguous terms or formatting inconsistencies.\n"
        "- **Poor**: Documentation is confusing, disorganized, or difficult to read."
    ),
    weight=1.75,
)

example_usage = RubricItem(
    name="example_usage",
    prompt=(
        "Check for inclusion of example usage in documentation:\n"
        "- **Excellent**: Provides clear, working examples demonstrating how to use "
        "the code; examples cover common and advanced use cases.\n"
        "- **Good**: Includes examples for common use cases; examples are helpful "
        "but may lack coverage of advanced scenarios.\n"
        "- **Fair**: Examples are minimal or only cover basic usage; may lack "
        "context or clarity.\n"
        "- **Poor**: No example usage provided in the documentation."
    ),
    weight=1.0,
)

documentation_maintainability = RubricItem(
    name="documentation_maintainability",
    prompt=(
        "Assess how easy it is to maintain and update the documentation:\n"
        "- **Excellent**: Documentation is well-structured with clear sections; "
        "uses tools or standards (e.g., Sphinx, Doxygen) for easy maintenance.\n"
        "- **Good**: Documentation is reasonably organized; can be maintained "
        "without much difficulty.\n"
        "- **Fair**: Documentation lacks structure; maintenance would require "
        "significant effort.\n"
        "- **Poor**: Documentation is disorganized or absent, making maintenance "
        "very difficult."
    ),
    weight=1.5,
)

documentation_consistency = RubricItem(
    name="documentation_consistency",
    prompt=(
        "Evaluate the consistency of the documentation with the code:\n"
        "- **Excellent**: Documentation accurately reflects the current state of "
        "the code; no discrepancies found.\n"
        "- **Good**: Documentation is mostly up-to-date; minor discrepancies that "
        "do not hinder understanding.\n"
        "- **Fair**: Some parts of the documentation are outdated or inconsistent "
        "with the code.\n"
        "- **Poor**: Documentation is largely inconsistent with the code; may refer "
        "to removed or altered features."
    ),
    weight=1.0,
)

documentation_rubric = Rubric(
    name="documentation_rubric",
    description=(
        "Rubric for assessing the quality of code documentation, focusing on "
        "completeness, clarity, example usage, maintainability, and consistency."
    ),
    items={
        i.name: i
        for i in [
            documentation_completeness,
            documentation_clarity,
            example_usage,
            documentation_maintainability,
            documentation_consistency,
        ]
    },
)

__all__ = ["documentation_rubric"]
