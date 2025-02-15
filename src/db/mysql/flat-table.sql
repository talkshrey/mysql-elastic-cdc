SELECT 
    o.id AS order_id,
    o.user_id,
    u.name AS user_name,
    u.email AS user_email,
    o.product_id,
    p.name AS product_name,
    p.price AS product_price,
    o.quantity,
    o.order_date
FROM orders o
LEFT JOIN users u ON o.user_id = u.id 
LEFT JOIN products p ON o.product_id = p.id ;