-- =============================================================
-- V1: Bảng cho Home Page (danh mục, sản phẩm, ảnh/video, đồ thật)
-- Quy ước: tên bảng/cột snake_case, tiền là BIGINT (VND, không thập phân)
-- KHÔNG sửa file này sau khi đã merge vào main. Cần đổi thì tạo V3__..., V4__...
-- =============================================================

-- Danh mục: Váy cưới, Vest & suit, Áo dài...
CREATE TABLE categories (
    id          BIGSERIAL    PRIMARY KEY,
    name        VARCHAR(80)  NOT NULL,
    slug        VARCHAR(80)  NOT NULL UNIQUE,
    description VARCHAR(255),                       -- dòng phụ: "Đuôi cá · Xòe công chúa · Váy đi bàn"
    icon_url    VARCHAR(500),
    sort_order  INT          NOT NULL DEFAULT 0,    -- thứ tự hiển thị trên Home
    created_at  TIMESTAMPTZ  NOT NULL DEFAULT now()
);

-- Mẫu trang phục (1 dòng = 1 mẫu, vd "Áo dài lụa đỏ")
CREATE TABLE products (
    id             BIGSERIAL     PRIMARY KEY,
    category_id    BIGINT        NOT NULL REFERENCES categories(id),
    name           VARCHAR(150)  NOT NULL,
    slug           VARCHAR(160)  NOT NULL UNIQUE,
    description    VARCHAR(2000),
    price_per_day  BIGINT        NOT NULL CHECK (price_per_day >= 0),
    deposit_amount BIGINT        NOT NULL CHECK (deposit_amount >= 0),
    rent_count     INT           NOT NULL DEFAULT 0 CHECK (rent_count >= 0),
    status         VARCHAR(20)   NOT NULL DEFAULT 'ACTIVE'
                   CHECK (status IN ('ACTIVE', 'HIDDEN')),
    created_at     TIMESTAMPTZ   NOT NULL DEFAULT now(),
    updated_at     TIMESTAMPTZ   NOT NULL DEFAULT now()
);
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_rent_count ON products(rent_count DESC);

-- Ảnh và video của mẫu
CREATE TABLE product_media (
    id          BIGSERIAL    PRIMARY KEY,
    product_id  BIGINT       NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    type        VARCHAR(10)  NOT NULL CHECK (type IN ('IMAGE', 'VIDEO')),
    url         VARCHAR(500) NOT NULL,
    is_primary  BOOLEAN      NOT NULL DEFAULT false,  -- ảnh đại diện (thumbnail)
    sort_order  INT          NOT NULL DEFAULT 0
);
CREATE INDEX idx_product_media_product ON product_media(product_id);
-- Mỗi sản phẩm chỉ có tối đa 1 ảnh chính
CREATE UNIQUE INDEX uq_product_media_primary ON product_media(product_id) WHERE is_primary;

-- Từng bộ đồ thật trong kho (1 mẫu có nhiều bộ, mỗi bộ 1 size)
-- Dùng để tính "Size S–M" và "Còn 3 bộ"; sau này đơn thuê sẽ gắn vào từng bộ.
CREATE TABLE product_items (
    id          BIGSERIAL    PRIMARY KEY,
    product_id  BIGINT       NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    code        VARCHAR(30)  NOT NULL UNIQUE,          -- mã tem, vd "AD-001-M-01"
    size        VARCHAR(10)  NOT NULL
                CHECK (size IN ('XS', 'S', 'M', 'L', 'XL', 'XXL', 'FREE')),
    status      VARCHAR(20)  NOT NULL DEFAULT 'AVAILABLE'
                CHECK (status IN ('AVAILABLE', 'RENTED', 'CLEANING', 'REPAIR', 'RETIRED')),
    created_at  TIMESTAMPTZ  NOT NULL DEFAULT now()
);
CREATE INDEX idx_product_items_product ON product_items(product_id);
