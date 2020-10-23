SELECT l.listing_id, l.title, l.city, l.state, u.first_name, u.last_name, u.profile_img, l.description, l.bedrooms, l.bathrooms FROM listings l
JOIN users u
ON l.owner_id = u.user_id
WHERE l.listing_id = $1;
