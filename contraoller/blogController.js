const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

let info = [];
let id = 0;

function loadpost()
{

    try {
        const filePath ='./public/Database/blog.JSON';
        const data = fs.readFileSync(filePath, 'utf8');
        info = JSON.parse(data);
        // Set id to the next available number
        id = info.reduce((maxId, post) => Math.max(maxId, post.id), 0) + 1;

    } catch (err) {
        console.error('Error loading posts:', err);
        info = []; // Reset to empty array if file read fails
        id = 0; // Reset id counter
    }

}



// Helper function: Load posts from file
const getAllPosts=(req,res)=> {
loadpost();
res.render('blog',{info:info,title:"Myblog"});

}

// Helper function: Save posts to file
const createPost=(req,res)=> {
    const { title, datum, benutzername, text } = req.body;
    const newPost = { id, title, date: datum, name: benutzername, text };
    info.push(newPost);
    id += info.length-1;
    try {
        const filePath = path.join('public', 'Database', 'blog.JSON');
       
        fs.writeFileSync(filePath, JSON.stringify(info, null, 2));
        console.log('Posts successfully saved!');
    } catch (err) {
        console.error('Error writing to blog.JSON:', err);
    }
    res.send(newPost);
}

const readPost=(req,res)=>{

    loadpost();
    const postId = parseInt(req.params.id, 10);
    const post = info.find(post => post.id === postId);
    if (post) {
        res.send(post);
    } else {
        res.status(404).send('Post not found');
    }

} 


module.exports=
{
getAllPosts,
createPost,
readPost
}