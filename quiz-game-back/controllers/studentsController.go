package controllers

import (
	"net/http"
	"quiz-game-backend/database"
	"quiz-game-backend/models"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func CreateStudents(c *gin.Context) {
	CreateManyObjects(c, models.Student{}, "Students")
}

func RestartQuiz(c *gin.Context) {

	id, err := primitive.ObjectIDFromHex(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, "Student Id not passed "+err.Error())
		return
	}

	updated, err := database.Database.Collection("Students").UpdateOne(c, bson.M{"_id": id}, bson.M{"$set": bson.M{"actualGameId": ""}})

	if err != nil {
		c.JSON(http.StatusBadRequest, "Error updating student: "+err.Error())
		return
	}

	if updated.MatchedCount == 0 {
		c.JSON(http.StatusBadRequest, "Student not found")
		return
	}

	c.JSON(http.StatusOK, "Student updated successfully")
}
