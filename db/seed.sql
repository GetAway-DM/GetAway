DROP TABLE IF EXISTS reservations;
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS favorites;
DROP TABLE IF EXISTS listings;
DROP TABLE IF EXISTS amenities;
DROP TABLE IF EXISTS property_types;
DROP TABLE IF EXISTS users;

CREATE TABLE users(
user_id SERIAL PRIMARY KEY,
first_name VARCHAR(30),
last_name VARCHAR(30),
email TEXT,
hash TEXT,
profile_img TEXT
);

CREATE TABLE property_types(
type_id SERIAL PRIMARY KEY
type_name VARCHAR(15)
);

CREATE TABLE listings(
listing_id SERIAL PRIMARY KEY,
title VARCHAR(100),
description TEXT,
owner_id INT REFERENCES users(user_id),
property_type INT REFERENCES property_types(type_id),
bedrooms NUMERIC(1,0),
bathrooms NUMERIC(1,0), 
price NUMERIC(6, 0),
street TEXT,
city TEXT,
state TEXT,
zip INT
);

CREATE TABLE amenities(
amenities_id SERIAL PRIMARY KEY,
listing_id INT REFERENCES listings(listing_id),
parking BOOLEAN,
television BOOLEAN,
washer_dryer BOOLEAN,
air_conditioning BOOLEAN,
wifi BOOLEAN,
hair_dryer BOOLEAN,
pool BOOLEAN
);

CREATE TABLE favorites(
favorite_id SERIAL PRIMARY KEY,
listing_id INT REFERENCES listings(listing_id),
user_id INT REFERENCES users(user_id),
favorite BOOLEAN
);

CREATE TABLE reviews(
review_id SERIAL PRIMARY KEY,
property_id INT REFERENCES listings(listing_id),
author_id INT REFERENCES users(user_id),
rating INT,
content TEXT
);

CREATE TABLE reservations(
res_id SERIAL PRIMARY KEY,
user_id INT REFERENCES users(user_id),
date_from DATE,
date_to DATE,
listing_id INT REFERENCES listings(listing_id)
);