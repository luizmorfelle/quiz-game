package controllers

import (
	"net/http"
	"quiz-game-backend/database"
	"quiz-game-backend/models"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
)

func GetLeaderboard(c *gin.Context) {

	cursor, err := database.Database.Collection("Students").Find(c, bson.M{})

	if err != nil {
		c.JSON(http.StatusBadRequest, "Error getting students")
		return
	}

	var students []models.Student
	cursor.All(c, &students)

	cursor, err = database.Database.Collection("Games").Find(c, bson.M{})

	if err != nil {
		c.JSON(http.StatusBadRequest, "Error getting games")
		return
	}

	var games []models.Game
	cursor.All(c, &games)

	for i := range students {
		for _, game := range games {
			if students[i].Id == game.StudentId {
				students[i].Score += game.Score
			}
		}
	}

	//sort students by score
	for i := 0; i < len(students); i++ {
		for j := i + 1; j < len(students); j++ {
			if students[i].Score < students[j].Score {
				students[i], students[j] = students[j], students[i]
			}
		}
	}

	c.JSON(http.StatusOK, students)
}
