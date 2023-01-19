// Welcome to the code JS of Mokepon

// Variables -------------------------------------
let playerAttack
let enemyAttack

let playerLifes = 3;
let enemyLifes = 3;

// GETTERS -------------------------------------
    // Body
    let bodyImg = document.getElementById('main')

    // Buttons
    let btnPlayerDrake = document.getElementById('btnDrake');
    let btnFire = document.getElementById('btnFire');
    let btnWater = document.getElementById('btnWater');
    let btnPlant = document.getElementById('btnPlant');
    let btnRestart = document.getElementById('btnRestart');

    // Sections
    let sectionAttackSelection = document.getElementById('select-attack')

    // Groups
    let btnDrakeBG = document.getElementsByName('drake');

// EVENTS -------------------------------------
    // Change background 
    btnDrakeBG.forEach((element) => {
        // Add an eventListener for each input
        element.addEventListener('click', () => { 
            if (element.id == 'warmheart') {
                bodyImg.style.backgroundImage = "url('/assets/img/bgrounds/bground_fire.jpg')";
                btnPlayerDrake.innerText = 'WARMHEART'
            } else if (element.id == 'sedgelam') {
                bodyImg.style.backgroundImage = "url('/assets/img/bgrounds/bground_water.jpg')";
                btnPlayerDrake.innerText = 'SEDGELAM'
            } else if (element.id == 'venstino') {
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

    // Attacks
    btnFire.addEventListener('click', fireAttack);
    btnWater.addEventListener('click', waterAttack);
    btnPlant.addEventListener('click', plantAttack);

    // Restart
    btnRestart.addEventListener('click', restartGame);

// STYLES
    sectionAttackSelection.style.display = 'none'
    btnPlayerDrake.disabled = true
    btnRestart.style.display = 'none'

// FUNCTIONS -------------------------------------
// Select your drake
function selectPlayerDrake() {
    let sectionDrakeSelection = document.getElementById('select-drake')
    sectionDrakeSelection.style.display = 'none'
    sectionAttackSelection.style.display = 'flex'

    let inputWarmheart = document.getElementById('warmheart');
    let inputSedgelam = document.getElementById('sedgelam');
    let inputVenstino = document.getElementById('venstino');
    let spanPlayerDrake = document.getElementById('player-drake-name');
    let selectDrake = true;

    if(inputWarmheart.checked) {
        spanPlayerDrake.innerText = "Warmheart";
        selectDrake = true;
    } else if (inputSedgelam.checked) {
        spanPlayerDrake.innerText = "Sedgelam";
        selectDrake = true;
    } else if (inputVenstino.checked) {
        spanPlayerDrake.innerText = "Venstino";
        selectDrake = true;
    } else {
        alert('Select one Drake');
        selectDrake = false;
    }

    if (selectDrake) {
        selectEnemyDrake()
    }
};

// Select enemy drake randomly
function selectEnemyDrake() {
    let randomDrake = random(1,3);
    let spanEnemyDrake = document.getElementById('enemy-drake-name');

    if (randomDrake == 1) {
        spanEnemyDrake.innerText = "Warmheart";
    } else if (randomDrake == 2) {
        spanEnemyDrake.innerText = "Sedgelam";
    } else {
        spanEnemyDrake.innerText = "Venstino";
    }
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
    let spanPlayerLifes = document.getElementById('player-lifes'); 
    let spanEnemyLifes = document.getElementById('enemy-lifes');  

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
    let messageSection = document.getElementById('message')

    messageSection.innerHTML = 'Your Drake attack with '+playerAttack+', and the enemy Drake attack with '+enemyAttack+'.<br> '+result;
    
}

// New message that shows who wins
function createFinalMessage(finalResult) {
    let messageSection = document.getElementById('message')
    let attackMessage = document.createElement('p');

    attackMessage.innerHTML = finalResult;
    
    messageSection.appendChild(attackMessage);

    btnFire.disabled = true;
    btnWater.disabled = true;
    btnPlant.disabled = true;
    btnRestart.style.display = 'block'
}

// Reload the page
function restartGame() {
    location.reload()
}

// Get a ramdom number between the parameters min and max 
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}






















