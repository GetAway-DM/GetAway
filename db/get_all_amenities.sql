SELECT a.parking, a.television, a.washer_dryer, a.air_conditioning, a.wifi, a.hair_dryer, a.pool FROM amenities a
JOIN listings l
ON a.amenity_id = l.listing_id;