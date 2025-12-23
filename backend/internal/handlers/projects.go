package handlers

import (
	"encoding/json"
	"github.com/smithwithatypo/resume-builder-app/internal/llm"
	"github.com/smithwithatypo/resume-builder-app/models"
	"github.com/smithwithatypo/resume-builder-app/services"
	"net/http"
	"os"
)

type ProjectRequest struct {
	JobDescription string `json:"jobDescription"`
}

type ProjectsResponse struct {
	Response MatchResult `string:"response"`
}

type ProjectMatch struct {
	ID     int    `json:"id"`
	Reason string `json:"reason"`
}

type MatchResult struct {
	ProjectIds []int          `json:"projectIds"`
	TopMatches []ProjectMatch `json:"topMatches"`
}

func MatchProjects(w http.ResponseWriter, r *http.Request) {
	// get job description from request
	var req ProjectRequest
	json.NewDecoder(r.Body).Decode(&req)

	// load projects
	data, _ := os.ReadFile("data/projects.json")
	var projects []models.Project
	json.Unmarshal(data, &projects)

	// build user message
	userMessage := services.BuildMatchPrompt(req.JobDescription, projects)
	systemPrompt := "be a helpful assistant"

	// build response
	convo := llm.NewConversation(systemPrompt)
	convo.AddUserMessage(userMessage)
	response, err := convo.Send()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// parse the LLM response into structured data
	var result MatchResult
	err = json.Unmarshal([]byte(response), &result)
	if err != nil {
		http.Error(w, "Failed to parse LLM response", http.StatusInternalServerError)
		return
	}

	// send response
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(ProjectsResponse{Response: result})
	// json.NewEncoder(w).Encode(result)
}
