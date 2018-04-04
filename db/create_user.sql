INSERT INTO users ( name, email, auth_id )
VALUES (${name},${email},${auth_id})

RETURNING *;