const { Pool } = require("pg");

const pool = new Pool({ //setup connection to database
  user: "development",
  password: "development",
  host: "localhost",
  database: "bootcampx",
});

const args = process.argv.slice(2); //retrieve arguments from command line

const queryString = `    
  SELECT students.id, students.name AS name, cohorts.name AS cohort
  FROM students
  JOIN cohorts ON cohort_id = cohorts.id
  WHERE cohorts.name LIKE $1
  LIMIT $2
  `;


pool.query(queryString, [`%${args[0]}%`, args[1]])
  .then((res) => {
    res.rows.forEach((user) => {
      console.log(`${user.name} has an id of ${user.id} and was in the ${user.cohort} cohort`)
    });
  })
  .catch((err) =>
    console.log("Query Error", err.stack)
  );
