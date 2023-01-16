// Welcome to the code JS of Mokepon

// Variables -------------------------------------
let playerAttack
let enemyAttack

let playerLifes = 3;
let enemyLifes = 3;

// GETTERS -------------------------------------
    // Buttons
    let btnPlayerPet = document.getElementById('btnPet');
    let btnFire = document.getElementById('btnFire');
    let btnWater = document.getElementById('btnWater');
    let btnPlant = document.getElementById('btnPlant');
    let btnRestart = document.getElementById('btnRestart');

    // Sections
    let sectionAttackSelection = document.getElementById('select-attack')

// EVENTS -------------------------------------
    // Buttons
    btnPlayerPet.addEventListener('click', selectPlayerPet);

    // Attacks
    btnFire.addEventListener('click', fireAttack);
    btnWater.addEventListener('click', waterAttack);
    btnPlant.addEventListener('click', plantAttack);

    // Restart
    btnRestart.addEventListener('click', restartGame);

// STYLES
    sectionAttackSelection.style.display = 'none'
    btnRestart.style.display = 'none'


// FUNCTIONS -------------------------------------
// Select your pet
function selectPlayerPet() {
    let sectionPetSelection = document.getElementById('select-pet')
    sectionPetSelection.style.display = 'none'
    sectionAttackSelection.style.display = 'block'

    let inputWarmheart = document.getElementById('warmheart');
    let inputSedgelam = document.getElementById('sedgelam');
    let inputVenstino = document.getElementById('venstino');
    let spanPlayerPet = document.getElementById('player-pet');
    let selectPet = true;

    if(inputWarmheart.checked) {
        spanPlayerPet.innerText = "Warmheart";
        selectPet = true;
    } else if (inputSedgelam.checked) {
        spanPlayerPet.innerText = "Sedgelam";
        selectPet = true;
    } else if (inputVenstino.checked) {
        spanPlayerPet.innerText = "Venstino";
        selectPet = true;
    } else {
        alert('Select one pet');
        selectPet = false;
    }

    if (selectPet) {
        selectEnemyPet()
    }
};

// Select enemy pet randomly
function selectEnemyPet() {
    let randomPet = random(1,3);
    let spanEnemyPet = document.getElementById('enemy-pet');

    if (randomPet == 1) {
        spanEnemyPet.innerText = "Warmheart";
    } else if (randomPet == 2) {
        spanEnemyPet.innerText = "Sedgelam";
    } else {
        spanEnemyPet.innerText = "Venstino";
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

// Fight between pets
function fight() {
    let spanPlayerLifes = document.getElementById('player-lifes'); 
    let spanEnemyLifes = document.getElementById('enemy-lifes');  

    if (playerAttack == enemyAttack) {
        createMessage("TIE");
    } else if(playerAttack == "FIRE" && enemyAttack == "PLANT") {
        createMessage('You WIN!')
        enemyLifes--
        spanEnemyLifes.innerText = enemyLifes
    } else if(playerAttack == "WATER" && enemyAttack == "FIRE") {
        createMessage('You WIN!')
        enemyLifes--
        spanEnemyLifes.innerText = enemyLifes
    } else if(playerAttack == "PLANT" && enemyAttack == "WATER") {
        createMessage('You WIN!')
        enemyLifes--
        spanEnemyLifes.innerText = enemyLifes
    } else {
        createMessage('You LOSE :C')
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
    // let messageSection = document.getElementById('message')
    // let attackMessage = document.createElement('p');
    let messageSection = document.getElementById('message')

    messageSection.innerHTML = 'Your pet attack with '+playerAttack+', and the enemy pet attack with '+enemyAttack+'. '+result;
    
    // messageSection.appendChild(attackMessage);
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






















