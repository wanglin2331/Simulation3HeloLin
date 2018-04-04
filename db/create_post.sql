insert into posts (user_id, title, image_url, description)
values (${user_id}, ${title}, ${image_url}, ${description})
;

SELECT *
FROM posts;
