from lionagi import Form
from lionagi.libs.ln_convert import to_num
from pydantic import Field
from typing import Optional, Any
from .rubric import Rubric


class CodeAnalysisForm(Form):
    """
    A structured form for analyzing code submissions based on a given rubric.
    """
    system_prompt: str = Field(
        """
        You are an AI code reviewer proficient in {language}.
        Evaluate the following code submission based on the criteria below.
        """
    )
    
    code_submission: str | None = Field(
        default=None,
        description="The code_submission to be analyzed.",
    )
    
    overall_feedback: Optional[str] = Field(
        None, 
        description="Overall feedback based on the evaluation."
    )

    rubric: Rubric
    language: str = "Python"
    assignment: str = "task, code_submission -> overall_feedback"
    
    
    def __init__(
        self,
        code_submission: str,
        rubric: Rubric,
        instruction=None,
        context=None,
        language: str = "Python",
        analysis_stage: str | None = None,
    ):
        super().__init__(code_submission=code_submission, language=language, rubric=rubric)
        self.task = (
            "Follow the prompt and provide the necessary output.\n"
            f"- Additional instruction: {str(instruction or 'N/A')}\n"
            f"- Additional context: {str(context or 'N/A')}\n"
        )

        self.system_prompt = self.system_prompt.format(language=language)
        analysis_type = list(rubric.rubric_items.keys())

        self.add_field("analysis_type", analysis_type)

        for item_name, item in rubric.rubric_items.items():
            description = "{score: float 0-100, comments: string}"
            description += item.prompt
            self.add_field(item_name, value=None, annotation=dict, description=description)
            self.append_to_request(item_name)

        if analysis_stage:
            self.add_field("analysis_stage", analysis_stage)

    @property
    def analysis_result(self):
        analysis_results = {}
        
        # added default analysis_stage
        analysis_results["analysis_stage"] = getattr(self, "analysis_stage", "unassigned")

        analysis_type = getattr(self, "analysis_type", [])

        for i in analysis_type:
            analysis_result = {
                "score": getattr(self, i, {}).get("score", 0),
                "comments": getattr(self, i, {}).get("comments", ""),
            }
            analysis_results[i] = analysis_result
        
        analysis_results["overall_feedback"] = getattr(self, "overall_feedback", "")
        analysis_results["timestamp"] = self.timestamp
        return analysis_results
    
    def to_output_dict(self):
        output = {}

        analysis_type = getattr(self, "analysis_type", [])

        for k in analysis_type:
            if (
                self.work_fields.get(k, None)
                and "score" in self.work_fields[k]
                and "comments" in self.work_fields[k]
            ):
                output[k] = self.work_fields[k]
        
        total_score = 0.0
        for i in output.values():
            score = to_num(i["score"], upper_bound=100, lower_bound=0, num_type=float, precision=2)
            total_score += score * self.rubric.rubric_weights[k]
        
        output["total_score"] = total_score

        if self.work_fields.get("overall_feedback", None):
            output["overall_feedback"] = self.work_fields["overall_feedback"]
        
        return output

    @property
    def display_message(self) -> str:
        """
        Generates a human-readable message summarizing the evaluation.
        """
        
        _dict: dict[str, Any] = self.to_output_dict()
        overall_feedback = _dict.pop("overall_feedback", None)
        total_score = _dict.pop("total_score", None)
        
        rubric_msg = ""
        
        message_lines = [
            f"Evaluation Results ({self.timestamp[:-6]}):",
            f"Language: {self.language}",
            f"Total Score: {total_score:.2f}/100",
            ""
        ]
        
        for i in message_lines:
            rubric_msg += f"{i}\n"
        
        for k, v in _dict.items():
            k = k.replace("_", " ").title()
            rubric_msg += f"{k}:\nScore: {v['score']}/100\nCriteria Weight: {self.rubric.rubric_weights[k]}\nComments: {v['comments']}\n\n"
        
        total_score = total_score / sum(self.rubric.rubric_weights.values())
        
        if overall_feedback:
            rubric_msg += f"Overall Feedback:\n{overall_feedback}\n\n"
        
        if total_score: 
            rubric_msg += f"Total Score: {total_score}/100\n\n"
        
        if total_score:
            if total_score < 20:
                rubric_msg += "Verdict: Not an AI hacker yet. 😅\n"  
            elif total_score < 45:
                rubric_msg += "Verdict: A Freshman AI hacker! 🥳\n"
            elif total_score < 70:
                rubric_msg += "Verdict: A Junior AI hacker! 🤩\n"
            elif total_score < 90:
                rubric_msg += "Verdict: A Senior AI hacker! 🤯\n"
            else:
                rubric_msg += "The Lion King of AI Hacking! 🚀🦁🚀\n"

        message = f"""
{rubric_msg}
----------------------------------------
"""
        return message
        