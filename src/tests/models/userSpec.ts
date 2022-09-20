import {User, UserStore} from "../../models/user"
import database from "../../database"
const testStore = new UserStore()


describe('User model', () => {
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

    it('index method should return users list', async ()=>{
        const users = await testStore.index()
        expect(users).toEqual([])
    })
    it ('should have show method', ()=>{
        expect(testStore.show).toBeDefined()
    })
    it ('show method should not return a user', async ()=>{
        const user = await testStore.show(1);
        expect(user).toBeUndefined()
    })
    it ('should have create method', ()=>{
        expect(testStore.index).toBeDefined()
    })
    it ('create method should return a correct username', async ()=>{
        const newUser: User = {
            id: 1,
            username: "testusername",
            firstName: "testfirstname",
            lastName: "testlastname",
            password: "password"
        }
        const user = await testStore.create(newUser);
        expect(user.username).toEqual(newUser.username)
    })
    it ('should have auth metho', ()=>{
        expect(testStore.auth).toBeDefined()
    })
    it ('auth method should return user',async ()=>{
        const auth = await testStore.auth("username","user.password")
        console.log(auth)
        expect(auth).toBeNull()
    })
})
