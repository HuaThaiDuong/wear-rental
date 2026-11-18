# RentWear – Backend

Java 21 · Spring Boot 4.1 · PostgreSQL 17 · Flyway · JPA

## Chạy lần đầu

Cần có: **JDK 21**, **Docker Desktop** (đang bật). Không cần cài Maven, dùng `mvnw` có sẵn.

```bash
# 1. Bật database (chạy ở thư mục gốc của repo, nơi có docker-compose.yml)
docker compose up -d

# 2. Chạy backend
cd backend
./mvnw spring-boot:run        # Windows: mvnw.cmd spring-boot:run
```

Mở http://localhost:8080/api/health, thấy `{"status":"UP"}` là chạy được.

Trong IntelliJ: **File → Open** chọn thư mục `backend`, đợi tải xong thư viện, rồi bấm Run ở `RentWearApplication`.

## Kết nối database

| | |
|---|---|
| Host | `localhost:5432` |
| Database | `rentwear` |
| User / Password | `rentwear` / `rentwear` |

Xem bảng bằng IntelliJ (tab Database) hoặc DBeaver với thông tin trên.

## Cấu trúc

```
src/main/java/com/rentwear/
  RentWearApplication.java   chạy app
  config/                    cấu hình chung (CORS...)
  common/                    lỗi chung: ApiException, ErrorResponse, GlobalExceptionHandler
  health/                    GET /api/health
  <tính năng>/               mỗi tính năng 1 package, vd product/ gồm
                             Product (Entity), ProductRepository, ProductService,
                             ProductController, dto/
src/main/resources/
  application.yml            cấu hình
  db/migration/              file SQL của Flyway
```

## Quy tắc database (Flyway)

- Bảng **chỉ** được tạo/sửa bằng file SQL trong `db/migration`, đặt tên `V<số>__<mô_tả>.sql`
  (2 dấu gạch dưới), vd `V1__init.sql`, `V2__seed.sql`, `V3__add_users.sql`.
- **Không sửa file đã merge vào main.** Cần đổi bảng thì tạo file mới với số tiếp theo.
- Hibernate để `ddl-auto: validate`: Entity viết lệch so với bảng thì app báo lỗi ngay khi chạy.
- Database trên máy bị rối thì làm lại từ đầu: `docker compose down -v` rồi `docker compose up -d`.

## Quy ước API (theo API contract)

- Mọi API bắt đầu bằng `/api`.
- JSON dùng camelCase (`pricePerDay`), database dùng snake_case (`price_per_day`).
- Tiền là số nguyên VND (`350000`).
- Lỗi: ném `ApiException` trong Service, ví dụ `throw ApiException.notFound("Không tìm thấy sản phẩm");`
  → API tự trả về `{ "code": "NOT_FOUND", "message": "Không tìm thấy sản phẩm" }`.
