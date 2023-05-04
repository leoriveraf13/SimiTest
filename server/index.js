const express = require('express');
const db = require('./config/db')
const cors = require('cors')

const app = express();

const  PORT = 3002;
app.use(cors());
app.use(express.json())

// Route to get all pharmacy
app.get("/api/getPharmacy/", (req, res)=>{
    db.query('SELECT * FROM pharmacy', (err,result)=>{
        if(err) {
        console.error(err)
        } 
    res.send(result)
    }
    );   
});

// Route to get all products
app.get("/api/getProducts/", (req, res)=>{
    db.query('SELECT * FROM products', (err,result)=>{
        if(err) {
        console.error(err)
        } 
    res.send(result)
    }
    );   
});

// Route for creating pharmacy
app.post('/api/createPharmacy', (req,res)=> {
    const name = req.body.name;
    const minProd = req.body.minProd;
    const maxProd = req.body.maxProd;

    db.query("INSERT INTO pharmacy (name, minProd, maxProd) VALUES (?,?,?)",[name,minProd,maxProd], (err,result)=>{
    if(err) {
        console.error(err)
    } 
    res.send(result)
    });   
})

// Route for creating products
app.post('/api/createProducts', (req,res)=> {

    const name = req.body.name;
    const total = req.body.total;
    const remaining = req.body.remaining;
    const pharmacy = req.body.pharmacy;
    
    db.query("INSERT INTO products (name, total, remaining, pharmacy) VALUES (?,?,?,?)",[name, total, remaining, pharmacy], (err,result)=>{
       if(err) {
           console.error(err)
       } 
       res.send(result)
    });   
})

// Route to update a pharmacy
app.post('/api/updatePharmacy/:id',(req,res)=>{
    const id = req.params.id;
    const name = req.body.name;
    const minProd = req.body.minProd;
    const maxProd = req.body.maxProd;

    db.query("UPDATE pharmacy SET name = ?, minProd = ?, maxProd = ? WHERE id = ?",[name,minProd,maxProd,id], (err,result)=>{
        if(err) {
            console.error(err)   
        } 
        res.send(result)
    });
});

// Route to update a product
app.post('/api/updateProducts/:id',(req,res)=>{
    const id = req.params.id;
    const name = req.body.name;
    const total = req.body.total;
    const remaining = req.body.remaining;
    const pharmacy = req.body.pharmacy;

    db.query("UPDATE products SET name = ?, total = ?, remaining = ?, pharmacy = ? WHERE id = ?", [name, total, remaining, pharmacy, id], (err,result)=>{
        if(err) {
            console.error(err)   
        } 
        res.send(result)
    });    
});

// Route to delete a pharmacy
app.delete('/api/deletePharmacy/:id',(req,res)=>{
    const id = req.params.id;

    db.query("DELETE FROM pharmacy WHERE id= ?", id, (err,result)=>{
    if(err) {
    console.error(err)
    } 
    res.send(result)
})})

// Route to delete a pharmacy
app.delete('/api/deleteProducts/:id',(req,res)=>{
    const id = req.params.id;

    db.query("DELETE FROM products WHERE id= ?", id, (err,result)=>{
    if(err) {
        console.error(err)
    } 
    res.send(result)
})})


app.listen(PORT, ()=>{
    console.error(`Server is running on ${PORT}`)
})