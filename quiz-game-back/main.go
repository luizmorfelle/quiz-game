package main

import (
	"log"
	"quiz-game-backend/database"
	"quiz-game-backend/routes"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	// logrus.SetFormatter(&logrus.JSONFormatter{})
	database.Connect()

	log.Println("Application is starting....")
	router := gin.Default()
	router.Use(cors.Default())
	routes.SetupRoutes(router)

	router.Run(":8080")
}
