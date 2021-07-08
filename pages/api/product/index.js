/* eslint-disable import/no-anonymous-default-export */
import Products from '../../../models/productModel'
import connectDB from '../../../utils/connectDB'

connectDB()

export default async (req, res) => {
    switch(req.method){
        case "GET":
            await getProducts(req, res)
            break;
        case "POST":
            await createProduct(req, res)
            break;    
    }
}

const getProducts = async (req, res) => {
    try {
        const products = await Products.find()
        
        res.json({
            status: 'success',
            result: products.length,
            products
        })
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}


const createProduct = async (req, res) => {
    try {
        const {title, price, inStock, description, content, category, images} = req.body

        if(!title || !price || !inStock || !description || !content  === 'all' || images.length === 0)
        return res.status(400).json({err: 'Please add all the fields.'})


        const newProduct = new Products({
            title: title.toLowerCase(), price, inStock, description, content, category, images
        })

        await newProduct.save()

        res.json({msg: 'Success! Created a new product'})

    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}