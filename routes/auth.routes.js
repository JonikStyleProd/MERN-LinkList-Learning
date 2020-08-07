const {Router} = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router()


// /api/auth/register
router.post(
    '/register',
  // that is an array that does validation with function from express-validator
    [
      check('email', 'Wrong Email').isEmail(),
      check('password', 'Minimum password length 6 characters')
          .isLength({ min: 6 })
    ],
    async (req, res) => {
      try {
      //express-validator validates incoming fields
        const errors = validationResult(req)

      //checking if we have some errors doing that =>
        if (!errors.isEmpty()) {
          return res.status(400).json({
            errors: errors.array(),
            message: 'Incorrect registration data'
          })
        }

        const {email, password} = req.body

      //waiting for DB - he checks if there is such an email or not
        const candidate = await User.findOne({ email })

        // If found this email then do it =>
      if (candidate) {
        return res.status(400).json({ message: 'This user already exists' })
        }

        // async Password hashing with salt 12
        const hashedPassword = await bcrypt.hash(password, 12)

      //Creating new User - we receive email  and password(hashedPassword)
        const user = new User({ email, password: hashedPassword })

      // Waiting for user save
        await user.save()
      //when the User saved =>
        res.status(201).json({ message: 'The User was created' })
    } catch (e) {
      res.status(500).json({ message: "Error - Something went wrong..." });
    }
  }
);

// /api/auth/login
router.post(
  "/login",
  [
    //[.normalizeEmail()] Normalizes the email address by removing unwanted characters from it.
    check("email", "Invalid Email...").normalizeEmail().isEmail(),
    check("password", "Enter your password...").exists(),
  ],
  async (req, res) => {
    try {
      //express-validator validates incoming fields
      const errors = validationResult(req);

      //checking if we have some errors doing that =>
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect login data...",
        });
      }
      //tacking from req.body at email and password
      const { email, password } = req.body;

      //seaching for user by email and and Writing this user to [const user ]
      const [user] = await Promise.all([User.findOne({email})]);

      //if we dont have that user we must to get error [Its a BASIC CHECK]
      if (!user) {
        return res.status(400).json({ message: "User will note find..." });
      }

      //checking the  password - comparison of encrypted passwords
      const isMatch = await bcrypt.compare(password, user.password);

      //if we have a wrong password we doing that =>
      if (!isMatch) {
        return res.status(400).json({ message: "Wrong password.Try again..." });
      }
      // Token responsible for authorization
      const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
        expiresIn: "1h"
      });

      res.json({ token, userId: user.id });
    } catch (e) {
      res.status(500).json({ message: "Error - Something went wrong..." });
    }
  }
);

module.exports = router;
