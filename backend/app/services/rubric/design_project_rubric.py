from .rubric import Rubric, RubricItem

user_experience = RubricItem(
    name="User Experience",
    prompt="Assess the overall user experience of the design.",
)

aesthetics = RubricItem(
    name="Aesthetics",
    prompt="Evaluate the visual appeal of the design.",
)

functionality = RubricItem(
    name="Functionality",
    prompt="Check if the design meets the project requirements.",
)

accessibility = RubricItem(
    name="Accessibility",
    prompt="Analyze the accessibility considerations in the design.",
)


design_project_rubric = Rubric(
    name="Design Project Rubric",
    title="Rubric for Evaluating Design Projects",
    background="Used for assessing design submissions in UI/UX challenges.",
    rubric_items={
        "user_experience": user_experience,
        "aesthetics": aesthetics,
        "functionality": functionality,
        "accessibility": accessibility,
    },
    rubric_weights={
        "user_experience": 0.3,
        "aesthetics": 0.2,
        "functionality": 0.3,
        "accessibility": 0.2,
    },
)