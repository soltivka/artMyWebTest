
import express from "express";
import {fileURLToPath} from "url";
import path, {dirname} from "path";

const app = express();
const port =  process.env.PORT || "3001";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname,'build')));

app.listen(port, "0.0.0.0", () => {
    console.log(`server starting at ${port}`);
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/build/index.html"));
});






