const express = require('express');

const router = express.Router();
const auth = require('../../middleware/auth');

const Profile = require('../../models/Profile');
const User = require('../../models/User');


// @route  GET api/profile/me
//@desc   Get current user
//@access Public

router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', [
            'name',
            'avatar'
        ]);

        if (!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' });
        }
    } catch (error) {
        console.log(error.message);
        return res.status(400).send('Server Error');
    }
    res.json(profile);


});

module.exports = router;