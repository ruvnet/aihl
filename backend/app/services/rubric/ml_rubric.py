from .rubric import Rubric, RubricItem

accuracy = RubricItem(
    name="Accuracy",
    prompt="Evaluate the model's accuracy on test data.",
)

overfitting = RubricItem(
    name="Overfitting",
    prompt="Assess whether the model is overfitting or generalizing well.",
)

innovation = RubricItem(
    name="Innovation",
    prompt="Evaluate the novelty of the approach.",
)

documentation = RubricItem(
    name="Documentation",
    prompt="Check the clarity and completeness of the model's documentation.",
)


ml_model_rubric = Rubric(
    name="ML Model Rubric",
    title="Rubric for Evaluating Machine Learning Models",
    background="Used for assessing ML models submitted in AI competitions.",
    rubric_items={
        "accuracy": accuracy,
        "overfitting": overfitting,
        "innovation": innovation,
        "documentation": documentation,
    },
    rubric_weights={
        "accuracy": 0.3,
        "overfitting": 0.2,
        "innovation": 0.2,
        "documentation": 0.3,
    },
)