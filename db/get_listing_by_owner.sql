SELECT * FROM listings
WHERE owner_id = $1
ORDER BY listing_id ASC;