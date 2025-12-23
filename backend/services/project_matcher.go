package services

import (
	"fmt"
	"github.com/smithwithatypo/resume-builder-app/models"
)

func BuildMatchPrompt(jobDesc string, projects []models.Project) string {
	projectList := ""
	for _, p := range projects {
		projectList += fmt.Sprintf("ID %d: %s | Keywords: %v\n",
			p.ID, p.Title, p.Keywords)
	}

	return fmt.Sprintf(`You are helping match resume projects to a job description. do not add markdown or code blocks.

Your task: Return a valid JSON format with:
1. "projectIds": array of matching project IDs, ordered by relevance
2. "topMatches": array of objects explaining the top 3 matches

Output format:
{
  "projectIds": [1,2,5,8],
  "topMatches": [
    {"id": 1, "reason": "Direct match: AI/LLM automation"},
    {"id": 2, "reason": "NLP and data analysis experience"}
  ]
}

Job Description:
%s

My Projects:
%s

`, jobDesc, projectList)
}
