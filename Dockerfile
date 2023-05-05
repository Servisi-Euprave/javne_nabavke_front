FROM golang:alpine as builder
WORKDIR /app
COPY . .
RUN go mod download

RUN CGO_ENABLED=0 GOOS=linux go build -o main .

FROM node:18-alpine as frontend
WORKDIR /app
COPY . .
RUN npm run build

FROM alpine
WORKDIR /root/
COPY --from=builder /app/main .
COPY --from=frontend /app/build .

EXPOSE 3000
CMD ["./main"]