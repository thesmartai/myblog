const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const controller = require('../controller/blogController');

// Konfiguration für Multer: Speicherort und Dateinamen festlegen
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/images/')); // Verzeichnis für Uploads angeben
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Eindeutigen Dateinamen erstellen
    }
});
const upload = multer({ storage: storage });

// Route: Render new post page
router.get('/newpost', (req, res) => {
    res.render(path.join(__dirname, '../views/createBlog'), { title: "Post Creation" });
});

// Route: Get all posts
router.get('/', controller.getAllPosts);

// Route: Add new post (inklusive Dateiupload)
router.post('/', upload.single('image'), controller.createPost);

// Route: Get post by ID
router.get('/:id', controller.readPost);

module.exports = router;
