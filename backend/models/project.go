package models

type Bulletpoint struct {
	Result string `json:"result"`
	Metric string `json:"metric"`
	Action string `json:"action"`
}

type Project struct {
	ID           int           `json:"id"`
	Title        string        `json:"title"`
	Keywords     []string      `json:"keywords"`
	Summary      string        `json:"summary"`
	Bulletpoints []Bulletpoint `json:"bulletpoints"`
}
