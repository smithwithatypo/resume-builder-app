package handlers

import (
	"encoding/json"
	"github.com/smithwithatypo/resume-builder-app/internal/llm"
	"github.com/smithwithatypo/resume-builder-app/models"
	"github.com/smithwithatypo/resume-builder-app/services"
	"net/http"
	"os"
)

type CoverLetterStyle string
type ModelChoice string

const (
	StyleStartup    CoverLetterStyle = "startup"
	StyleGovernment CoverLetterStyle = "government"
)

const (
	ModelChoiceFast  ModelChoice = "fast"
	ModelChoiceSmart ModelChoice = "smart"
)

type CoverLetterRequest struct {
	JobDescription string           `json:"jobDescription"`
	Style          CoverLetterStyle `json:"style"`
	ModelChoice    ModelChoice      `json:"modelChoice"`
}

type CoverLetterResponse struct {
	CoverLetter string `json:"coverLetter"`
}

func GenerateCoverLetter(w http.ResponseWriter, r *http.Request) {
	// get request data
	var req CoverLetterRequest
	json.NewDecoder(r.Body).Decode(&req)

	// load projects
	data, _ := os.ReadFile("data/projects.json")
	var projects []models.Project
	json.Unmarshal(data, &projects)

	// build prompt based on style
	var userMessage string
	if req.Style == StyleGovernment {
		userMessage = services.BuildGovernmentCoverLetterPrompt(req.JobDescription, projects)
	} else {
		userMessage = services.BuildStartupCoverLetterPrompt(req.JobDescription, projects)
	}

	// build response
	var model = llm.ModelHaiku
	if req.ModelChoice == "fast" {
		model = llm.ModelHaiku
	}
	if req.ModelChoice == "smart" {
		model = llm.ModelSonnet
	}
	systemPrompt := "You are an expert career coach who writes compelling cover letters using Strunk's Elements of Style."
	convo := llm.NewConversation(systemPrompt)
	convo.AddUserMessage(userMessage)
	response, err := convo.Send(model)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// send response
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(CoverLetterResponse{CoverLetter: response})
}
