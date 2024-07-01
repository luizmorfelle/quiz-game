package controllers

import (
	"context"
	"encoding/base64"
	"encoding/json"
	"net/http"
	"quiz-game-backend/database"
	"quiz-game-backend/models"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
)

func Login(c *gin.Context) {
	var user *models.Student
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var userRes models.Student

	err := database.Database.Collection("Students").FindOne(context.TODO(), bson.M{"email": user.Email, "password": user.Password}).Decode(&userRes)

	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}

	b64, _ := json.Marshal(userRes)

	c.JSON(http.StatusOK, bson.M{"token": base64.StdEncoding.EncodeToString([]byte(b64))})
}
