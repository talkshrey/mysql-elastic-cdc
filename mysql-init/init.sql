GRANT FLUSH_TABLES, REPLICATION CLIENT, REPLICATION SLAVE ON *.* TO 'mysqluser'@'%';
FLUSH PRIVILEGES;

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_name VARCHAR(100) NOT NULL,
    user_email VARCHAR(100) UNIQUE NOT NULL
);

-- Insert dummy data into Users table
INSERT INTO users (user_name, user_email) VALUES
('Alice Johnson', 'alice@example.com'),
('Bob Smith', 'bob@example.com'),
('Charlie Brown', 'charlie@example.com');

-- Create Products table
CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    product_price INT NOT NULL
);

-- Insert dummy data into Products table
INSERT INTO products (product_name, product_price) VALUES
('Laptop', 200),
('Smartphone', 300),
('Headphones', 100);

-- Create Orders table
CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    product_id INT,
    order_quantity INT NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Insert dummy data into Orders table
INSERT INTO orders (user_id, product_id, order_quantity) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 1),
(1, 3, 2);

