# wear-rental
Clothing Rental Management Web Application Group Project

## Cấu trúc

- `frontend/` – HTML + CSS + JS thuần (xem `frontend/README.md`)
- `backend/` – Spring Boot REST API (xem `backend/README.md`)
- `docker-compose.yml` – PostgreSQL cho môi trường dev

## Chạy nhanh

```bash
docker compose up -d                 # bật database
cd backend && ./mvnw spring-boot:run # bật backend ở http://localhost:8080
```

Frontend: mở `frontend/` bằng Live Server (cổng 5500) hoặc `npx serve .` (cổng 3000).
