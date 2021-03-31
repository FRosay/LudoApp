const MemberController = require("./member/member-controller.js");
const GameController = require("./game/game-controller.js");
const LoanController = require("./loan/loan-controller.js");
const mongoose = require('mongoose')
const express = require('express');
const morgan = require('morgan')
const bodyParser = require('body-parser');
const PORT = 5000;

const memberController = new MemberController()
const gameController = new GameController()
const loanController = new LoanController()

// Connection

mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);

const connectWithRetry = function () {
    return mongoose.connect("mongodb://localhost:27017/myapp", { useNewUrlParser: true })
        .then(() => {
            console.log("Connecting to database")
        })
        .catch((err) => {
            if (err) {
                console.error(err)
                setTimeout(connectWithRetry, 5000)
            }
        })
}

connectWithRetry()

const api = express();

api.use(morgan("common"));  
api.use(bodyParser.urlencoded({ extended: true }));
api.use(bodyParser.json())

api.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// Games

api.get('/games', async (_, res) => {
    const games = await gameController.getAll()
    res.json(games);
});

api.get('/games-available', async (_, res) => {
    const games = await gameController.getAvailable()
    res.json(games);
});

api.post('/game', async (req, res) => {
    try {
        await gameController.create(req.body.game)
        res.sendStatus(200);
    } catch(e) {
        res.send(e).status(500);
    }
});

api.post('/game/availability', async (req, res) => {
    try {
        await gameController.changeGameAvailability(req.body.gameId, req.body.newAvailability)
        res.sendStatus(200);
    } catch(e) {
        res.send(e).status(500);
    } 
});

api.delete('/game/delete/', async (req, res) => {
    try {
        await gameController.deleteOne(req.body.gameId)
        res.sendStatus(200);
    } catch(e) {
        res.send(e).status(500)
    }
});

api.delete('/games/delete/', async (req, res) => {
    try {
        await gameController.deleteAll()
        res.sendStatus(200);
    } catch(e) {
        res.send(e).status(500)
    }
});


// Members

api.get('/members', async (_, res) => {
    const members = await memberController.getAll()
    res.json(members);
});

api.get('/member/getlastnumber', async (_, res) => {
    const lastMember = await memberController.getLast()
    res.json(lastMember);
});

api.put('/member', async (req, res) => {
    try {
        await memberController.updateOrCreate(req.body.member)
        res.sendStatus(200);
    } catch(e) {
        res.send(e).status(500);
    }
});

api.delete('/member/delete/', async (req, res) => {
    try {
        await memberController.deleteOne(req.body.memberId)
        res.sendStatus(200);
    } catch(e) {
        res.send(e).status(500)
    }
});

api.delete('/members/delete/', async (req, res) => {
    try {
        await memberController.deleteAll()
        res.sendStatus(200);
    } catch(e) {
        res.send(e).status(500)
    }
});

// Loans

api.get('/loans', async (_, res) => {
    const loans = await loanController.getAll()
    res.json(loans);
});

api.get('/loan/getlast', async (_, res) => {
    const lastLoan = await loanController.getLast()
    res.json(lastLoan);
});

api.post('/loan', async (req, res) => {
    try {
        await loanController.create(req.body.loan)
        res.sendStatus(200);
    } catch(e) {
        res.send(e).status(500);
    }
});

api.delete('/loan/delete/', async (req, res) => {
    try {
        await loanController.deleteOne(req.body.loanId)
        res.sendStatus(200);
    } catch(e) {
        res.send(e).status(500)
    }
});

api.delete('/loans/delete/', async (req, res) => {
    try {
        await loanController.deleteAll()
        res.sendStatus(200);
    } catch(e) {
        res.send(e).status(500)
    }
});


// End of connection

let db = mongoose.connection
db.on("error", console.error.bind(console, "connection error:"))

api.listen(PORT, function () {
    console.log(`App listening on port ${PORT}!`)
})
