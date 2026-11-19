-- =============================================================
-- V2: Cửa hàng (dropdown "Chọn cửa hàng" trên header)
-- KHÔNG sửa file này sau khi đã merge vào main. Cần đổi thì tạo file mới với số tiếp theo.
-- =============================================================

CREATE TABLE stores (
    id             BIGSERIAL     PRIMARY KEY,
    name           VARCHAR(100)  NOT NULL,                 -- "RentWear"
    address        VARCHAR(255)  NOT NULL,
    city           VARCHAR(80)   NOT NULL,                 -- "City"
    phone          VARCHAR(20),
    opening_hours  VARCHAR(100),                           -- "8:00 – 21:00, MON-SUN"
    map_url        VARCHAR(500),                           -- link Google Maps
    sort_order     INT           NOT NULL DEFAULT 0,       -- thứ tự trong dropdown
    status         VARCHAR(20)   NOT NULL DEFAULT 'ACTIVE'
                   CHECK (status IN ('ACTIVE', 'HIDDEN')), -- HIDDEN: tạm đóng, không hiện trên web
    created_at     TIMESTAMPTZ   NOT NULL DEFAULT now()
);
