package models

type Question struct {
	Id         string   `json:"id" bson:"_id"`
	Question   string   `json:"question" bson:"question"`
	Difficulty string   `json:"difficulty" bson:"difficulty"`
	Answer     string   `json:"answer" bson:"answer"`
	Options    []string `json:"options" bson:"options"`
}
