package routes

import (
	"quiz-game-backend/controllers"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(router *gin.Engine) {
	api := router.Group("/api")
	{
		api.POST("/login", controllers.Login)
	}
	students := api.Group("/students")
	{
		students.POST("/", controllers.CreateStudents)
		students.PUT("/:id/restart", controllers.RestartQuiz)
	}
	games := api.Group("/games")
	{
		games.GET("/:idStudent", controllers.GetGame)
		games.GET("/:idStudent/list", controllers.GetAllGames)
		games.GET("/", controllers.GetGame)
		games.PUT("/:id", controllers.UpdateGame)
	}

	questions := api.Group("/questions")
	{
		questions.POST("/", controllers.CreateQuestions)
	}
	leaderboard := api.Group("/leaderboard")
	{
		leaderboard.GET("", controllers.GetLeaderboard)
	}
}
