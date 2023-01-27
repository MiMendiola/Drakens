// import express to use it in our project. npm install express and npm install cors(library special for express)
const express = require('express')
const cors = require('cors')

// Creating an app with express js 
const app = express()

app.use(express.static('public '))
app.use(cors())
app.use(express.json()) // access to packages json

const players = []

class Player{
    constructor(id) {
        this.id = id
    }

    asignDraken(draken) {
        this.draken = draken
    }

    reloadPosition(x, y) {
        this.x = x,
        this.y = y
    }
}

class Draken{
    constructor(name) {
        this.name = name
    }
}

// When express received a request it response hello
app.get("/join", (req, res) => {
    // Generate an id for the player and we controll the id as a string with ``
    const id = `${Math.random()}`

    const player = new Player(id)
    players.push(player)

    // Stablished the configuration and what kind of conexion it accepts
    res.setHeader("Access-Control-Allow-Origin", '*')

    res.send(id)
})

app.post("/drakens/:playerId", (req, res) => {
    const playerId = req.params.playerId  || ""
    const name = req.body.drakenName || ""
    const draken = new Draken(name)
    const playerIndex = players.findIndex((player) => playerId === player.id) // check that the player is created in the players array

    if(playerIndex >= 0) {
        players[playerIndex].asignDraken(draken)
    }
    
    console.log(players);
    console.log(playerId);

    res.end()
})

app.post("/drakens/:playerId/position", (req, res) => {
    const playerId = req.params.playerId  || ""
    const x = req.body.x || 0
    const y = req.body.y || 0
    
    const playerIndex = players.findIndex((player) => playerId === player.id) // check that the player is created in the players array
    
    players[playerIndex].reloadPosition(x, y)

    const enemies = players.filter((player) => playerId !== player.id) // we filter the players array to find the player selected

    // in express we only can send json's files
    res.send({
        enemies
    })
})

app.get("/drakens/:playerId/attacks", (req, res) =>{
    const playerId = req.params.playerId  || ""
    const player = players.find((player) => playerId === player.id)
    res.send({
        attacks: player.attacks || ""
    })
})

// The port where we are going to listen the request of the clients
app.listen(8080, () => {
    console.log("Server start")
})