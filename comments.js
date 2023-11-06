// Create web server

// Import express module
const express = require('express');
// Create web server
const app = express();

// Import body-parser module
const bodyParser = require('body-parser');
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// Parse application/json
app.use(bodyParser.json());

// Import cors module
const cors = require('cors');
// Allow all domain
app.use(cors());

// Import mongoose module
const mongoose = require('mongoose');
// Connect to database
mongoose.connect('mongodb://localhost:27017/comment', { useNewUrlParser: true, useUnifiedTopology: true });

// Create schema
const commentSchema = new mongoose.Schema({
    name: String,
    comment: String
});
// Create model
const Comment = mongoose.model('Comment', commentSchema);

// Get comment
app.get('/comment', (req, res) => {
    Comment.find({}, (err, comments) => {
        res.json(comments);
    });
});

// Post comment
app.post('/comment', (req, res) => {
    // Create new comment
    const comment = new Comment({
        name: req.body.name,
        comment: req.body.comment
    });
    // Save comment
    comment.save((err, result) => {
        res.json(result);
    });
});

// Listen on port 3000
app.listen(3000);