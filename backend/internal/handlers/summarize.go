// handlers/summarize.go
package handlers

import (
	"context"
	"encoding/json"
	"net/http"

	"github.com/anthropics/anthropic-sdk-go"
)

type SummarizeRequest struct {
	JobDescription string `json:"jobDescription"`
}

type SummarizeResponse struct {
	Summary string `json:"summary"`
}

func SummarizeJobDescription(w http.ResponseWriter, r *http.Request) {
	var req SummarizeRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Bad request", http.StatusBadRequest)
		return
	}

	client := anthropic.NewClient()

	message, err := client.Messages.New(context.TODO(), anthropic.MessageNewParams{
		Model:     anthropic.ModelClaudeHaiku4_5,
		MaxTokens: 1000,
		Messages: []anthropic.MessageParam{
			anthropic.NewUserMessage(anthropic.NewTextBlock("Summarize this job description in 1 sentence highlighting the most important skills needed and 1 sentence of ATS keywords:\n\n" + req.JobDescription)),
		},
	})

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(SummarizeResponse{
		Summary: message.Content[0].Text,
	})
}
