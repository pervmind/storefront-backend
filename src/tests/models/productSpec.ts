import {Product, ProductStore} from "../../models/product"
import database from "../../database"
const testStore = new ProductStore()


describe('Product model', () => {
    beforeEach(async () => {
        const connection = await database.connect();
        const sql = 'DELETE FROM orders';
        const sql2 = 'DELETE FROM users';
        const sql3 = 'DELETE FROM products';
        await connection.query(sql)
        await connection.query(sql2)
        await connection.query(sql3)
        connection.release();
    })
    it('should have index method', ()=>{
        expect(testStore.index).toBeDefined()
    })

    it('index method should return products list', async ()=>{
        const products = await testStore.index()
        expect(products).toEqual([])
    })
    it ('should have show method', ()=>{
        expect(testStore.show).toBeDefined()
    })
    it ('show method should not return a product', async ()=>{
        const product = await testStore.show(1);
        expect(product).toBeUndefined()
    })
    it ('should have create method', ()=>{
        expect(testStore.index).toBeDefined()
    })
    it ('create method should return a correct product name', async ()=>{
        const newProduct: Product = {
            id: 1,
            name: "milk",
            price: 10
        }
        const product = await testStore.create(newProduct);
        expect(product.name).toEqual(newProduct.name)
    })
})
