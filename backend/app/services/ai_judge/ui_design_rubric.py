from .rubric import Rubric, RubricItem

usability = RubricItem(
    name="usability",
    prompt=(
        "Assess the usability of the user interface:\n"
        "- **Excellent**: Interface is intuitive and easy to navigate; users can "
        "perform tasks efficiently without confusion.\n"
        "- **Good**: Interface is generally user-friendly; minor improvements could "
        "enhance usability.\n"
        "- **Fair**: Interface has some usability issues; users may struggle with "
        "certain tasks.\n"
        "- **Poor**: Interface is difficult to use; users are likely to be confused "
        "or make errors."
    ),
    weight=2.0,
)

visual_design = RubricItem(
    name="visual_design",
    prompt=(
        "Evaluate the visual design of the interface:\n"
        "- **Excellent**: Aesthetically pleasing design with consistent styling, "
        "appropriate color schemes, and clear typography.\n"
        "- **Good**: Visually appealing design; minor inconsistencies in styling or "
        "layout.\n"
        "- **Fair**: Design is functional but lacks visual appeal; inconsistencies "
        "may distract users.\n"
        "- **Poor**: Poor visual design; cluttered interface with confusing or "
        "inconsistent styling."
    ),
    weight=1.5,
)

accessibility = RubricItem(
    name="accessibility",
    prompt=(
        "Check for compliance with accessibility standards:\n"
        "- **Excellent**: Fully compliant with accessibility guidelines (e.g., "
        "WCAG); supports assistive technologies.\n"
        "- **Good**: Mostly accessible; minor issues that can be easily addressed.\n"
        "- **Fair**: Some accessibility features implemented; significant gaps "
        "remain.\n"
        "- **Poor**: Lacks accessibility considerations; difficult or impossible "
        "for users with disabilities to use."
    ),
    weight=1.5,
)

responsiveness = RubricItem(
    name="responsiveness",
    prompt=(
        "Evaluate how the interface adapts to different devices and screen sizes:\n"
        "- **Excellent**: Fully responsive design; interface works seamlessly on "
        "all devices (mobile, tablet, desktop).\n"
        "- **Good**: Generally responsive; minor layout issues on some devices.\n"
        "- **Fair**: Partially responsive; significant layout issues on certain "
        "devices.\n"
        "- **Poor**: Not responsive; interface does not adapt to different screen "
        "sizes."
    ),
    weight=1.5,
)

feedback_and_error_handling = RubricItem(
    name="feedback_and_error_handling",
    prompt=(
        "Assess the effectiveness of user feedback and error messages:\n"
        "- **Excellent**: Provides clear, helpful feedback; error messages are "
        "informative and guide users to resolve issues.\n"
        "- **Good**: Feedback is generally helpful; error messages are adequate.\n"
        "- **Fair**: Limited feedback; error messages may be vague or unhelpful.\n"
        "- **Poor**: Lacks user feedback; error messages are missing or confusing."
    ),
    weight=1.5,
)

ui_design_rubric = Rubric(
    name="ui_design_rubric",
    description=(
        "Rubric for evaluating user interface design, focusing on usability, "
        "visual design, accessibility, responsiveness, and feedback mechanisms."
    ),
    items={
        i.name: i
        for i in [
            usability,
            visual_design,
            accessibility,
            responsiveness,
            feedback_and_error_handling,
        ]
    },
)

__all__ = ["ui_design_rubric"]
