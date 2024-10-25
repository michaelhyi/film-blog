package main

import (
	"net/http"

	"github.com/michaelhyi/film-blog/backend/go/auth"
	"github.com/michaelhyi/film-blog/backend/go/health"
	"github.com/michaelhyi/film-blog/backend/go/post"
)

func SetRoutes(healthController *health.HealthController, authController *auth.AuthController, postController *post.PostController) {
	http.HandleFunc("GET /", healthController.Check)

	http.HandleFunc("POST /v2/auth/login", authController.Login)
	http.HandleFunc("GET /v2/auth/validate-token", authController.ValidateToken)

	http.HandleFunc("POST /v2/post", postController.CreatePost)
	http.HandleFunc("GET /v2/post/{id}", postController.GetPost)
	http.HandleFunc("GET /v2/post/image/{id}", postController.GetPostImage)
	http.HandleFunc("GET /v2/post", postController.GetAllPosts)
	http.HandleFunc("PUT /v2/post/{id}", postController.UpdatePost)
	http.HandleFunc("DELETE /v2/post/{id}", postController.DeletePost)
}
