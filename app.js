import cors from "cors";
import express from "express";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use("/albums", albumRouter);
app.use("artists", artistRouter);
app.use("tracks", trackRouter);

const port = process.env.PORT || 3000;

// GET routing ----------------------------------------------------------------------------------------------------------------------------------
app.get("/", (req, res) => {
  res.send("Node Express Music Base");
});

// Listeners ----------------------------------------------------------------------------------------------------------------------------------
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port} `);
});