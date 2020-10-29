SELECT l.listing_id, l.price, l.title, l.street, l.city, l.state, u.first_name, u.last_name, u.profile_img, l.description, l.bedrooms, l.bathrooms, lp.photo, AVG(r.rating) ::NUMERIC(3,2) FROM listings l
JOIN users u
ON l.owner_id = u.user_id
LEFT JOIN reviews r
ON l.listing_id = r.property_id
JOIN listing_photos lp
ON lp.listing_id = l.listing_id
WHERE l.listing_id = $1
GROUP BY u.user_id, l.listing_id, lp.photo;