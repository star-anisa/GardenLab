const express = require('express');
const router = express.Router();
const User = require('../models/User'); 

require('dotenv').config();


router.get('/', (req, res) => {
    res.render('createaccount'); // Show the create account page
});

  

router.post('/', async (req, res) => {
  const { username, email, password } = req.body;
  
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).send('User already exists');
    }



    // creates new user
    user = new User({
      username,
      email,
      password: password
    });

    await user.save();

    const payload = {
      user: {
        id: user.id
      }
    };

   

    // Response
   // res.status(201).json({ token }); // Send token back to client(testing)
   res.redirect('/account');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
