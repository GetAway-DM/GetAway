UPDATE reviews SET rating = $2, content = $3, created_at = NOW()
WHERE review_id = $1;