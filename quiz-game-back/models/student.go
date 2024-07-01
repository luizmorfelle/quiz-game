package models

type Student struct {
	Id           string `json:"id" bson:"_id"`
	Name         string `json:"name" bson:"name"`
	Email        string `json:"email" bson:"email"`
	Password     string `json:"password" bson:"password"`
	ActualGameId string `json:"actualGameId" bson:"actualGameId"`
	TeacherId    string `json:"teacherId" bson:"teacherId"`
	Score        int    `json:"score" bson:"score"`
}
