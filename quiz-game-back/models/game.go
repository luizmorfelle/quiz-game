package models

type Game struct {
	Id             string     `json:"id,omitempty" bson:"_id,omitempty"`
	TeacherId      string     `json:"teacherId" bson:"teacherId"`
	StudentId      string     `json:"studentId" bson:"studentId"`
	ActualQuestion string     `json:"actualQuestion" bson:"actualQuestion"`
	Answers        []string   `json:"answers" bson:"answers"`
	Score          int        `json:"score" bson:"score"`
	Questions      []Question `json:"questions" bson:"questions"`
	Difficulty     string     `json:"difficulty" bson:"difficulty"`
}
