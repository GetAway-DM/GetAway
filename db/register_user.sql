INSERT INTO users ( email, first_name, last_name, hash)
VALUES ($1, $2, $3, $4)
returning user_id, first_name, last_name, email, profile_img;