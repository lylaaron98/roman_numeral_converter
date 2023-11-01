const express = require("express");
const cors = require("cors"); // import the cors package for requests from different origins
const app = express();
const port = 5001; // Change the port to 5001 or any other available port

app.use(cors());

const romanNumerals = require("roman-numerals");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Roman to Arabic Converter API");
});

// Conversion logic
app.get("/convert", (req, res) => {
  const romanNumeral = req.query.romanNumeral;
  if (!romanNumeral) {
    return res.status(400).json({ error: "Roman numeral not provided" });
  }

  try {
    const arabicNumber = romanNumerals.toArabic(romanNumeral);
    res.json({ arabicNumber });
  } catch (error) {
    res.status(400).json({ error: "Invalid Roman numeral provided" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
