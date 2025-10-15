CREATE TABLE category (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    parent_id INT REFERENCES category(id) ON DELETE SET NULL
);

CREATE TABLE sellers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    price INTEGER NOT NULL,
    category_id INT REFERENCES category(id),
    seller_id INT REFERENCES sellers(id)
);

CREATE TABLE seller_products (
    seller_id INT REFERENCES sellers(id) ON DELETE CASCADE,
    product_id INT REFERENCES products(id) ON DELETE CASCADE,
    PRIMARY KEY (seller_id, product_id)
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE user_basket (
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    product_id INT REFERENCES products(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, product_id)
);

CREATE TABLE user_favorites (
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    product_id INT REFERENCES products(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, product_id)
);

CREATE TABLE product_reviews (
    id SERIAL PRIMARY KEY,
    comment TEXT,
    product_id INT REFERENCES products(id) ON DELETE CASCADE,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE seller_reviews (
    id SERIAL PRIMARY KEY,
    comment TEXT,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    seller_id INT REFERENCES sellers(id) ON DELETE CASCADE,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE product_images (
    id SERIAL PRIMARY KEY,
    image_url TEXT NOT NULL,
    product_id INT REFERENCES products(id) ON DELETE CASCADE
);
