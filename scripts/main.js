function getRandomInt(max) {
    return  Math.floor(Math.random() * max);

}

let player = {
    positionHorizontal: getRandomInt(5),
    positionVertical: getRandomInt(5),
    hp : 5,
    frags: 0 ,
}
let counter = 0;
let fieldArray = []
field = document.querySelector('.field')
for (let i = 0; i < 30; i++){
    let lineArray = []

    for (let j = 0; j <30; j++){
        // for (let k = 0; k <2; k++){
        //
        // }
        let cell = []
        let cellDiv = document.createElement('div')
        cellDiv.className = 'cell'
        cellDiv.innerHTML = '<span class="emoji emoji-large">🧙</span>'
        counter = counter.toString()
        if( counter.length === 1){
            counter = '0' + counter
            cellDiv.id = `cell${counter}`
        }
        cellDiv.id = `cell${counter}`
        counter = Number(counter)
        counter += 1
        cell.push(cellDiv)
        cell.push('space')
        lineArray.push(cell)


    }
    fieldArray.push(lineArray)

}
for (let i = 0; i < 120; i++){
    fieldArray[getRandomInt(30)][getRandomInt(30)][1] = 'wall'

    fieldArray[getRandomInt(25)+4][getRandomInt(25)+4][1] = 'enemy'

}

fieldArray[getRandomInt(3)+26][getRandomInt(3)+26][1]= 'exit'
fieldArray[player.positionVertical][player.positionHorizontal][1] = 'sorcerer'
function drawing() {
        fieldArray.forEach((element, i)=> {
        let line = document.createElement('div');
        line.className = 'line'
        line.id = `line${i}`
        field.append(line)
        element.forEach((ele)=> {
            if(ele[1]=== 'space'){
                ele[0].setAttribute('style', 'background: rgb(160, 160, 160')
                ele[0].innerHTML = ''

            }
            if(ele[1] === 'sorcerer'){
                ele[0].setAttribute('style', 'background: purple')
                ele[0].innerHTML = '<span class="emoji emoji-large">🧙</span>    '
            }
            if(ele[1]=== 'wall'){
                ele[0].setAttribute('style', '  background: url("images/icons8-wall-50.png");')
                ele[0].innerHTML = ' '
            }
            if(ele[1]=== 'enemy'){
                ele[0].setAttribute('style', 'background: green')
                ele[0].innerHTML = '<span class="emoji emoji-large">🧟</span>'
                }
            if(ele[1]==='exit'){
                ele[0].setAttribute('style',' background: url("images/icons8-door-50.png");')
                ele[0].innerHTML = ''
            }
            line.append(ele[0])
        }
        )}
    )
}
drawing()
// let playerDiv = document.querySelector(`#cell${player.positionVertical}${player.positionHorizontal}`)
// playerDiv.setAttribute('style', 'background: purple')
 function playerRun(direction) {


    if(direction === 'left'
        && player.positionHorizontal !== 0
        && fieldArray[player.positionVertical][player.positionHorizontal-1][1] !== 'wall'
        && fieldArray[player.positionVertical][player.positionHorizontal-1][1] !== 'exit'){
        fieldArray[player.positionVertical][player.positionHorizontal][1] = 'space'

        player.positionHorizontal -= 1

        fieldArray[player.positionVertical][player.positionHorizontal][1] = 'sorcerer'


    }
    if(direction === 'right'
        && player.positionHorizontal !== 29
        && fieldArray[player.positionVertical][player.positionHorizontal+1][1] !== 'wall'
        && fieldArray[player.positionVertical][player.positionHorizontal+1][1] !== 'exit'){
        fieldArray[player.positionVertical][player.positionHorizontal][1] = 'space'
        player.positionHorizontal += 1
        fieldArray[player.positionVertical][player.positionHorizontal][1] = 'sorcerer'
    }
    if(direction === 'up'
        && player.positionVertical !== 0
        && fieldArray[player.positionVertical-1][player.positionHorizontal][1] !== 'wall'
        && fieldArray[player.positionVertical-1][player.positionHorizontal][1] !== 'exit'){
        fieldArray[player.positionVertical][player.positionHorizontal][1] = 'space'
        player.positionVertical -= 1
        fieldArray[player.positionVertical][player.positionHorizontal][1] = 'sorcerer'
    }
    if(direction === 'down'
        && player.positionVertical !== 29
        && fieldArray[player.positionVertical+1][player.positionHorizontal][1] !== 'wall'
        && fieldArray[player.positionVertical+1][player.positionHorizontal][1] !== 'exit'
    ){
        fieldArray[player.positionVertical][player.positionHorizontal][1] = 'space'
        player.positionVertical += 1
        fieldArray[player.positionVertical][player.positionHorizontal][1] = 'sorcerer'
    }


    //
}


function checkBehind(whatToCheck){
    if (player.positionVertical !==0 && player.positionVertical !==29 &&player.positionHorizontal!==29 &&player.positionHorizontal!==0){
        if( fieldArray[player.positionVertical+1][player.positionHorizontal][1] === whatToCheck
            ||fieldArray[player.positionVertical-1][player.positionHorizontal][1] === whatToCheck
            ||fieldArray[player.positionVertical][player.positionHorizontal+1][1] === whatToCheck
            ||fieldArray[player.positionVertical][player.positionHorizontal-1][1] === whatToCheck
        ){
            return true
    }}
}
document.onkeydown = function (key){

    fieldArray[player.positionVertical][player.positionHorizontal][0].scrollIntoView({
        block: 'center', // к ближайшей границе экрана
        behavior: 'smooth', // и плавно
    });
    if(checkBehind('exit')){alert(`ты победил и убил ${player.frags} зомбе`)}
    if(player.hp <= 0)
    {
        alert('ТЫ ПРОИГРАЛ')
        return
    }
    if (key.code === 'ArrowLeft' || key.code === 'KeyA'){
        playerRun('left')
        field.innerHTML = ''
        drawing()
        if(checkBehind('enemy')){player.hp --}

    }
    if (key.code === 'ArrowUp'|| key.code === 'KeyW'){
        playerRun('up')
        field.innerHTML = ''
        drawing()
        if(checkBehind('enemy')){player.hp --}
    }
    if (key.code === 'ArrowRight' || key.code === 'KeyD'){
        playerRun('right' )
        field.innerHTML = ''
        drawing()
        if(checkBehind('enemy')){player.hp --}
    }
    if (key.code === 'ArrowDown'|| key.code === 'KeyS'){
        playerRun('down')
        field.innerHTML = ''
        drawing()
        if(checkBehind('enemy')){player.hp --}

    }
    if (key.code === 'KeyE'){
        let gifAttack = document.createElement('img')
        gifAttack.setAttribute('src','images/attack.gif')
        gifAttack.className = 'gifAttack'
        fieldArray[player.positionVertical][player.positionHorizontal][0].append(gifAttack)
        setTimeout(() => {gifAttack.remove()}, 800);
        for (let i = -2; i < 3; i++){
            for (let j = -2; j < 3; j++) {
                let xyz = Math.abs(i) + Math.abs(j)
                if ((player.positionVertical + i)>=0 && (player.positionVertical + i)<=29 &&(player.positionHorizontal + j)>=0 &&(player.positionHorizontal + j)<=2929){
                    if (xyz<3 && fieldArray[player.positionVertical+i][player.positionHorizontal+j][1] ==='enemy'){
                        fieldArray[player.positionVertical+i][player.positionHorizontal+j][0].setAttribute('style', 'background: red')
                        fieldArray[player.positionVertical+i][player.positionHorizontal+j][1] = 'space'
                        console.log(fieldArray[player.positionVertical+i][player.positionHorizontal+j][1])
                        fieldArray[player.positionVertical+i][player.positionHorizontal+j][0].innerHTML = ''
                        player.frags++

                    }
                }

            }

        }
    }


};
