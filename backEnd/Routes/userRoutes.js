const express = require("express");
const{
    displayAllUsers,
    addUser,
    displayByEmail,
    deleteUser,
    updateUser
} = require('../Controller/userController');
const router = express.Router();

router.get('/data/paginate',displayAllUsers);

router.post('/user',addUser);
router.get('/:email',displayByEmail);
router.delete('/:id',deleteUser);
router.patch('/:id',updateUser);
module.exports = router;
