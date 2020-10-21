SELECT * FROM reservations WHERE listing_id = $1 AND date_to >= $2
  AND date_from <= $3;