import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
 
dotenv.config();
 
const app = express();
app.use(cors());
app.use(express.json());
 
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
 
app.post("/ask", async (req, res) => {
  try {
    const { question } = req.body;
 
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });
 
    const result = await model.generateContent(question);
    const response = await result.response;
    const text = response.text();
 
    res.json({
      question,
      answer: text,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});
 
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
 