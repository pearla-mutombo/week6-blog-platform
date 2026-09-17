-- Query 1: Get the five newest blog posts
-- Returns the post title, author name, and creation date.
select
  title,
  author_name,
  created_at
from public.blogs
order by created_at desc
limit 5;


-- Query 2: Count blog posts by author
-- Returns each author's name and post count, highest count first.
select
  author_name,
  count(*) as post_count
from public.blogs
group by author_name
order by post_count desc;
