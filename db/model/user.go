package model

type User struct {
	ID   string
	Name string
	Age  int
}

// 例：後々使えるドメイン振る舞い
func (u User) IsSilverGeneration() bool { return u.Age >= 65 }
