const express = require('express');
const mongoose = require('mongoose');
const productsModel = require('./models/productsModel');
const path = require('path');  // Add this for serving HTML
const app = express();

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));  // Serve HTML files

app.get('/products', async (req, res) => {
    try {
        const getproducts = await productsModel.find({});
        res.json(getproducts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route for fetching a single product
app.get('/products/:id', async (req, res) => {
    try {
        const getproduct = await productsModel.findById(req.params.id);
        if (getproduct) {
            res.json(getproduct);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route for deleting a product
app.delete('/products/:id', async (req, res) => {
    try {
        const delproduct = await productsModel.findByIdAndDelete(req.params.id);
        if (delproduct) {
            res.json(delproduct);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route for updating a product
app.put('/products/:id', async (req, res) => {
    try {
        const updateproduct = await productsModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (updateproduct) {
            res.json(updateproduct);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route for adding a new product
app.post('/products', async (req, res) => {
    try {
        const addproduct = await productsModel.create(req.body);
        res.status(201).json(addproduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

mongoose.connect('mongodb+srv://dp046973:dp046973@backendcluster.i52he.mongodb.net/')
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(port, () => {
            console.log(`http://localhost:${port}`);
        });
    })
    .catch(error => console.log(error));
