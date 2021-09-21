const express = require('express');//importar express usar metodo llamado router
const router = express.Router();

const pool = require('../database');
const {isLoggedIn} = require('../lib/auth');

router.get('/add', isLoggedIn, (req,res) => {
    res.render('links/add');
});

router.post('/add', isLoggedIn, async (req,res) =>{
    const {title, url, description } = req.body;
    const newlink = {
        title,
        url,
        description,
        user_id: req.user.id
    };
    await pool.query('INSERT INTO links set ?',[newlink]);
    req.flash('success', 'Links Add successfully');
    res.redirect('/links');
});

router.get('/', isLoggedIn, async (req,res) => {
    const links = await pool.query('SELECT * FROM links WHERE user_id = ?', [req.user.id]);
    console.log(links);
    res.render('links/list',{links});
});

router.get('/delete/:id', isLoggedIn, async (req,res) =>{
    const { id } = req.params;
    pool.query('DELETE FROM links WHERE ID = ?', [id]);
    req.flash('success', 'Links Removed successfully');
    res.redirect('/links');
});

router.get('/delete/:id', isLoggedIn, async (req, res) => {
    console.log(req.params.id);
    res.send('DELETED');
});

router.get('/edit/:id', isLoggedIn, async (req, res)=>{
    const { id } = req.params;
    const links = await pool.query('SELECT * FROM links WHERE id = ?', [id]);
     res.render('links/edit',{link: links[0]});
});

router.post('/edit/:id', isLoggedIn, async (req,res)=>{
    const {id} = req.params;
    const {title,description,url} = req.body;
    const newLink ={
        title,
        description,
        url
    };
    console.log(newLink);
    await pool.query('UPDATE links set ? WHERE id = ?', [newLink, id]);
    req.flash('success', 'Link Updated succesfully');
    res.redirect('/links');
});

module.exports = router;