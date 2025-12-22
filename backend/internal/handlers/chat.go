package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/smithwithatypo/resume-builder-app/internal/llm"
)

type ChatRequest struct {
	Message string `json:"message"`
}

type ChatResponse struct {
	Reply string `string:"reply"`
}

func HandleChat(w http.ResponseWriter, r *http.Request) {
	var req ChatRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	prompt := "you are a helpful assistant"
	convo := llm.NewConversation(prompt)

	convo.AddUser(req.Message)
	reply, err := convo.Send()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(ChatResponse{Reply: reply})
}
