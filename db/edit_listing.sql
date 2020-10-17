UPDATE listings SET title = $2, description = $3, property_type = $4, bedrooms = $5, bathrooms = $6, street = $7, city = $8, state = $9, zip = $10, parking = $11, television = $12, washer_dryer = $13, air_conditioning = $14, wifi = $15, hair_dryer = $16, pool = $17
WHERE listing_id = $1
RETURNING *;