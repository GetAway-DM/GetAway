SELECT l.title, l.city, l.state, u.first_name, u.last_name, u.profile_img, l.description, l.bedrooms, l.bathrooms FROM l listings
JOIN u users
ON l.owner_id = u.user_id
WHERE l.listing_id = $1;

