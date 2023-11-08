const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const { response } = require('express');
const { copyFileSync } = require('fs');

// Serve static files from the current directory
app.use(express.static(__dirname));

// Create a MySQL database connection pool
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'library'
});

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define routes and handlers

// Route for user signin
app.post('/signin', (req, res) => {
  let sql = "SELECT Id, Name, Email, Phone, Gender from admin WHERE Id=? and Password=?";
  db.query(sql, [req.body.Id, req.body.Password], (e, results) => {
    if (e) {
      console.log(e);
    }
    console.log(results);
    if (results.length > 0) {
      return res.json({
        valid: 1,
        info: results[0]
      });
    } else {
      return res.json({
        valid: 0
      });
    }
  });
});

// Route for fetching a list of books
app.post('/book', (req, res) => {
  let sql = "SELECT bookid, bookname, publisher, author, isbn, edition, pages, available from book";
  db.query(sql, (e, results) => {
    if (e) {
      console.log(e);
    }
    return res.json({
      data: results
    });
  });
});

// Route for fetching a list of borrowers
app.post('/borrower', (req, res) => {
  let sql = "SELECT borrowerid, borrowername, email, phone, gender from borrower";
  db.query(sql, (e, results) => {
    if (e) {
      console.log(e);
    }
    return res.json({
      data: results
    });
  });
});

// Route for fetching a list of book reports
app.post('/bookreport', (req, res) => {
  let sql = "SELECT sid, sname, bid, bname, issuedate, duedate from bookreport";
  db.query(sql, (e, results) => {
    if (e) {
      console.log(e);
    }
    return res.json({
      data: results
    });
  });
});

// Route for adding a new book or updating book quantity
app.post('/addbook', (req, res) => {
  let sql = "SELECT bookid, available from book WHERE bookid=?";
  db.query(sql, [req.body.id], (e, results) => {
    if (e) {
      console.log(e);
    }
    console.log(results);
    if (results.length === 0) {
      sql = "INSERT INTO book (Bookid, Bookname, Publisher, Author, ISBN, Edition, Pages, Available) VALUES (?,?,?,?,?,?,?,?)";
      db.query(sql, [req.body.id, req.body.name, req.body.publisher, req.body.author, req.body.isbn, req.body.edition, req.body.pages, req.body.quantity], (e, results) => {
        if (e) {
          console.log(e);
        }
        return res.json({
          msg: "New Book Inserted"
        });
      });
    } else {
      let add = parseInt(req.body.quantity, 10);
      let New = results[0].Available + add;
      sql = "UPDATE book SET Available=? WHERE bookid=?";
      db.query(sql, [New, req.body.id], (e, results) => {
        if (e) {
          console.log(e);
        }
        return res.json({
          msg: "Book Quantity Updated"
        });
      });
    }
  });
  console.log(req.body);
});

// Route for searching book information
app.post('/searchbook', (req, res) => {
  let sql = "SELECT Bookname, ISBN, Author, Publisher, Edition, Pages from book WHERE bookid=?";
  db.query(sql, [req.body.id], (e, results) => {
    if (e) {
      console.log(e);
    }
    console.log(results);
    return res.json({
      data: results
    });
  });
});

// Route for adding a new borrower
app.post('/addborrower', (req, res) => {
  console.log(req.body.id);
  let sql = "SELECT borrowerid from borrower WHERE borrowerid=?";
  db.query(sql, [req.body.id], (e, results) => {
    if (e) {
      console.log(e);
    }
    console.log(results);
    if (results.length > 0) {
      return res.json({
        status: 0
      });
    } else {
      let sql = "INSERT INTO borrower (borrowerid, borrowername, email, phone, gender) VALUES (?,?,?,?,?)";
      db.query(sql, [req.body.id, req.body.name, req.body.email, req.body.phone, req.body.gender], (e, results) => {
        if (e) {
          console.log(e);
        }
        return res.json({
          status: 1
        });
      });
    }
  });
});



// Route for removing a borrower
app.post('/removeborrower', (req, res) => {
  let sql = "DELETE FROM borrower WHERE borrowerid=?";
  db.query(sql, [req.body.id], (e, results) => {
    if (e) {
      console.log(e);
    }
    console.log(results);
    return res.json({
      msg: "Borrower Removed Successfully"
    });
  });
});

// Route for searching borrower information
app.post('/searchborrower', (req, res) => {
  let sql = "SELECT borrowername from borrower WHERE borrowerid=?";
  db.query(sql, [req.body.id], (e, results) => {
    if (e) {
      console.log(e);
    }
    console.log(results);
    return res.json({
      data: results
    });
  });
});

// Route for issuing a book
app.post('/issuebook', (req, res) => {
  let sql = "INSERT INTO bookreport (sid, sname, bid, bname, issuedate, duedate) VALUES (?,?,?,?,?,?)";
  db.query(sql, [req.body.sid, req.body.sname, req.body.bid, req.body.bname, req.body.issuedate, req.body.duedate], (e, results) => {
    if (e) {
      console.log(e);
    }
    return res.json({
      msg: "Book Issued Successfully"
    });
  });
});

// Route for returning a book
app.post('/bookreturned', (req, res) => {
  let sql = "DELETE FROM bookreport WHERE sid=? and bid=?";
  db.query(sql, [req.body.sid, req.body.bid], (e, results) => {
    if (e) {
      console.log(e);
    }
    console.log(results);
    return res.json({
      msg: "Book Returned Successfully"
    });
  });
});

// Start the server
app.listen(4000,() => {
  console.log("Run on 4000");
})