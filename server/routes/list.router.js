const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');

// Get all tasks
router.get('/', (req, res) => {
  let queryText = `
    SELECT * FROM "tasks"  
    ORDER BY "id";`;

  pool.query(queryText).then(result => {
    res.send(result.rows);
  })
  .catch(error => {
    console.log('error getting tasks, bruh', error);
    res.sendStatus(500);
  });
});
  
 
router.post('/',  (req, res) => {
  let newTask = req.body;
  console.log(`Adding task`, newTask);
  
  let queryText = `INSERT INTO "tasks" ("task")
                     VALUES ($1);`;
  pool.query(queryText, [newTask.task])
    .then(result => {
       res.sendStatus(201);
    })
    .catch(error => {
      console.log(`Error adding new task`, error);
      res.sendStatus(500);
    });
});
  
router.delete('/:id', (req, res) => {
  let taskId = req.params.id;
  console.log('Delete request for id', taskId);
  
  let sqlQuery = `
    DELETE FROM "tasks" 
    WHERE "id" = $1;
  `;
  
  const sqlParams = [
    taskId,             
  ];
  pool.query(sqlQuery, sqlParams)
    .then(() => {
      console.log('task deleted');
      res.sendStatus(204);
    })
    .catch( (error) => {
      console.log(`Error making database query`, error);
      res.sendStatus(500); 
    })
})

module.exports = router;