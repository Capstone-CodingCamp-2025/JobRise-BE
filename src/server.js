import express from "express";
import cors from "cors";
import env from "dotenv";
import authRoute from "./routes/authRoute";
import path from "path";
import profileRoute from "./routes/profileRoute";
import jobsRoute from "./routes/jobsRoute";
import applicationRoute from "./routes/applicationRoute";
import favoriteRoute from "./routes/favoriteRoute";
import cvRoute from "./routes/cvRoutes";

// configuration
const app = express();
env.config();
const PORT = process.env.PORT;

app.use(cors());
app.use(
  express.json({
    limit: "100mb",
  })
);

app.use(
  express.urlencoded({
    extended: "true",
  })
)

app.use(
  "/public",
  express.static(path.join(__dirname, "../public/imageProfile"))
)

app.use(
  "/public",
  express.static(path.join(__dirname, "../public/img_ProfileCompany"))
)


// routes
app.use(authRoute);
app.use(profileRoute);
app.use(jobsRoute);
app.use(applicationRoute);
app.use(favoriteRoute);
app.use(cvRoute);


app.listen(PORT, () => {
  console.log(`
    ===========================
    
    Server running on port ${PORT}
    
    ===========================
    `);
})