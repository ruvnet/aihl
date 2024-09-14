from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

class GitHubUser(BaseModel):
    """
    Represents a GitHub user.
    """
    username: str = Field(..., description="GitHub username")
    id: int = Field(..., description="Unique user ID")
    url: str = Field(..., description="API URL for the user")
    html_url: str = Field(..., description="Web URL for the user profile")

class GitHubRepository(BaseModel):
    """
    Represents a GitHub repository.
    """
    id: int = Field(..., description="Unique repository ID")
    name: str = Field(..., description="Repository name")
    full_name: str = Field(..., description="Full repository name with owner")
    owner: GitHubUser = Field(..., description="Owner of the repository")
    private: bool = Field(..., description="Visibility of the repository")
    html_url: str = Field(..., description="Web URL of the repository")
    description: Optional[str] = Field(None, description="Repository description")
    fork: bool = Field(..., description="Whether the repository is a fork")
    created_at: datetime = Field(..., description="Creation timestamp")
    updated_at: datetime = Field(..., description="Last update timestamp")
    pushed_at: datetime = Field(..., description="Last push timestamp")
    clone_url: str = Field(..., description="URL to clone the repository")
    ssh_url: str = Field(..., description="SSH URL to clone the repository")
    language: Optional[str] = Field(None, description="Primary programming language")
    forks_count: int = Field(..., description="Number of forks")
    stargazers_count: int = Field(..., description="Number of stars")
    watchers_count: int = Field(..., description="Number of watchers")
    open_issues_count: int = Field(..., description="Number of open issues")
    topics: List[str] = Field(default_factory=list, description="Topics/tags for the repository")