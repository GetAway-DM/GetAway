UPDATE listings SET title = $2, description = $3, property_type = $4, bedrooms = $5, bathrooms = $6, price = $7, street = $8, city = $9, state = $10, zip = $11, parking = $12, television = $13, washer_dryer = $14, air_conditioning = $15, wifi = $16, hair_dryer = $17, pool = $18
WHERE listing_id = $1
RETURNING *;
