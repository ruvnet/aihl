from .rubric import Rubric, RubricItem

modularity = RubricItem(
    name="modularity",
    prompt=(
        "Assess the modularity of the software design:\n"
        "- **Excellent**: Code is highly modular with clear separation of concerns; "
        "components are independent and reusable.\n"
        "- **Good**: Code is modular but some dependencies between components exist; "
        "separation could be improved.\n"
        "- **Fair**: Code has limited modularity; components are interdependent, "
        "making reuse difficult.\n"
        "- **Poor**: Code lacks modularity; functionality is not separated, leading "
        "to a monolithic design."
    ),
    weight=2.0,
)

encapsulation = RubricItem(
    name="encapsulation",
    prompt=(
        "Evaluate the encapsulation of data and functionality:\n"
        "- **Excellent**: Proper encapsulation practices are followed; data is "
        "protected and accessed through well-defined interfaces.\n"
        "- **Good**: Encapsulation is generally good; minor violations that do not "
        "significantly impact integrity.\n"
        "- **Fair**: Encapsulation is weak; data is exposed or accessed directly in "
        "some cases.\n"
        "- **Poor**: Encapsulation is not implemented; data and functionality are "
        "exposed without control."
    ),
    weight=1,
)

cohesion = RubricItem(
    name="cohesion",
    prompt=(
        "Analyze the cohesion within modules/classes:\n"
        "- **Excellent**: Modules/classes have high cohesion; each has a single, "
        "well-defined responsibility.\n"
        "- **Good**: Modules/classes are mostly cohesive; may have minor unrelated "
        "functions.\n"
        "- **Fair**: Modules/classes have mixed responsibilities; cohesion is low.\n"
        "- **Poor**: Modules/classes lack cohesion; functions are unrelated, making "
        "the code confusing."
    ),
    weight=1.5,
)

coupling = RubricItem(
    name="coupling",
    prompt=(
        "Assess the level of coupling between modules/classes:\n"
        "- **Excellent**: Low coupling achieved; modules/classes interact through "
        "well-defined interfaces.\n"
        "- **Good**: Moderate coupling; some dependencies exist but are manageable.\n"
        "- **Fair**: High coupling; modules/classes are heavily dependent on each "
        "other.\n"
        "- **Poor**: Very high coupling; changes in one module/class significantly "
        "affect others."
    ),
    weight=1.2,
)

design_patterns = RubricItem(
    name="design_patterns",
    prompt=(
        "Evaluate the use of appropriate design patterns:\n"
        "- **Excellent**: Effectively applies suitable design patterns to solve "
        "problems; patterns are implemented correctly.\n"
        "- **Good**: Uses design patterns appropriately but may have minor "
        "implementation issues.\n"
        "- **Fair**: Limited use of design patterns; opportunities to apply patterns "
        "are missed.\n"
        "- **Poor**: Does not utilize design patterns; code may suffer from "
        "common design issues."
    ),
    weight=2,
)

software_design_rubric = Rubric(
    name="software_design_rubric",
    description=(
        "Rubric for assessing software design principles, focusing on modularity, "
        "encapsulation, cohesion, coupling, and use of design patterns."
    ),
    items={
        i.name: i
        for i in [modularity, encapsulation, cohesion, coupling, design_patterns]
    },
)

__all__ = ["software_design_rubric"]
