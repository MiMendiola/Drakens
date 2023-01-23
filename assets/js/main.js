// Welcome to the code JS of Mokepon

// VARIABLES -------------------------------------
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
let btnFire
let btnWater
let btnPlant

// Array of drakens
let drakens = []

// Map
const viewMapSection = document.getElementById('view-map')
const map = document.getElementById('map')

let canva = map.getContext("2d")
let interval
let mapBg = new Image()
mapBg.src = '/assets/img/bgrounds/bground_map.jpg'
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

// Map


// CLASSES -------------------------------------
class Draken {
    constructor(name, img, life, imgMap, x=28, y=15) {
        // random(0, map.width - this.width) random(0, map.height - this.height)
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

let warmheart = new Draken("Warmheart", "/assets/img/drakens/fire_draken.jpg", 90, "/assets/img/drakens/fire_draken.jpg");
let sedgelam = new Draken("Sedgelam", "/assets/img/drakens/water_draken.jpg", 100, "/assets/img/drakens/water_draken.jpg");
let venstino = new Draken("Venstino", "/assets/img/drakens/plant_draken.jpg", 120, "/assets/img/drakens/plant_draken.jpg");

let warmheartEnemy = new Draken("Warmheart", "/assets/img/drakens/fire_draken.jpg", 90, "/assets/img/drakens/fire_draken.jpg", 95, 140);
let sedgelamEnemy = new Draken("Sedgelam", "/assets/img/drakens/water_draken.jpg", 100, "/assets/img/drakens/water_draken.jpg", 225, 180);
let venstinoEnemy = new Draken("Venstino", "/assets/img/drakens/plant_draken.jpg", 120, "/assets/img/drakens/plant_draken.jpg", 115, 20);

warmheart.attacks.push(
    { 
        name: 'FIRE', 
        id: 'btnFire',
    },
    { 
        name: 'WATER', 
        id: 'btnWater',
    },
    { 
        name: 'PLANT', 
        id: 'btnPlant',
    }
)
sedgelam.attacks.push(
    { 
        name: 'WATER', 
        id: 'btnWater',
    },
    { 
        name: 'FIRE', 
        id: 'btnFire',
    },
    { 
        name: 'PLANT', 
        id: 'btnPlant',
    }
)
venstino.attacks.push(
    { 
        name: 'PLANT', 
        id: 'btnPlant',
    },
    { 
        name: 'FIRE', 
        id: 'btnFire',
    },
    { 
        name: 'WATER', 
        id: 'btnWater',
    }
)

drakens.push(warmheart,sedgelam,venstino)

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


// EVENTS -------------------------------------
// Change background 
btnDrakeBG.forEach((element) => {
    // Add an eventListener for each input
    element.addEventListener('click', () => { 
        if (element.id == 'Warmheart') {
            bodyImg.style.backgroundImage = "url('/assets/img/bgrounds/bground_fire.jpg')";
            btnPlayerDrake.innerText = 'WARMHEART'
        } else if (element.id == 'Sedgelam') {
            bodyImg.style.backgroundImage = "url('/assets/img/bgrounds/bground_water.jpg')";
            btnPlayerDrake.innerText = 'SEDGELAM'
        } else if (element.id == 'Venstino') {
            bodyImg.style.backgroundImage = "url('/assets/img/bgrounds/bground_plant.jpg')";
            btnPlayerDrake.innerText = 'VENSTINO'
        } else {
            bodyImg.style.backgroundImage = "url('/assets/img/bgrounds/bground_main.jpg')";
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

    // TEST


    startMap()








    // END TEST
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
    
    btnFire = document.getElementById('btnFire')
    btnWater = document.getElementById('btnWater')
    btnPlant = document.getElementById('btnPlant')
    buttons = document.querySelectorAll('.AttackB')

    // Attacks
    btnFire.addEventListener('click', fireAttack);
    btnWater.addEventListener('click', waterAttack);
    btnPlant.addEventListener('click', plantAttack);
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

    btnFire.disabled = true;
    btnWater.disabled = true;
    btnPlant.disabled = true;
    btnRestart.style.display = 'block'
}



// TEST


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

    warmheartEnemy.drawDraken()
    sedgelamEnemy.drawDraken()
    venstinoEnemy.drawDraken()

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






// ------------------------
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
        sectionAttackSelection.style.display = 'flex'
        viewMapSection.style.display = 'none'
        window.addEventListener('keydown', disabled)
        window.addEventListener('keyup', disabled)
        selectEnemyDrake(enemyName)

    }
}









// END TEST

// Reload the page
function restartGame() {
    location.reload()
}

// Get a ramdom number between the parameters min and max 
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}






















