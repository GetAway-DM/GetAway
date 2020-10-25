INSERT INTO reviews
(property_id, author_id, rating, content, created_at)
VALUES
($1, $2, $3, $4, NOW())
returning *;
