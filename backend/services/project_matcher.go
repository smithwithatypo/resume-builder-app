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
"projectIds": array of matching project IDs, ordered by relevance

Output format:
{"projectIds": [1,2,5,8]}

Job Description:
%s

My Projects:
%s

`, jobDesc, projectList)
}
