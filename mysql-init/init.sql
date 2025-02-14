GRANT FLUSH_TABLES, REPLICATION CLIENT, REPLICATION SLAVE ON *.* TO 'mysqluser'@'%';
FLUSH PRIVILEGES;

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);

-- Insert dummy data into Users table
INSERT INTO users (name, email) VALUES
('Alice Johnson', 'alice@example.com'),
('Bob Smith', 'bob@example.com'),
('Charlie Brown', 'charlie@example.com');

-- Create Products table
CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL
);

-- Insert dummy data into Products table
INSERT INTO products (name, price) VALUES
('Laptop', 999.99),
('Smartphone', 599.99),
('Headphones', 199.99);

-- Create Orders table
CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    product_id INT,
    quantity INT NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Insert dummy data into Orders table
INSERT INTO orders (user_id, product_id, quantity) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 1),
(1, 3, 2);

