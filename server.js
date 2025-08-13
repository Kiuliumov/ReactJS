const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());

const dbPath = path.resolve(__dirname, 'todos.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error('Database connection error:', err);
});

db.run(`
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    completed INTEGER DEFAULT 0
  )
`);


app.get('/todos', (req, res) => {
  db.all('SELECT * FROM todos', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.get('/todos/:id', (req, res) => {
  db.get('SELECT * FROM todos WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Todo not found' });
    res.json(row);
  });
});

app.post('/todos', (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });

  db.run('INSERT INTO todos (title) VALUES (?)', [title], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID, title, completed: 0 });
  });
});

app.put('/todos/:id', (req, res) => {
  const { title, completed } = req.body;
  if (title === undefined && completed === undefined) {
    return res.status(400).json({ error: 'Nothing to update' });
  }

  db.get('SELECT * FROM todos WHERE id = ?', [req.params.id], (err, todo) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!todo) return res.status(404).json({ error: 'Todo not found' });

    const updatedTitle = title !== undefined ? title : todo.title;
    const updatedCompleted = completed !== undefined ? (completed ? 1 : 0) : todo.completed;

    db.run(
      'UPDATE todos SET title = ?, completed = ? WHERE id = ?',
      [updatedTitle, updatedCompleted, req.params.id],
      function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: req.params.id, title: updatedTitle, completed: updatedCompleted });
      }
    );
  });
});

app.delete('/todos/:id', (req, res) => {
  db.run('DELETE FROM todos WHERE id = ?', [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Todo not found' });
    res.status(204).send();
  });
});

app.listen(PORT, () => {
  console.log(`✅ Todo API running at http://localhost:${PORT}`);
});
