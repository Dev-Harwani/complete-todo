const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const secretKey = "PasSWordProt3ctor";
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require('body-parser');
app.use(express.json());
app.use(cors());


const userSchema = new mongoose.Schema({
    username: String,
    password: String,
})

const todoSchema = new mongoose.Schema({
    title: String,
    description: String,
    createdBy: String,
    number: Number
});


const Todo = mongoose.model("Todo", todoSchema);
const User = mongoose.model("User", userSchema);

const verifyUser = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                res.status(404).send("authentication failed");
            } else {
                req.user = user;
                next();
            }
        })
    }
}

mongoose.connect("mongodb+srv://harwanidev:pwdispwd@cluster0.1xhcqfs.mongodb.net/");

app.get("/me", verifyUser, (req, res) => {
    res.json({
        username: req.user.username
    })
})

app.post("/signup", async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });

    if (user) {
        res.status(404).send("user already exists");
    } else {
        const newUser = new User({ username: username, password: password });
        await newUser.save();

        const token = jwt.sign({ username: username }, secretKey, { expiresIn: '1h' });
        res.status(200).json({ message: "signed up successfully", token });
    }
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
        const token = jwt.sign({ username: username }, secretKey, { expiresIn: '1h' });
        res.json({ message: 'Logged in successfully', token });
    } else {
        res.status(403).json({ message: 'Invalid username or password' });
    }
});

app.get("/todos", verifyUser, async (req, res) => {
    const todos = await Todo.find({ createdBy: req.user.username });
    res.status(200).json(todos);

});

app.get("/todos/:number", verifyUser, async (req,res) => {
    const number = parseInt(req.params.number);
    if (number){
        const todo = await Todo.findOne({number: number});
        res.status(200).json(todo);
    }
})

app.post("/todos", verifyUser, async (req, res) => {
    let totalTodos;
    const latestTodo = await Todo.findOne({}).sort({number: -1});

    if (latestTodo){
        totalTodos = latestTodo.number;
    }
    else{
        totalTodos = 0;
    }
    totalTodos++;

    const { title, description } = req.body;
    const newTodo = new Todo({
        title: title,
        description: description,
        createdBy: req.user.username,
        number: totalTodos
    });
    await newTodo.save();
    res.status(200).json({ message: "todo added successfully", number: totalTodos });
});

app.put("/todos/:number", verifyUser, async(req,res) => {
    const verifiedTodo = await Todo.findOne({number: parseInt(req.params.number)});

    if (verifiedTodo){
        const {updatedTitle, updatedDescription} = req.body;
        await Todo.updateOne({number: parseInt(req.params.number)}, {$set: {title: updatedTitle, description: updatedDescription}});
        res.status(200).json({message: "todo updated"});

    }

})

app.delete("/todos/:number", verifyUser, async(req,res) => {
    const number = parseInt(req.params.number);
    if (number){
        await Todo.deleteOne({number: number});
        const todos = await Todo.find({ createdBy: req.user.username });
        res.status(200).json({message: "todo deleted", todos})
    }


})

app.listen(3000, () => {
    console.log("listening");
})
