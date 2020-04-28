import connectDb from "../../utils/connectDb";
import User from "../../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import isEmail from 'validator/lib/isLength'
import isLength from 'validator/lib/isLength'

connectDb();

export default async (req, res) => {
  const { name, email, password } = req.body;
  try {
    //0 Validate forms
    if(!isLength(name, {min: 4, max: 12})){
      return res.status(422).send("The name must be between 4 - 10 letters")
    }
    else if(!isLength(password, {min: 8})){
      return res.status(422).send("The password must be atleast 8 characters")
    } else if(!isEmail(email)){
      return res.status(422).send("Please provide a valid email address")
    }

    // 1) Check to see if the user already exists in the db
    const user = await User.findOne({ email });
    if (user) {
      return res.status(422).send(`User already exists with email ${email}`);
    }
    // 2) --if not, hash their password
    const hash = await bcrypt.hash(password, 10);
    // 3) create user
    const newUser = await new User({
      name,
      email,
      password: hash
    }).save();
    console.log({ newUser });
    // 4) create token for the new user
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });
    // 5) send back token
    res.status(201).json(token);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error signing up user. Please try again later");
  }
};