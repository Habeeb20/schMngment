// const express = require("express")
// const cors = require("cors")
// const mongoose = require("mongoose")
// const dotenv = require("dotenv")
// // const bodyParser = require("body-parser")
// const app = express()
// const Routes = require("./routes/route.js")
// const path = require('path')

// const __dirname = path.resolve()
// const PORT = process.env.PORT || 5000

// dotenv.config();

// // app.use(bodyParser.json({ limit: '10mb', extended: true }))
// // app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))

// app.use(express.json({ limit: '10mb' }))
// app.use(cors())

// mongoose
//     .connect(process.env.MONGO_URL, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     })
//     .then(console.log("Connected to MongoDB"))
//     .catch((err) => console.log("NOT CONNECTED TO NETWORK", err))

// app.use('/', Routes);

// app.listen(PORT, () => {
//     console.log(`Server started at port no. ${PORT}`)
// })

// app.use(express.static(path.join(__dirname, '/frontend/build')))


// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'))
// })

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require('path');

const app = express();
const Routes = require("./routes/route.js");

dotenv.config();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(cors());

// MongoDB connection
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("NOT CONNECTED TO NETWORK", err));

// Routes
app.use('/', Routes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client', 'build')));

// Catch-all handler to serve the React app for any route
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server started at port no. ${PORT}`);
});
