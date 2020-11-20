let scoreBord = document.querySelector('.scoreBord');
let carSpeed = document.querySelector('.CarSpeed');
let menu = document.querySelector('.Menu');
const gameArea = document.querySelector('.gameArea');
let lastScore = document.querySelector('#lastScore')
let increaseSpeed = .001

let keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false
};

let player = {
    speed: 5,
    score: 0
}

menu.addEventListener('click', start)

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

function keyDown(e) {
    keys[e.key] = true
};

function keyUp(e) {
    keys[e.key] = false
};

function moveLines() {

    let allLines = document.querySelectorAll('.lines');

    allLines.forEach(function (item) {

        item.y += player.speed
        item.style.top = item.y + 'px'

        if(item.y > 1000) {
            item.y -= 1050
        }
    })
};

function moveEnemy(car) {
    let allEnemy = document.querySelectorAll('.enemyCar');

    allEnemy.forEach(function(item) {

        if(crushCar(car, item)) {
            console.log('Car Accident');
            endGame();
        }
        
        // crushCar(car, item)

        item.y += player.speed
        item.style.top = item.y + 'px' 

        if(item.y > 1000) {

            item.style.left = Math.floor((Math.random() * 550)) + 'px'
            item.y = -200
        }
    })
};

function crushCar(a, b) {
    let hero = a.getBoundingClientRect();
    let enemy = b.getBoundingClientRect();

    // console.log('Top ' + hero.top  + ' Bottom ' + hero.bottom + ' Right ' + hero.right + ' Left ' + hero.left);
    // console.log('Top ' + enemy.top  + ' Bottom ' + enemy.bottom + ' Right ' + enemy.right + ' Left ' + enemy.left);

    return !(
        (hero.top >= enemy.bottom) || (hero.bottom <= enemy.top) || (hero.right <= enemy.left) || (hero.left >= enemy.right)
    )
}

function endGame() {
    player.start = false

    menu.classList.remove('hide')
    gameArea.innerHTML = ''
    lastScore.innerHTML = 'Your Score :' + (player.score + 1) 
}

function gamePlay() {

    let road = gameArea.getBoundingClientRect();
    // console.log(road);

    let car = document.querySelector('.car');

    // console.log(car.getBoundingClientRect());

    if (player.start) {

        moveLines();
        moveEnemy(car);

        if (keys.ArrowUp && player.y >= 100) {
            player.y -= player.speed
        }
        if (keys.ArrowDown && player.y <= (948 - 120)) {
            player.y += player.speed +2
        }
        if (keys.ArrowRight && player.x <= (road.width - 51)) {
            player.x += player.speed
        }
        if (keys.ArrowLeft && player.x > 0) {
            player.x -= player.speed
        }

        car.style.top = player.y + "px"
        car.style.left = player.x + "px"
        
        // console.log(player.score++);

        player.score++
        player.speed += increaseSpeed
        
        console.log(player.speed);

        let speed = player.speed * 10

        carSpeed.innerHTML = 'Speed: ' + speed.toString().substring(0,3) + ' km/h'

        scoreBord.innerHTML = 'Score: ' + player.score
    
        requestAnimationFrame(gamePlay);
    }
};

function start() {

    player.speed = 5
    player.score = 0

    gameArea.classList.remove('hide')
    menu.classList.add('hide')

    player.start = true

    // ===== Car Code =====

    let car = document.createElement('div');
    car.setAttribute('class', 'car');

    gameArea.appendChild(car);

    // console.log('Left position' + car.offsetLeft);
    // console.log('Top position' + car.offsetTop);

    player.x = car.offsetLeft;
    player.y = car.offsetTop;

    // ==== Road Lines Code ====

    let roadLinesXgap = 150;
    let roadLinesYgap = 210;

    for (x = 1; x < 4; x++) {

        for (y = 0; y < 10; y++) {
            let roadLines = document.createElement('div')
            roadLines.setAttribute('class', 'lines')

            // Road Lines Y Code
            roadLines.y = y * roadLinesYgap
            roadLines.style.top = (roadLines.y) + 'px'

            // Road Lines X Code
            roadLines.x = x * roadLinesXgap
            roadLines.style.left = (roadLines.x) + 'px'

            gameArea.appendChild(roadLines)
        };
    };

    // ==== EnemyCar ==== 


    for(y=0; y<6; y++) {  //y<6

        let enemyCarYgap = ((y+1) * 200) * -1

        let enemyCar = document.createElement('div');
        enemyCar.setAttribute('class', 'enemyCar');

        enemyCar.y = enemyCarYgap
        enemyCar.style.top = enemyCar.y + 'px'
        enemyCar.style.left = Math.floor((Math.random() * 550)) + 'px'
        enemyCar.style.backgroundImage = 'url(./02.png)'

        gameArea.appendChild(enemyCar)
    }

    

    window.requestAnimationFrame(gamePlay);

};