.PHONY: dev frontend backend

dev:
	cd frontend && npm run dev & cd backend && go run .

frontend:
	cd frontend && npm run dev

backend:
	cd backend && go run .
