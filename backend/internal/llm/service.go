package llm

import (
	"context"
	"os"

	"github.com/anthropics/anthropic-sdk-go"
	"github.com/anthropics/anthropic-sdk-go/option"
)

type Conversation struct {
	client   anthropic.Client
	system   string
	messages []anthropic.MessageParam
}

const (
	ModelHaiku  anthropic.Model = anthropic.ModelClaudeHaiku4_5
	ModelSonnet anthropic.Model = anthropic.ModelClaudeSonnet4_5
)

func NewConversation(systemPrompt string) *Conversation {
	client := anthropic.NewClient(
		option.WithAPIKey(os.Getenv("ANTHROPIC_API_KEY")),
	)

	if systemPrompt == "" {
		systemPrompt = "be a helpful assistant"
	}

	return &Conversation{
		client:   client,
		system:   systemPrompt,
		messages: []anthropic.MessageParam{},
	}
}

func (c *Conversation) AddUserMessage(content string) {
	c.messages = append(c.messages, anthropic.NewUserMessage(
		anthropic.NewTextBlock(content),
	))
}

func (c *Conversation) Send(model anthropic.Model) (string, error) {
	msg, err := c.client.Messages.New(context.Background(), anthropic.MessageNewParams{
		Model:     model,
		MaxTokens: 1024,
		System: []anthropic.TextBlockParam{
			{Text: c.system},
		},
		Messages: c.messages,
	})

	if err != nil {
		return "", err
	}

	// add assistant response to history
	c.messages = append(c.messages, anthropic.NewAssistantMessage(
		anthropic.NewTextBlock(msg.Content[0].Text),
	))

	return msg.Content[0].Text, nil
}
