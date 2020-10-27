INSERT INTO listing_photos(listing_id, photo)
VALUES ($1, $2)
returning *;