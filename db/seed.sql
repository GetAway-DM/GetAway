DROP TABLE IF EXISTS reservations;
DROP TABLE IF EXISTS listings;
DROP TABLE IF EXISTS users;

CREATE TABLE users(
user_id SERIAL PRIMARY KEY,
first_name VARCHAR(30),
last_name VARCHAR(30),
email TEXT,
hash TEXT,
profile_img TEXT
);

CREATE TABLE listings(
listing_id SERIAL PRIMARY KEY,
title VARCHAR(100),
description TEXT,
owner_id INT REFERENCES users(user_id),
price NUMERIC(6, 0),
street TEXT,
city TEXT,
state TEXT,
zip INT,
parking BOOLEAN,
television BOOLEAN,
washer_dryer BOOLEAN,
air_conditioning BOOLEAN,
wifi BOOLEAN,
hair_dryer BOOLEAN,
pool BOOLEAN
);

CREATE TABLE reservations(
res_id SERIAL PRIMARY KEY,
user_id INT REFERENCES users(user_id),
date_from DATE,
date_to DATE,
listing_id INT REFERENCES listings(listing_id) 
);