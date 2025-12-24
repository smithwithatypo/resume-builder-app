package services

import (
	"encoding/json"
	"os"

	"github.com/smithwithatypo/resume-builder-app/models"
)

func GetProjectsByIDs(ids []int) ([]models.Project, error) {
	data, err := os.ReadFile("data/projects.json")
	if err != nil {
		return nil, err
	}

	var projects []models.Project
	err = json.Unmarshal(data, &projects)
	if err != nil {
		return nil, err
	}

	var matchedProjects []models.Project
	for _, id := range ids {
		for _, project := range projects {
			if project.ID == id {
				matchedProjects = append(matchedProjects, project)
				break
			}
		}
	}

	return matchedProjects, nil
}
