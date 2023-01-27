// Welcome to the code JS of Mokepon

// VARIABLES -------------------------------------
// Multiplayer
let playerId = null
let enemyId = null

// Attaks
let playerAttack
let enemyAttack

// Inputs
let inputWarmheart
let inputSedgelam
let inputVenstino

// Draken
let drakenOption
let attacksOptions
let playerDrake
let playerDrakeObj

// Lifes
let playerLifes = 3;
let enemyLifes = 3;

// Buttons
let buttons
let btnBasicAttack
let btnSecondAttack
let btnDefinitive

// Array of drakens
let drakens = []
let enemyDrakens = []

// Map
const viewMapSection = document.getElementById('view-map')
const map = document.getElementById('map')

let canva = map.getContext("2d")
let interval
let mapBg = new Image()
mapBg.src = '/public/assets/img/bgrounds/bground_map.jpg'
let heightSearched
let mapWidth = window.innerWidth - 20
const maxMapWidth = 600

if(mapWidth > maxMapWidth) {
    mapWidth = maxMapWidth - 20
}

heightSearched = mapWidth * 600/800

map.width = mapWidth
map.height = heightSearched

// GETTERS -------------------------------------
// Body
const bodyImg = document.getElementById('main')

// Buttons
const btnPlayerDrake = document.getElementById('btnDrake');
const btnRestart = document.getElementById('btnRestart');

// Sections
const sectionAttackSelection = document.getElementById('select-attack')
const sectionDrakeSelection = document.getElementById('select-drake')
const messageSection = document.getElementById('message')
const cardsContentSection = document.getElementById('cards')
const attacksTypeSection = document.getElementById('attacksType')

// Groups
const btnDrakeBG = document.getElementsByName('drake');

// Draken name section
const spanPlayerDrake = document.getElementById('player-drake-name');
const spanEnemyDrake = document.getElementById('enemy-drake-name');

// Lifes
const spanPlayerLifes = document.getElementById('player-lifes'); 
const spanEnemyLifes = document.getElementById('enemy-lifes');

// Multiplayer
joinGame()

// CLASSES -------------------------------------
class Draken {
    constructor(name, img, life, imgMap, id = null) {
        this.id - id
        this.name = name
        this.img = img
        this.life = life
        this.attacks = []
        this.width = 30
        this.height = 30
        this.x = random(0, map.width - this.width)
        this.y = random(0, map.height - this.height)
        this.mapImg = new Image()
        this.mapImg.src = imgMap
        this.speedX = 0
        this.speedY = 0
    }

    drawDraken() {
        canva.drawImage(
            this.mapImg,
            this.x,
            this.y,
            this.width,
            this.height
        )
    }
}

let warmheart = new Draken("Warmheart", "/public/assets/img/drakens/fire_draken.jpg", 90, "/public/assets/img/drakens/fire_draken.jpg");
let sedgelam = new Draken("Sedgelam", "/public/assets/img/drakens/water_draken.jpg", 100, "/public/assets/img/drakens/water_draken.jpg");
let venstino = new Draken("Venstino", "/public/assets/img/drakens/plant_draken.jpg", 120, "/public/assets/img/drakens/plant_draken.jpg");








// let warmheartEnemy = new Draken("Warmheart", "/public/assets/img/drakens/fire_draken.jpg", 90, "/public/assets/img/drakens/fire_draken.jpg", 95, 140);
// let sedgelamEnemy = new Draken("Sedgelam", "/public/assets/img/drakens/water_draken.jpg", 100, "/public/assets/img/drakens/water_draken.jpg", 225, 180);
// let venstinoEnemy = new Draken("Venstino", "/public/assets/img/drakens/plant_draken.jpg", 120, "/public/assets/img/drakens/plant_draken.jpg", 115, 20);

warmheart.attacks.push(
    { 
        name: 'FIRE', 
        id: 'btnBasicAttack',
    },
    { 
        name: 'WATER', 
        id: 'btnSecondAttack',
    },
    { 
        name: 'PLANT', 
        id: 'btnDefinitive',
    },
    // { 
    //     name: 'PLANT', 
    //     id: 'btnDodge',
    // },
)
sedgelam.attacks.push(
    { 
        name: 'FIRE', 
        id: 'btnBasicAttack',
    },
    { 
        name: 'WATER', 
        id: 'btnSecondAttack',
    },
    { 
        name: 'PLANT', 
        id: 'btnDefinitive',
    },
    // { 
    //     name: 'PLANT', 
    //     id: 'btnDodge',
    // },
)
venstino.attacks.push(
    { 
        name: 'FIRE', 
        id: 'btnBasicAttack',
    },
    { 
        name: 'WATER', 
        id: 'btnSecondAttack',
    },
    { 
        name: 'PLANT', 
        id: 'btnDefinitive',
    },
    // { 
    //     name: 'PLANT', 
    //     id: 'btnDodge',
    // },
)

drakens.push(warmheart,sedgelam,venstino)

// EVENTS -------------------------------------
// Create the card for each draken
drakens.forEach((draken) => {
    drakenOption = `
        <input type="radio" name="drake" id="${draken.name}" />
        <label class="drake-card" for="${draken.name}">
            <img src="${draken.img}" alt="${draken.name}">
        </label>
    `
    cardsContentSection.innerHTML += drakenOption

    inputWarmheart = document.getElementById('Warmheart');
    inputSedgelam = document.getElementById('Sedgelam');
    inputVenstino = document.getElementById('Venstino');
})

// Change background 
btnDrakeBG.forEach((element) => {
    // Add an eventListener for each input
    element.addEventListener('click', () => { 
        if (element.id == 'Warmheart') {
            bodyImg.style.backgroundImage = "url('/public/assets/img/bgrounds/bground_fire.jpg')";
            btnPlayerDrake.innerText = 'WARMHEART'
        } else if (element.id == 'Sedgelam') {
            bodyImg.style.backgroundImage = "url('/public/assets/img/bgrounds/bground_water.jpg')";
            btnPlayerDrake.innerText = 'SEDGELAM'
        } else if (element.id == 'Venstino') {
            bodyImg.style.backgroundImage = "url('/public/assets/img/bgrounds/bground_plant.jpg')";
            btnPlayerDrake.innerText = 'VENSTINO'
        } else {
            bodyImg.style.backgroundImage = "url('/public/assets/img/bgrounds/bground_main.jpg')";
        }
        btnPlayerDrake.disabled = false
    });
});

// Buttons
btnPlayerDrake.addEventListener('click', selectPlayerDrake);

// Restart
btnRestart.addEventListener('click', restartGame);

// STYLES -------------------------------------
sectionAttackSelection.style.display = 'none'
btnRestart.style.display = 'none'
viewMapSection.style.display = 'none'
btnPlayerDrake.disabled = true

// FUNCTIONS -------------------------------------
// Select your drake
function selectPlayerDrake() {
    sectionDrakeSelection.style.display = 'none'
    viewMapSection.style.display = 'flex'
  
    let selectDrake = true;

    if(inputWarmheart.checked) {
        spanPlayerDrake.innerText = inputWarmheart.id;
        playerDrake = inputWarmheart.id
        selectDrake = true;
    } else if (inputSedgelam.checked) {
        spanPlayerDrake.innerText = inputSedgelam.id;
        playerDrake = inputSedgelam.id
        selectDrake = true;
    } else if (inputVenstino.checked) {
        spanPlayerDrake.innerText = inputVenstino.id;
        playerDrake = inputVenstino.id
        selectDrake = true;
    } else {
        alert('Select one Drake');
        selectDrake = false;
    }

    if (selectDrake) {
        selectEnemyDrake()
        extractAttacks(playerDrake)
    }
    selectDrakenPvP(playerDrake)
    startMap()
};

function extractAttacks(playerDrakeParam) {
    let attacks

    for (let i = 0; i < drakens.length; i++) {
        if (playerDrakeParam == drakens[i].name) {
            attacks = drakens[i].attacks
        }
    }

    showAttacks(attacks)
}

function showAttacks(attacksParam) {
    attacksParam.forEach((attack) =>{
        attacksOptions = `
            <button id="${attack.id}" class="btnAttacks AttackB">${attack.name}</button>
        `
        attacksTypeSection.innerHTML += attacksOptions

    })
    
    btnBasicAttack = document.getElementById('btnBasicAttack')
    btnSecondAttack = document.getElementById('btnSecondAttack')
    btnDefinitive = document.getElementById('btnDefinitive')
    buttons = document.querySelectorAll('.AttackB')

    // Attacks
    btnBasicAttack.addEventListener('click', fireAttack);
    btnSecondAttack.addEventListener('click', waterAttack);
    btnDefinitive.addEventListener('click', plantAttack);
}

// Select enemy drake randomly
function selectEnemyDrake() {
    let randomDrake = random(0, drakens.length-1);
    console.log(random)

    spanEnemyDrake.innerText = drakens[randomDrake].name
}

// Player Attacks
function fireAttack() {
    playerAttack = "FIRE"
    enemyRandomAttack();
}

function waterAttack() {
    playerAttack = "WATER"
    enemyRandomAttack();
}

function plantAttack() {
    playerAttack = "PLANT"
    enemyRandomAttack();
}

// Random enemy Atack
function enemyRandomAttack() {
    let randomAttack = random(1,3);

    if (randomAttack == 1) {
        enemyAttack = "FIRE";
    } else if (randomAttack == 2) {
        enemyAttack = "WATER";
    } else {
        enemyAttack = "PLANT";
    }

    fight();
}

// Fight between Drakes
function fight() {  
    clearInterval(interval)

    if (playerAttack == enemyAttack) {
        createMessage("No one lost any life");
    } else if(playerAttack == "FIRE" && enemyAttack == "PLANT") {
        createMessage('Your oponent lost a life')
        enemyLifes--
        spanEnemyLifes.innerText = enemyLifes
    } else if(playerAttack == "WATER" && enemyAttack == "FIRE") {
        createMessage('Your oponent lost a life')
        enemyLifes--
        spanEnemyLifes.innerText = enemyLifes
    } else if(playerAttack == "PLANT" && enemyAttack == "WATER") {
        createMessage('Your oponent lost a life')
        enemyLifes--
        spanEnemyLifes.innerText = enemyLifes
    } else {
        createMessage('You lost a life')
        playerLifes--
        spanPlayerLifes.innerText = playerLifes
    };
    checkLifes();    
}

// We see if some player have 0 lifes
function checkLifes() {
    if (enemyLifes == 0) {
        createFinalMessage('CONGRATULATION! YOU WIN!')
    } else if (playerLifes == 0) {
        createFinalMessage("I'M SO SORRY, YOU LOSE!")
    }
}

// New message that shows the attacks of the players
function createMessage(result) {
    messageSection.innerHTML = 'Your Drake attack with '+playerAttack+', and the enemy Drake attack with '+enemyAttack+'.<br> '+result;
}

// New message that shows who wins
function createFinalMessage(finalResult) {
    let attackMessage = document.createElement('p');
    attackMessage.innerHTML = finalResult;
    
    messageSection.appendChild(attackMessage);

    btnBasicAttack.disabled = true;
    btnSecondAttack.disabled = true;
    btnDefinitive.disabled = true;
    btnRestart.style.display = 'block'
}

// MULTIPLAYER ------------------------------
// Join the game Pvp
function joinGame() {
    // Made the call to the 192.168.1.74 (Async response). This IPv6 Address is my wifi, to play PVP change that to your own Wifi Addres
    fetch("http://192.168.1.74:8080/join")
        .then(function(res) {
            if(res.ok) {
                res.text()
                    .then(function(resp) {
                        console.log(resp);
                        playerId = resp
                    })
            }
        })
}
// Find the draken the people choose
function selectDrakenPvP(drake) {
    fetch(`http://192.168.1.74:8080/drakens/${playerId}`, { 
        method: "post", 
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            drakenName: drake
        })
    })
}
// Send the positions of the players
function sendPosition(x, y) {
    fetch(`http://192.168.1.74:8080/drakens/${playerId}/position`, {
        method: 'post',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y,
        })
    })
        .then(function(res) {
            if(res.ok) {
                res.json()
                    .then(function({ enemies }) { // extract variable from response

                        enemyDrakens = enemies.map(function(enemy) {
                            let enemyDrake = null
                            const drakeName = enemy.draken || ""
                        
                            if(drakeName.name === "Warmheart") {
                                enemyDrake = new Draken("Warmheart", "/public/assets/img/drakens/fire_draken.jpg", 90, "/public/assets/img/drakens/fire_draken.jpg", enemy.id)
                            } else if(drakeName.name === "Sedgelam") {
                                enemyDrake = new Draken("Sedgelam", "/public/assets/img/drakens/water_draken.jpg", 100, "/public/assets/img/drakens/water_draken.jpg", enemy.id)
                            } else if(drakeName === "Venstino") {
                                enemyDrake = new Draken("Venstino", "/public/assets/img/drakens/plant_draken.jpg", 120, "/public/assets/img/drakens/plant_draken.jpg", enemy.id)
                            } 
                            enemyDrake.x = enemy.x
                            enemyDrake.y = enemy.y
                            
                            return enemyDrake
                        })
                    })
            }
        })
}
// Send the attacks the players made
function sendAttacks() {
    fetch(`http://192.168.1.74:8080/drakens/${playerId}/attacks`, {
        method: 'post',
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            attacks: playerAttack
        })
    })
        
    interval = setInterval(attackSelected, 50)
}

function attackSelected() {
    fetch(`http://192.168.1.74:8080/drakens/${enemyId}/attacks`)
        .then(function(response) {
            if(response.ok) {
                res.json()
                    .then(function(attacks) {
                        if(attacks >= 0) {
                            enemyAttack = attacks
                            fight()
                        }
                    })
            }
        })
}

// Draw the canvas and the drakens on it
function drawCanvas() {
    playerDrakeObj.x += playerDrakeObj.speedX
    playerDrakeObj.y += playerDrakeObj.speedY
    canva.clearRect(0,0,map.width,map.height)
    canva.drawImage(
        mapBg,
        0,
        0,
        map.width,
        map.height
    )
    playerDrakeObj.drawDraken()
    sendPosition(playerDrakeObj.x, playerDrakeObj.y)

    enemyDrakens.forEach(function(drakenMap) {
        drakenMap.drawDraken()
        reviewColision(drakenMap)
    })

    // PvE
    // warmheartEnemy.drawDraken()
    // sedgelamEnemy.drawDraken()
    // venstinoEnemy.drawDraken()

    if (playerDrakeObj.speedX !== 0 || playerDrakeObj.speedY !== 0) {
        reviewColision(warmheartEnemy)
        reviewColision(sedgelamEnemy)
        reviewColision(venstinoEnemy)
    }
}
function moveRight() {
    playerDrakeObj.speedX = 5
    drawCanvas()
}
function moveLeft() {
    playerDrakeObj.speedX = -5
    drawCanvas()
}
function moveUp() {
    playerDrakeObj.speedY = -5
    drawCanvas()
}
function moveDown() {
    playerDrakeObj.speedY = 5
    drawCanvas()
}
function stopMovement() {
    playerDrakeObj.speedX = 0
    playerDrakeObj.speedY = 0
}
function movementDrakenKeyborad(event) {
    switch (event.key) {
        case 'ArrowUp':
            moveUp()
            break
    
        case 'ArrowDown':
            moveDown()
            break
    
        case 'ArrowLeft':
            moveLeft()
            break
    
        case 'ArrowRight':
            moveRight()
            break
    
        default:
            break
    }
}
function startMap() {
    playerDrakeObj = getObjDrake(playerDrake)
    interval = setInterval(drawCanvas, 50)

    window.addEventListener('keydown', movementDrakenKeyborad)
    window.addEventListener('keydown', stopMovement)
}
function getObjDrake(playerDrakeParam) {
    for (let i = 0; i < drakens.length; i++) {
        if (playerDrakeParam == drakens[i].name) {
            return drakens[i]
        }
    }
}
function reviewColision(enemy) {
    let enemyName = enemy.name

    const upEnemy = enemy.y
    const leftEnemy = enemy.x
    const downEnemy = enemy.y + enemy.height
    const rightEnemy = enemy.x + enemy.width
    
    const upDraken = playerDrakeObj.y
    const leftDraken = playerDrakeObj.x
    const downDraken = playerDrakeObj.y + playerDrakeObj.height
    const rightDraken = playerDrakeObj.x + playerDrakeObj.width
    if(
        !(downDraken < upEnemy ||
        upDraken > downEnemy ||
        rightDraken < leftEnemy ||
        leftDraken > rightEnemy)
    ) {
        stopMovement()
        clearInterval(interval)
        // enemyId = enemyDrake.id
        sectionAttackSelection.style.display = 'flex'
        viewMapSection.style.display = 'none'
        window.addEventListener('keydown', disabled)
        window.addEventListener('keyup', disabled)
        selectEnemyDrake(enemyName)

    }
}

// Reload the page
function restartGame() {
    location.reload()
}

// Get a ramdom number between the parameters min and max 
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function combate(valorJugador, valorEnemigo, eleccionJugador, eleccionPC){

    mensajes.classList.remove("inactive")

    let ataqueJugador = eleccionJugador.ataque
    let ataquePc = eleccionPC.ataque
    let defensaJugador = eleccionJugador.defensa
    let defensaPc = eleccionPC.defensa
    let esquivaJugador = eleccionJugador.esquiva
    let esquivaPc = eleccionPC.esquiva
    let esquivaHabilidad 
    //let escudosUsados = 4
    let habilidadUsadaJugador = eleccionJugador.habilidades
    let habilidadUsadaPc = eleccionPC.habilidades

    //funcion de aleatoriedad
    function esquivarAleatorio(min, max){
        return Math.floor(Math.random()*(max - min + 1) + min)
    }


    if(valorJugador == "ataque" && valorEnemigo == "ataque"){
        let habilidad = eleccionJugador.ataqueImg
        pintarHabilidadJugador(eleccionJugador, habilidad)
        let habilidadPc = eleccionPC.ataqueImgPc
        pintarHabilidadPc(eleccionPC, habilidadPc)
        // pintarPersonajeJugador(eleccionJugador)
        // pintarPersonajeEnemigo(eleccionPC)
        let saludJugador = parseInt(saludJugador1.innerText) - ataquePc
        saludJugador1.innerText = String(saludJugador)
        let saludEnemigo = parseInt(saludEnemigo1.innerText) - ataqueJugador
        saludEnemigo1.innerText = String(saludEnemigo)
        let parrafo = document.getElementById("msj")
        parrafo.innerText = `Mascota de Jugador inflinge ${ataqueJugador} de daño a mascota de  oponente con ${habilidadUsadaJugador[0].nombre}. Mascota de oponente inflinge ${ataquePc} de daño a mascota de Jugador con ${habilidadUsadaPc[0].nombre}.`
        // mensajes.appendChild(parrafo)
        salud()
    }else if(valorJugador == "ataque" && valorEnemigo == "defensa"){
        let habilidad = eleccionJugador.ataqueImg
        pintarHabilidadJugador(eleccionJugador, habilidad)
        let habilidadPc = eleccionPC.defensaImg
        pintarHabilidadPc(eleccionPC, habilidadPc)
        let saludJugador = parseInt(saludJugador1.innerText) - (defensaPc)
        saludJugador1.innerText = String(saludJugador)
        let saludEnemigo = parseInt(saludEnemigo1.innerText) - 10
        saludEnemigo1.innerText = String(saludEnemigo)
        let parrafo = document.getElementById("msj")
        parrafo.innerText = `Mascota de oponente refleja ${(defensaPc)} de daño a mascota de Jugador al usar la habilidad de Escudo, pero sufre 10 de daño.`
        // mensajes.appendChild(parrafo)
        salud()
    }else if(valorJugador == "ataque" && valorEnemigo == "esquiva"){
        esquivaHabilidad = esquivarAleatorio(0,1)
        if(esquivaPc[esquivaHabilidad] == false){
            let habilidad = eleccionJugador.ataqueImg
            pintarHabilidadJugador(eleccionJugador, habilidad)
            let habilidadPc = eleccionPC.esquivaImg
            pintarHabilidadPc(eleccionPC, habilidadPc)
            let saludEnemigo = parseInt(saludEnemigo1.innerText) - ataqueJugador
            saludEnemigo1.innerText = String(saludEnemigo)
            let parrafo = document.getElementById("msj")
            parrafo.innerText = `Mascota oponente usa la habilidad ${habilidadUsadaPc[2].nombre}, pero no pudo esquivar el ataque y recibe ${ataqueJugador} de daño.`
            // mensajes.appendChild(parrafo)
            salud()
        }else{
                if(parseInt(saludEnemigo1.innerText) >= 90){
                    let habilidad = eleccionJugador.ataqueImg
                    pintarHabilidadJugador(eleccionJugador, habilidad)
                    let habilidadPc = eleccionPC.esquivaImg
                    pintarHabilidadPc(eleccionPC, habilidadPc)
                    saludEnemigo1.innerText = "100"
                    let parrafo = document.getElementById("msj")
                    parrafo.innerText = `Mascota de PC usa la habilidad ${habilidadUsadaPc[2].nombre} con exito y restaura su salud.`
                    // mensajes.appendChild(parrafo)
                }else{
                    let habilidad = eleccionJugador.ataqueImg
                    pintarHabilidadJugador(eleccionJugador, habilidad)
                    let habilidadPc = eleccionPC.esquivaImg
                    pintarHabilidadPc(eleccionPC, habilidadPc)
                    let saludEnemigo = parseInt(saludEnemigo1.innerText) + 10
                    saludEnemigo1.innerText = String(saludEnemigo)
                    let parrafo = document.getElementById("msj")
                    parrafo.innerText = `Mascota de PC usa la habilidad ${habilidadUsadaPc[2].nombre} con exito y restaura 10 de salud.`
                    // mensajes.appendChild(parrafo)
                    salud()
                }
            
        }
    }else if(valorJugador == "defensa" && valorEnemigo == "ataque"){
        let habilidad = eleccionJugador.defensaImg
        pintarHabilidadJugador(eleccionJugador, habilidad)
        let habilidadPc = eleccionPC.ataqueImgPc
        pintarHabilidadPc(eleccionPC, habilidadPc)
        let saludEnemigo = parseInt(saludEnemigo1.innerText) - defensaJugador
        saludEnemigo1.innerText = String(saludEnemigo)
        let saludJugador = parseInt(saludJugador1.innerText) - 10
        saludJugador1.innerText = String(saludJugador)
        let parrafo = document.getElementById("msj")
        parrafo.innerText = `Mascota de oponente ataca con ${habilidadUsadaPc[0].nombre}, Mascota de Jugador refleja ${defensaJugador} de daño al usar la habilidad de Escudo. pero sufre 10 de daño`
        // mensajes.appendChild(parrafo)
        salud()
    }else if(valorJugador == "defensa" && valorEnemigo == "defensa"){
        let habilidad = eleccionJugador.defensaImg
        pintarHabilidadJugador(eleccionJugador, habilidad)
        let habilidadPc = eleccionPC.defensaImg
        pintarHabilidadPc(eleccionPC, habilidadPc)
        let parrafo = document.getElementById("msj")
        parrafo.innerText = `Ambos personajes se defienden y ninguno sufre daño.`
        // mensajes.appendChild(parrafo)
        
    }else if(valorJugador == "defensa" && valorEnemigo == "esquiva"){
        let habilidad = eleccionJugador.defensaImg
        pintarHabilidadJugador(eleccionJugador, habilidad)
        let habilidadPc = eleccionPC.esquivaImg
        pintarHabilidadPc(eleccionPC, habilidadPc)
        let parrafo = document.getElementById("msj")
        parrafo.innerText = `Mascota de oponente usa la habilidad ${habilidadUsadaPc[2].nombre}, ninguno de los personajes sufre daño.`
        // mensajes.appendChild(parrafo)
        
    }else if(valorJugador == "esquiva" && valorEnemigo == "ataque"){
        esquivaHabilidad = esquivarAleatorio(0,1)
        if(esquivaJugador[esquivaHabilidad] == false){
            let habilidad = eleccionJugador.esquivaImg
            pintarHabilidadJugador(eleccionJugador, habilidad)
            let habilidadPc = eleccionPC.ataqueImgPc
            pintarHabilidadPc(eleccionPC, habilidadPc)
            let saludJugador = parseInt(saludJugador1.innerText) - ataquePc
            saludJugador1.innerText = String(saludJugador)
            let parrafo = document.getElementById("msj")
            parrafo.innerText = `Mascota de Jugador no pudo esquivar el ataque ${habilidadUsadaPc[0].nombre} de ${eleccionPC.nombre} y recibe ${ataquePc} de daño.`
            // mensajes.appendChild(parrafo)
            salud()
        }else{
                if(parseInt(saludJugador1.innerText) >= 90){
                    let habilidad = eleccionJugador.esquivaImg
                    pintarHabilidadJugador(eleccionJugador, habilidad)
                    let habilidadPc = eleccionPC.ataqueImgPc
                    pintarHabilidadPc(eleccionPC, habilidadPc)
                    saludJugador1.innerText = "100"
                    let parrafo = document.getElementById("msj")
                    parrafo.innerText = `Mascota de Jugador pudo esquivar el ataque ${habilidadUsadaPc[0].nombre} de ${eleccionPC.nombre} con exito y restaura su salud.`
                }else{
                    let habilidad = eleccionJugador.esquivaImg
                    pintarHabilidadJugador(eleccionJugador, habilidad)
                    let habilidadPc = eleccionPC.ataqueImgPc
                    pintarHabilidadPc(eleccionPC, habilidadPc)
                    let saludJugador = parseInt(saludJugador1.innerText) + 10
                    saludJugador1.innerText = String(saludJugador)
                    let parrafo = document.getElementById("msj")
                    parrafo.innerText = `Mascota de Jugador pudo esquivar el ataque ${habilidadUsadaPc[0].nombre} de ${eleccionPC.nombre} con exito y restaura 10 de salud.`
                }
            
            // mensajes.appendChild(parrafo)
            salud()
        }
    }else if(valorJugador == "esquiva" && valorEnemigo == "defensa"){
        let habilidad = eleccionJugador.esquivaImg
        pintarHabilidadJugador(eleccionJugador, habilidad)
        let habilidadPc = eleccionPC.defensaImg
        pintarHabilidadPc(eleccionPC, habilidadPc)
        let parrafo = document.getElementById("msj")
        parrafo.innerText = `Mascota de oponente usa la habilidad ${habilidadUsadaPc[1].nombre},  ninguno de los personajes sufre daño.`
        // mensajes.appendChild(parrafo)
    }else if(valorJugador == "esquiva" && valorEnemigo == "esquiva"){
        let habilidad = eleccionJugador.esquivaImg
        pintarHabilidadJugador(eleccionJugador, habilidad)
        let habilidadPc = eleccionPC.esquivaImg
        pintarHabilidadPc(eleccionPC, habilidadPc)
        let parrafo = document.getElementById("msj")
        parrafo.innerText = `ambos personajes usan la habilidad de esquivar.`
        // mensajes.appendChild(parrafo)
    }else{

        mensajes.innerText = `<p>algo salio mal.</p>`
    }
}


