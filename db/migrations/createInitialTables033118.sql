create table users (
    id SERIAL PRIMARY KEY,
    name varchar,
    email varchar,
    auth_id varchar
);

create table posts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users,
    title varchar,
    image_url text,
    description varchar
);