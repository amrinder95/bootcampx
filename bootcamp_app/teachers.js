const { Pool } = require("pg");

const pool = new Pool({ //setup connection to database
  user: "development",
  password: "development",
  host: "localhost",
  database: "bootcampx",
});

const args = process.argv.slice(2); //retrieve arguments from command line

pool.query(
  `SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
  FROM teachers
  JOIN assistance_requests ON teacher_id = teachers.id
  JOIN students ON student_id = students.id
  JOIN cohorts ON cohort_id = cohorts.id
  WHERE cohorts.name LIKE '%${args[0]}%'
  GROUP BY teachers.name, cohorts.name
  ORDER BY teachers.name;`
  )
  .then((res) => {
    res.rows.forEach((row) => {
      console.log(`${row.cohort}: ${row.teacher}`)
    });
  })
  .catch((err) => {
    console.log("Query Error", err.stack)
  });