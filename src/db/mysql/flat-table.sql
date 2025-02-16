SELECT 
    o.id as order_id,
    o.user_id,
    u.user_name,
    u.user_email,
    o.product_id,
    p.product_name,
    p.product_price,
    o.order_quantity,
    o.order_date
FROM orders o
LEFT JOIN users u ON o.user_id = u.id 
LEFT JOIN products p ON o.product_id = p.id ;