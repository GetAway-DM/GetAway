INSERT INTO amenities( listing_id, parking, television, washer_dryer, air_conditioning, wifi, hair_dryer, pool)
VALUES
($1, $2, $3, $4, $5, $6, $7, $8)
returning *;