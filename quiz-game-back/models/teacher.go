package models

type Teacher struct {
	Id       string   `json:"id" bson:"_id"`
	Name     string   `json:"name" bson:"name"`
	Email    string   `json:"email" bson:"email"`
	Password string   `json:"password" bson:"password"`
	GameIds  []string `json:"gameIds" bson:"gameIds"`
}
