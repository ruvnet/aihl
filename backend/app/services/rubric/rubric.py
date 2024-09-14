from pydantic import BaseModel, Field


class RubricItem(BaseModel):
    """Represents a single criterion in the rubric."""
    
    name: str = Field(
        "null",
        description="the name of the rubric"
    )
    
    prompt: str | None = Field(
        None, 
        description="the prompt to instruct the LLM"
    )


class Rubric(BaseModel):
    
    name: str = Field(
        "null",
        description="the name of the rubric"
    )
    
    rubric_items: dict[str, RubricItem] = Field(
        {},
        description="the list of rubric items"
    )
    
    rubric_weights: dict[str, float] = Field(
        {},
        description="the weights of the rubric items"
    )
    
    title: str | None = Field(
        None,
        description="the title of the rubric"
    )

    background: str | None = Field(
        None,
        description="the background of the rubric"
    )
