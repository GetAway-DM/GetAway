UPDATE amenities SET parking = $2, television = $3, washer_dryer = $4, air_conditioning = $5, wifi = $6, hair_dryer = $7, pool = $8
WHERE amenities_id = $1
RETURNING *;