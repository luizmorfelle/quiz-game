package controllers

import (
	"context"
	"net/http"
	"quiz-game-backend/database"
	"quiz-game-backend/models"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func GetGame(c *gin.Context) {
	var game models.Game
	var student models.Student

	difficulty := c.Query("difficulty")
	idStudent, err := primitive.ObjectIDFromHex(c.Param("idStudent"))
	if err != nil {
		c.JSON(http.StatusBadRequest, "Student Id not passed")
		return
	}

	err = database.Database.Collection("Students").FindOne(c, bson.M{"_id": idStudent}).Decode(&student)

	if err != nil {
		c.JSON(http.StatusBadRequest, "Student Id not find")
		return
	}

	actualGameId, _ := primitive.ObjectIDFromHex(student.ActualGameId)

	database.Database.Collection("Games").FindOne(c, bson.M{"_id": actualGameId}).Decode(&game)

	if game.Id == "" {
		var questions []models.Question

		opts := options.Find().SetLimit(10)

		cursor, err := database.Database.Collection("Questions").Find(c, bson.M{"difficulty": difficulty}, opts)
		if err != nil {
			c.JSON(http.StatusBadRequest, "Error getting questions")
			return
		}
		cursor.All(c, &questions)

		game = models.Game{
			TeacherId:      student.TeacherId,
			StudentId:      student.Id,
			Difficulty:     difficulty,
			ActualQuestion: "0",
			Answers:        []string{},
			Score:          0,
			Questions:      questions,
		}

		ins, err := database.Database.Collection("Games").InsertOne(context.TODO(), game)

		if err != nil {
			c.JSON(http.StatusBadRequest, "Error creating game "+err.Error())
			return
		}

		_, err = database.Database.Collection("Students").UpdateOne(context.TODO(), bson.M{"_id": idStudent}, bson.M{"$set": bson.M{"actualGameId": ins.InsertedID.(primitive.ObjectID).Hex()}})

		if err != nil {
			c.JSON(http.StatusBadRequest, "Error updating student: "+err.Error())
			return
		}

		game.Id = ins.InsertedID.(primitive.ObjectID).Hex()

	} else {
		game.Id = actualGameId.Hex()
	}
	c.JSON(http.StatusOK, game)
}

func UpdateGame(c *gin.Context) {
	var game models.Game
	id, err := primitive.ObjectIDFromHex(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, "Game Id not passed "+err.Error())
		return
	}

	err = c.ShouldBindJSON(&game)
	if err != nil {
		c.JSON(http.StatusBadRequest, "Error binding game "+err.Error())
		return
	}

	game.Id = ""
	_, err = database.Database.Collection("Games").ReplaceOne(c, bson.M{"_id": id}, game)

	if err != nil {
		c.JSON(http.StatusBadRequest, "Error updating game: "+err.Error())
		return
	}

	c.JSON(http.StatusOK, "Game updated successfully")
}

func GetAllGames(c *gin.Context) {
	var games []models.Game

	idStudent := c.Param("idStudent")

	cursor, err := database.Database.Collection("Games").Find(c, bson.M{"studentId": idStudent})
	if err != nil {
		c.JSON(http.StatusBadRequest, "Error getting games")
		return
	}

	cursor.All(c, &games)

	c.JSON(http.StatusOK, games)
}
