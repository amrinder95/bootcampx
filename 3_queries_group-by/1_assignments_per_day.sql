SELECT
  day, COUNT(id) AS total_submissions
FROM assignments
GROUP BY day
ORDER BY day;
