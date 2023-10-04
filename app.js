let products = [
    { id: 1, name: 'iPhone', price: 1099.99 },
    { id: 2, name: 'Samsung Galaxy S21', price: 999.99 },
    { id: 3, name: 'Sony PlayStation 5', price: 499.99 },
    { id: 4, name: 'MacBook Pro 16', price: 2399.99 },
    { id: 5, name: 'DJI Mavic Air 2', price: 799.99 },
    { id: 6, name: 'iPhone', price: 500},
  ];

const express = require('express');
const app = express();

const PORT = 3000 ;

app.use(express.json());

app.get('/products', ( req , res , next)=> {
    res.send(products);
});

app.get('/products/:id' , ( req , res , next) => {
    const id = parseInt(req.params.id);
    const Unique = products.find((x) => x.id === id );
    if(Unique){
        res.status(200).send(Unique);
    }else{
        res.status(404).send("Product majach l dar");
    }
});
    app.get('/products/p/search', (req, res) => {
        const {q , maxPrice , minPrice} = req.query ;
        const searchItems = products.filter((x)=> (x.name.toLowerCase().includes(q.toLowerCase())&&(x.price >= minPrice && x.price <= maxPrice)));
        res.send(searchItems);
    });

    app.post('/products',(req , res) => {
        const { name , price} = req.body ;
        if(!req.body){
            res.status(404).send('This is an error in the body');
        }
        else{
        const newProduct = { id: products.length + 1, name , price};
        products.push(newProduct);
        res.status(201).send(newProduct);}
    });

    app.put('/products/:id' ,(req , res) => {
        const IdProduct = parseInt(req.params.id);
        const updatedProductData = req.body;
        const IndexOfProduct = products.findIndex((x) => x.id === IdProduct);
        if(IndexOfProduct === -1){
            res.status(404).send('there is nothing to update');
        }else{
            products[IndexOfProduct] = { IdProduct , ...updatedProductData };
            res.status(201).send(products[IndexOfProduct]);
        }
    });

    app.delete('/products/:id',(req , res) => {
        const ProductId = parseInt(req.params.id) ;
        const IndexOfProduct = products.findIndex((x) => x.id === ProductId);
        if(IndexOfProduct === -1){
            res.status(404).send('there is nothing to delete');
        }else{
            const DeleteProduct = products.splice(IndexOfProduct , 1);
            res.status(201).send('item Deleted');
        }
        
    });

    app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });