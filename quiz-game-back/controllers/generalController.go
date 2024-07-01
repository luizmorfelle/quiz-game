package controllers

import (
	"context"
	"net/http"
	"quiz-game-backend/database"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func CreateNewObject(c *gin.Context, object interface{}, collectionName string) {
	if err := c.ShouldBindJSON(&object); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ins, err := database.Database.Collection(collectionName).InsertOne(context.TODO(), object)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	response := map[string]interface{}{
		"status":     "success",
		"insertedId": ins.InsertedID.(primitive.ObjectID),
	}

	c.JSON(http.StatusOK, response)
}

func CreateManyObjects(c *gin.Context, object interface{}, collectionName string) {
	var objects []interface{}

	if err := c.ShouldBindJSON(&objects); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ins, err := database.Database.Collection(collectionName).InsertMany(context.TODO(), objects)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	response := map[string]interface{}{
		"status":      "success",
		"insertedIds": ins.InsertedIDs,
	}

	c.JSON(http.StatusOK, response)
}
