const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("config");

const User = require("../../models/User");

const { check, validationResult } = require("express-validator");

const auth = require('../../middleware/auth')


// @route  GET api/auth
//@desc Test Route
//@access Public

router.get('/', auth, async (req, res) =>{
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error');      
    }
})



// @route  POST api/auth
//@desc    Login/authenticate User
//@access Public

router.post(
    "/",
    [
      check("email", "Please include valid email").isEmail(),
      check(
        "password",
        "password is required"
      ).exists(),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { email, password } = req.body;
  
      try {
        // User exists ?
        let user = await User.findOne({ email });
  
        if (!user) {
          return res
            .status(400)
            .json({ errors: [{ msg: "Invalid Credentials" }] });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if( !isMatch) {
            return res
            .status(400)
            .json({ errors: [{ msg: "Invalid Credentials" }] });
        }
      
        const payload = {
          user: {
            id: user.id,
          },
        };
  
        jwt.sign(
          payload,
          config.get("jwttoken"),
          { expiresIn: 360000 },
          (err, token) => {
            if (err) throw err;
            res.json({ token });
          }
        );
      } catch (error) {
        console.log(error.message);
        res.status(400).send("Server Error");
      }
    }
  );

module.exports = router;