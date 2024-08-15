import express from 'express';
const router = express.Router();
import { v4 as uuidv4 } from 'uuid';

// Mock database
let users = [
    {
        fname: 'sarath',
        lname: 'kumar',
        email: '1@gmail.com',
        id: '1',
    },
    {
        fname: 'dharani',
        lname: 'p',
        email: '2@gmail.com',
        id: '2',
    },
];

// Getting the list from the db
router.get('/', (req, res) => {
    res.send(users);
});

// Adding a new user
router.post('/', (req, res) => {
    const user = req.body;
    users.push({ ...user, id: uuidv4() });
    res.send(`${user.fname} has been added to the database`);
});

// Get an existing user by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const foundUser = users.find((user) => user.id === id);
    if (foundUser) {
        res.send(foundUser);
    } else {
        res.status(404).send('User not found');
    }
});

// Deleting a user
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    users = users.filter((user) => user.id !== id);
    res.send(`${id} deleted successfully from database`);
});

// Updating a user
router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const { fname, lname, email } = req.body;

    const user = users.find((user) => user.id === id);

    if (user) {
        if (fname) user.fname = fname;
        if (lname) user.lname = lname;
        if (email) user.email = email;

        res.send(`User with the ID ${id} has been updated`);
    } else {
        res.status(404).send('User not found');
    }
});

export default router;
