const fs = require('fs');
const path = require('path');
const multer = require('multer');

// Array to store blog posts and initialize ID counter
let info = [];
let id = 0;

// Function to load blog posts from JSON file
function loadPosts() {
    try {
        const filePath = path.join(__dirname, '..', 'public', 'Database', 'blog.json');
        const data = fs.readFileSync(filePath, 'utf8');
        info = JSON.parse(data);
        // Set ID to the next available number
        id = info.reduce((maxId, post) => Math.max(maxId, post.id), 0) + 1;
    } catch (err) {
        console.error('Error loading posts:', err);
        info = []; // Reset to empty array on file read error
        id = 0; // Reset ID counter
    }
}

// Helper function: Render all blog posts
const getAllPosts = (req, res) => {
    loadPosts();
    res.render('blog', { info: info, title: "My Blog" });
}

// Helper function: Create a new blog post
const createPost = (req, res) => {
    const { title, datum, benutzername, text } = req.body;
    const newPost = { id, title, date: datum, name: benutzername, text };

    // File upload handling
    if (req.file) {
        
        const image = '../images/'+req.file.filename; // Assuming uploaded file name is stored as filename
        newPost.image = image;
    }

    info.push(newPost);
    id += 1; // Increment ID for next post

    // Save blog posts to JSON file
    try {
        const filePath = path.join(__dirname, '..', 'public', 'Database', 'blog.json');
        fs.writeFileSync(filePath, JSON.stringify(info, null, 2));
        console.log('Posts successfully saved!');
    } catch (err) {
        console.error('Error writing to blog.json:', err);
    }
    
    // Respond with the newly created blog post
    res.redirect('/blog/' + newPost.id); // Redirect to view the newly created post
}

// Helper function: Render a single blog post
const readPost = (req, res) => {
    loadPosts();
    const postId = parseInt(req.params.id, 10);
    const post = info.find(post => post.id === postId);
    if (post) {
        res.render('viewpost', {
            title: post.title,
            benutzername: post.name,
            text: post.text,
            datum: post.date,
            image: post.image
        });
    } else {
        res.status(404).send('Post not found');
    }
}

module.exports = {
    getAllPosts,
    createPost,
    readPost
}
