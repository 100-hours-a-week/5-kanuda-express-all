const express = require("express");
const backendRoutes = require("./routes/backendRoutes"); 

const app = express();
const port = 3001;

app.use(backendRoutes);

app.listen(port, () => {
    console.log(`Community app listening on port ${port}`);
});

