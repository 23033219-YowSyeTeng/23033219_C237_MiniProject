const express = require('express');
const mysql = require('mysql2');
const multer = require('multer');
const app = express();

//Create MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'c237_ca2_b&h'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');

});

//Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null,'public/images');//Directory to save uploaded files
    },
    filename: (req,file,cb) => {
        cb(null,file.originalname);
    }
});

const upload = multer({storage: storage}); //Create multer object

//Set up view engine
app.set('view engine', 'ejs');
//enable static files
app.use(express.static('public'));
//enable form processing
app.use(express.urlencoded({
    extended:false
}));

//Define product routes
app.get('/', (req, res) => {
    connection.query('SELECT * FROM products', (error, results) => {
        if (error) throw error;
        res.render('index', { products: results }); // Render HTML page with data
    });
});


app.get('/product/:id', (req, res) => {
    //Extract the product ID from the request paramaters
    const productId = req.params.id;
    const sql = 'SELECT * FROM products WHERE id = ?';
    //Fetch data from MySQL based on the product ID
    connection.query(sql, [productId], (error, results) => {
        if (error) {
            console.error('Database query error: ', error.message);
            return res.status(500).send('Error Retrieving product by ID');
        }
        //CHECK if any product with the given ID was found
        if (results.length > 0) {
            //Render HTML page with the product data
            res.render('product', { product: results[0] });
        } else {
            //If no product with the given ID was found, render a 404 page or handle it accordingly
            res.status(404).send('Product not found');
        }
    });
});


// Route to display the add product form
app.get('/addProduct', (req, res) => {
    res.render('addProduct');
});



// Route to handle adding a new product
app.post('/addProduct', upload.single('image'), (req, res) => {
    const { productName, description, category, brand, price, quantity } = req.body;
    let image = null;
    if (req.file) {
        image = req.file.filename; // Save only the filename
    }
    // Insert the product into the database
    const sql = 'INSERT INTO products (productName, description, category, brand, price, quantity, image) VALUES (?, ?, ?, ?, ?, ?, ?)';
    connection.query(sql, [productName, description, category, brand, price, quantity, image], (error, results) => {
        if (error) {
            // Handle any error that occurs during the database operation
            console.error('Error adding product:', error);
            return res.status(500).send('Error adding product');
        }
        // Log the results for debugging
        console.log('Product added successfully:', results);
        // Redirect to the home page or product list page
        res.redirect('/');
    });
});




//Define edit product routes
app.get('/editProduct/:id', (req, res) => {
    const productId = req.params.id;
    const sql = 'SELECT * FROM products WHERE id = ?';
    connection.query(sql, [productId], (error, results) => {
        if (error) {
            console.error('Database query error:', error.message);
            return res.status(500).send('Error retrieving product by ID');
        }
        if (results.length > 0) {
            res.render('editProduct', { product: results[0] });
        } else {
            res.status(404).send('Product not found');
        }
    });
});


app.post('/editProduct/:id', upload.single('image'), (req, res) => {
    const productId = req.params.id;
    const { productName, description, category, brand, price, quantity, currentImage } = req.body;

    let image = currentImage;
    if (req.file) {
        image = req.file.filename;
    }
    const sql = 'UPDATE products SET productName = ?, description = ?, category = ?, brand = ?, price = ?, quantity = ?, image = ? WHERE id = ?';
    connection.query(sql, [productName, description, category, brand, price, quantity, image, productId], (error, results) => {
        if (error) {
            console.error('Error updating product:', error);
            return res.status(500).send('Error updating product');
        }
        res.redirect('/');
    });
});


//Define search routes
app.get('/search', (req, res) => {
    const searchTerm = req.query.q; // Retrieve search term from query parameter
    if (!searchTerm) {
        // If no search term provided, render the search form with no results initially
        res.render('search', { products: [], searchTerm: '', searched: false });
    } else {
        // Perform the database query to search for products
        const query = `SELECT * FROM products WHERE productName LIKE '%${searchTerm}%'`;
        connection.query(query, (err, results) => {
            if (err) {
                console.error('Error executing MySQL query: ' + err.stack);
                res.status(500).send('Error searching products');
                return;
            }
            // Render the search form with results and search term
            res.render('search', { products: results, searchTerm: searchTerm, searched: true });
        });
    }
});

// Route to handle deleting a product
app.get('/deleteProduct/:id', (req, res) => {
    const productId = req.params.id;

    const query = `DELETE FROM products WHERE id = ?`;

    connection.query(query, [productId], (err, result) => {
        if (err) {
            console.error('Error deleting product:', err);
            res.status(500).send('Error deleting product');
            return;
        } else {
        console.log('Product deleted successfully');
        res.redirect('/');} // Redirect to the products page after successful deletion
    });
});


app.get('/contact', (req, res) => {
    res.render('contactus');
});


app.get('/editProfile/:id', (req, res) => {
    // Assuming there's only one profile to edit, fetch it from the database
    const sql = 'SELECT * FROM profile where profileId = 1';

    connection.query(sql, (error, results) => {
        if (error) {
            console.error('Error fetching profile:', error);
            return res.status(500).send('Error fetching profile');
        }

        if (results.length === 0) {
            return res.status(404).send('Profile not found');
        }

        const profile = results[0];
        res.render('editProfile', { profile });
    });
});


app.post('/editProfile/:id', upload.single('profileImage'), (req, res) => {
    const profileId = req.params.id;
    const { firstName, lastName, gender, birthday, address, currentImage } = req.body;
    let profileImage = currentImage;

    if (req.file) {
        profileImage = req.file.filename;
    }

    const sql = 'UPDATE profile SET firstName = ?, lastName = ?, gender = ?, birthday = ?, address = ?, profileImage = ? WHERE profileId = ?';
    connection.query(sql, [firstName, lastName, gender, birthday, address, profileImage, profileId], (error, results) => {
        if (error) {
            console.error('Error updating profile:', error.message); // Log detailed error message
            return res.status(500).send('Error updating profile'); // Send generic error response
        }
        console.log('Profile updated successfully:', results);
        res.redirect('/profile'); // Redirect to the profile view after update
    });
});



app.get('/profile', (req, res) => {
    const profileId = req.params.profileId;
    const sql = 'SELECT * FROM profile WHERE profileId = 1';

    connection.query(sql, [profileId], (error, results) => {
        if (error) {
            console.error('Error fetching profile:', error);
            return res.status(500).send('Error fetching profile');
        }

        if (results.length === 0) {
            return res.status(404).send('Profile not found');
        }

        const profile = results[0];
        res.render('profile', { profile });
    });
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));