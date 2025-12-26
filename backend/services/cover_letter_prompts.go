package services

import (
	"encoding/json"
	"fmt"
	"github.com/smithwithatypo/resume-builder-app/models"
)

func BuildStartupCoverLetterPrompt(jobDescription string, projects []models.Project) string {
	projectsJSON, _ := json.MarshalIndent(projects, "", "  ")

	return fmt.Sprintf(`You are writing a concise, high-impact cover letter for a startup role.

JOB DESCRIPTION:
%s

CANDIDATE'S PROJECTS:
%s

Write a single punchy paragraph (4-5 sentences max) that:
1. Shows immediate understanding of what the role needs
2. Connects 2-3 of the candidate's most relevant project impacts directly to those needs
3. Uses concrete numbers and results from their projects
4. Sounds like a human who ships things, not corporate fluff

Focus on velocity, impact, and technical delivery. No "I am writing to express my interest" - jump straight into value.

Return ONLY the paragraph text, no subject line or greeting.`, jobDescription, string(projectsJSON))
}

func BuildGovernmentCoverLetterPrompt(jobDescription string, projects []models.Project) string {
	projectsJSON, _ := json.MarshalIndent(projects, "", "  ")

	return fmt.Sprintf(`You are writing a formal, traditional cover letter for a government or large corporate role.

JOB DESCRIPTION:
%s

CANDIDATE'S PROJECTS:
%s

Write a professional 3-paragraph cover letter that:
1. Opening: Express interest and briefly state qualifications
2. Body: Connect 3-4 relevant projects to job requirements, emphasizing reliability, process, and measurable outcomes
3. Closing: Express enthusiasm and mention next steps

Use professional tone, complete sentences, and emphasize stability, thoroughness, and proven results.

Return ONLY the letter body (no address header or signature block).`, jobDescription, string(projectsJSON))
}
