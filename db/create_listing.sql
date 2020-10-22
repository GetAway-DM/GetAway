INSERT INTO listings(title, description, owner_id, property_type, bedrooms, bathrooms, price, street, city, state, zip)
VALUES
($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
returning *;
