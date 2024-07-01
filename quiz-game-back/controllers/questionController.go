package controllers

import (
	"quiz-game-backend/models"

	"github.com/gin-gonic/gin"
)

func CreateQuestions(c *gin.Context) {
	CreateManyObjects(c, models.Question{}, "Questions")
}
