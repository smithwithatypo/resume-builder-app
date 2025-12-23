package models

type Project struct {
	ID       int      `json:"id"`
	Title    string   `json:"title"`
	Keywords []string `json:"keywords"`
	Summary  string   `json:"summary"`
}
