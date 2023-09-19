import cors from "cors";
import express from "express";
import connection from "./database.js";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

const port = process.env.PORT || 3000;

// GET routing ----------------------------------------------------------------------------------------------------------------------------------
app.get("/", (req, res) => {
  res.send("Node Express Music Base");
});

// Tables




// GET single records from table





// POST routing --------------------------------------------------------------------------------------------------------------------------------





// PUT routing --------------------------------------------------------------------------------------------------------------------------------



// DELETE routing -----------------------------------------------------------------------------------------------------------------------------



// Listeners ----------------------------------------------------------------------------------------------------------------------------------
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port} `);
});
