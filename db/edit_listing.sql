UPDATE listings SET title = $2, description = $3,  bedrooms = $4, bathrooms = $5, price = $6, street = $7, city = $8, state = $9, zip = $10
WHERE listing_id = $1
RETURNING *;
