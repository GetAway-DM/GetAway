 INSERT INTO reservations(user_id, listing_id, date_from, date_to)
 VALUES ($1, $2, $3, $4)
 RETURNING *;