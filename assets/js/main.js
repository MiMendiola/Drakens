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
let canva

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
const viewMapSection = document.getElementById('view-map')
const map = document.getElementById('map')

// CLASSES -------------------------------------
class Draken {
    constructor(name, img, life) {
        this.name = name
        this.img = img
        this.life = life
        this.attacks = []
        this.x = 20
        this.y = 30
        this.width = 80
        this.height = 80
        this.mapImg = new Image()
        this.mapImg.src = img
    }
}

let warmheart = new Draken("Warmheart", "/assets/img/drakens/fire_draken.jpg", 90);
let sedgelam = new Draken("Sedgelam", "/assets/img/drakens/water_draken.jpg", 100);
let venstino = new Draken("Venstino", "/assets/img/drakens/plant_draken.jpg", 120);

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
    // viewMapSection.style.display = 'flex'
    
    // TEST
    // canva = map.getContext("2d")
    // canva.fillRect(5,15,20,40)

    sectionAttackSelection.style.display = 'flex'

    // END TEST

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


// function drawDraken() {
//     canva.clearRect(0,0,map.width,map.height)
//     canva.drawImage(
//         warmheart.mapImg,
//         warmheart.x,
//         warmheart.y,
//         warmheart.width,
//         warmheart.height
//     )
// }

function moveDraken() {
    warmheart.x = warmheart.x + 1
    drawDraken()
}






// Reload the page
function restartGame() {
    location.reload()
}

// Get a ramdom number between the parameters min and max 
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}






















