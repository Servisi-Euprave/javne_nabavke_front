package main

import (
	"github.com/gin-gonic/gin"
	"github.com/mandrigin/gin-spa/spa"
)

func main() {
	r := gin.Default()
	r.Use(spa.Middleware("/", "./"))
	r.Run(":3000")
}