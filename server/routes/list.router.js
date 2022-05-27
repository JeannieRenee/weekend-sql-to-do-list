const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');

// Get all tasks
router.get('/', (req, res) => {
    let queryText = `
      SELECT * FROM "tasks"  
      ORDER BY "id";`;

    pool.query(queryText).then(result => {
      // Sends back the results in an object
      res.send(result.rows);
    })
    .catch(error => {
      console.log('error getting tasks, bruh', error);
      res.sendStatus(500);
    });
});
  
//   // Adds a new book to the list of awesome reads
//   // Request body must be a book object with a title and author.
//   router.post('/',  (req, res) => {
//     let newBook = req.body;
//     console.log(`Adding book`, newBook);
  
//     let queryText = `INSERT INTO "books" ("author", "title")
//                      VALUES ($1, $2);`;
//     pool.query(queryText, [newBook.author, newBook.title])
//       .then(result => {
//         res.sendStatus(201);
//       })
//       .catch(error => {
//         console.log(`Error adding new book`, error);
//         res.sendStatus(500);
//       });
//   });
  
//   // TODO - PUT
//   // Updates a book to show that it has been read
//   // Request must include a parameter indicating what book to update - the id
//   // Request body must include the content to update - the status
//   router.put('/:id', (req, res) => {
//     let bookId = req.params.id;
//     console.log('put request for id', bookId);
  
//     let sqlQuery = `
//     UPDATE "books" 
//     SET "isRead" = $2
//     WHERE "id" = $1;
//     `;
  
//     const sqlParams = [
//       bookId, 
//       true            
//     ];
//     pool.query(sqlQuery, sqlParams)
//       .then(() => {
//         console.log('book read updated');
//         res.sendStatus(204);
//       })
//       .catch( (error) => {
//         console.log(`Error making database query isREAd`, error);
//         res.sendStatus(500); 
//       })
//   })
  
//   // TODO - DELETE 
//   router.delete('/:id', (req, res) => {
//     let bookId = req.params.id;
//     console.log('Delete request for id', bookId);
  
//     let sqlQuery = `
//     DELETE FROM "books" 
//     WHERE "id" = $1;
//     `;
//     const sqlParams = [
//       bookId,             
//     ];
//     pool.query(sqlQuery, sqlParams)
//       .then(() => {
//         console.log('book deleted');
//         res.sendStatus(204);
//       })
//       .catch( (error) => {
//         console.log(`Error making database query`, error);
//         res.sendStatus(500); 
//       })
//   })

module.exports = router;