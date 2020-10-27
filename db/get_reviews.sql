SELECT r.review_id, u.first_name, u.last_name, r.rating, r.content, r.created_at
FROM reviews r
JOIN users u ON r.author_id = u.user_id
WHERE r.property_id = $1;
