SELECT a.parking, a.television, a.washer_dryer, a.air_conditioning, a.wifi, a.hair_dryer, a.pool
FROM amenities a
JOIN listings l ON a.amenities_id = listing_id
WHERE l.listing_id = $1
ORDER BY l.id;