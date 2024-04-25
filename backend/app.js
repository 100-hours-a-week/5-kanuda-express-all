const express = require("express");
const backendRoutes = require("./routes/backendRoutes"); 
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(backendRoutes);

app.listen(port, () => {
    console.log(`Community app listening on port ${port}`);
});

