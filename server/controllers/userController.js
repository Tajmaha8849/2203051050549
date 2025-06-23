import user from "../models/userModel.js";
import ShortUrl from "../models/shortUrl.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET; 

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const already = await user.findOne({ email });
    if (already) {
      return res.status(409).json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new user({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    return res.status(201).json({ message: "User created successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};



const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await user.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign({ userId: existingUser._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};



const createShortUrl = async (req, res) => {
  try {
    const { url, validity = 30, shortcode } = req.body;
    const userId = req.userId;

    if (!url) {
      return res.status(400).json({ message: "Original URL is required." });
    }

    const userUrlCount = await ShortUrl.countDocuments({ userId });
    if (userUrlCount >= 5) {
      return res.status(403).json({ message: "You can only create up to 5 short URLs." });
    }

    const shortCode = shortcode || Math.random().toString(36).substr(2, 5);

    const existing = await ShortUrl.findOne({ shortCode });
    if (existing) {
      return res.status(409).json({ message: "Shortcode already exists." });
    }

    const expiry = new Date(Date.now() + validity * 60000); // validity in minutes

    const newShort = new ShortUrl({
      originalUrl: url,
      shortCode,
      expiry,
      userId,
    });

    const saved = await newShort.save();

    return res.status(201).json({
      message: "Short URL created successfully",
      data: {
        originalUrl: saved.originalUrl,
        shortLink: `http://localhost:8000/${saved.shortCode}`,
        expiry: saved.expiry,
        shortCode: saved.shortCode,
        userId: saved.userId,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};



export const redirectToOriginal = async (req, res) => {
  try {
    const { shortCode } = req.params;

    const found = await ShortUrl.findOne({ shortCode });

    if (!found) {
      return res.status(404).json({ message: "Short URL not found" });
    }

    // Check expiry
    if (new Date() > found.expiry) {
      return res.status(410).json({ message: "Short URL has expired" });
    }

    // Optional: Track click info (IP, timestamp)
    found.clicks.push({
      timestamp: new Date(),
      referrer: req.get("Referer") || "",
      ip: req.ip
    });

    await found.save();

    return res.redirect(found.originalUrl);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getUserUrls = async (req, res) =>{
    
}
export { register, login, createShortUrl };
