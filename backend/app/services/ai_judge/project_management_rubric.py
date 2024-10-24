from .rubric import Rubric, RubricItem

planning_and_estimation = RubricItem(
    name="planning_and_estimation",
    prompt=(
        "Evaluate the effectiveness of project planning and estimation:\n"
        "- **Excellent**: Project plan is detailed with clear milestones and "
        "deliverables; estimations are accurate.\n"
        "- **Good**: Project plan is adequate; estimations are mostly accurate with "
        "minor deviations.\n"
        "- **Fair**: Project plan lacks detail; estimations are off, leading to "
        "delays or rushed work.\n"
        "- **Poor**: Little to no planning; estimations are inaccurate, significantly "
        "impacting project delivery."
    ),
    weight=2.0,
)

communication = RubricItem(
    name="communication",
    prompt=(
        "Assess the effectiveness of communication within the project team:\n"
        "- **Excellent**: Regular, clear communication; uses appropriate channels; "
        "keeps all stakeholders informed.\n"
        "- **Good**: Communication is generally effective; minor lapses that do not "
        "impact project progress.\n"
        "- **Fair**: Communication is sporadic; important information may be missed "
        "by team members.\n"
        "- **Poor**: Poor communication; lack of information sharing hinders project "
        "progress."
    ),
    weight=2,
)

risk_management = RubricItem(
    name="risk_management",
    prompt=(
        "Analyze how risks are identified and managed:\n"
        "- **Excellent**: Proactively identifies potential risks; implements "
        "effective mitigation strategies.\n"
        "- **Good**: Identifies most risks; mitigation strategies are in place but "
        "may need improvement.\n"
        "- **Fair**: Some risks are identified; mitigation is reactive rather than "
        "proactive.\n"
        "- **Poor**: Risks are not adequately identified or managed; issues arise "
        "without plans to address them."
    ),
    weight=1.2,
)

resource_management = RubricItem(
    name="resource_management",
    prompt=(
        "Evaluate the allocation and utilization of resources:\n"
        "- **Excellent**: Resources are optimally allocated; team members are "
        "utilized effectively according to their skills.\n"
        "- **Good**: Resources are generally well-managed; minor inefficiencies exist.\n"
        "- **Fair**: Resource allocation could be improved; team members may be "
        "over or under-utilized.\n"
        "- **Poor**: Poor resource management; misallocation leads to bottlenecks "
        "or idle time."
    ),
    weight=1,
)

quality_assurance = RubricItem(
    name="quality_assurance",
    prompt=(
        "Assess the processes in place to ensure quality:\n"
        "- **Excellent**: Robust QA processes including code reviews, testing, and "
        "continuous integration; quality is a priority throughout the project.\n"
        "- **Good**: QA processes are in place; some improvements could enhance "
        "quality further.\n"
        "- **Fair**: Limited QA processes; quality issues may be detected late in "
        "the project.\n"
        "- **Poor**: Lack of QA processes; quality issues are common and impact "
        "project success."
    ),
    weight=2,
)

project_management_rubric = Rubric(
    name="project_management_rubric",
    description=(
        "Rubric for assessing project management practices, focusing on planning, "
        "communication, risk management, resource management, and quality assurance."
    ),
    items={
        i.name: i
        for i in [
            planning_and_estimation,
            communication,
            risk_management,
            resource_management,
            quality_assurance,
        ]
    },
)

__all__ = ["project_management_rubric"]
