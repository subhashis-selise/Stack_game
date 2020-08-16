var SELECT_DRAGGABLE = ".draggable";
var zero=0,one=0,two=0;
var diskCount=0;
var randomFlag=true;


$(document).ready(function () {
    addDisk(250, 52);
    initDrag();
    initDrop();
});
function randomNumber() {
  return Math.ceil(Math.random() * 100) + 0;
}

function addDisk(xCoordinate, yCoordinate) {
    var randColor = ["green","red","blue"];
    var cnt = 0,arrayCount=0;
    var firstTower = document.getElementById('first-tower');
    var secondTower = document.getElementById('second-tower');
    var thirdTower = document.getElementById('third-tower');
    var flag=true;
    var randomArray = [];
    var assignFlag=false;
    while(randomFlag){
            var rendNumber = randomNumber();
            rendNumber=rendNumber%3;
            if(rendNumber==0 && zero<3){
                assignFlag=true;
                
                zero++;
            }
            if(rendNumber==1 && one<3){
                assignFlag=true;
                one++;
            }
            if(rendNumber==2 && two<3){
                assignFlag=true;
                two++;
            }
            if(assignFlag==true){
                randomArray[arrayCount++]=rendNumber;
                assignFlag=false;
            }
            if(zero==3 && one==3 && two==3){
                randomFlag=false;
            }

    }
    console.log(randomArray);
    var randomColorCount=0;
    var x=0;
    for (var id = 1; id <= 3; id++) {
        x=randomArray[randomColorCount];
        var diskElement = makeDisk(xCoordinate - cnt, yCoordinate, randColor[x%3], id);
        console.log(diskElement);
        firstTower === null || firstTower === void 0 ? void 0 : firstTower.appendChild(diskElement);
        cnt += 30;
        randomColorCount++
    }
    cnt = 0;
   // randColor = "red";
    for (var id = 1; id <= 3; id++) {
        var diskElement = makeDisk(xCoordinate - cnt, yCoordinate, randColor[randomArray[id+2]], id);
        console.log(diskElement);
        secondTower === null || secondTower === void 0 ? void 0 : secondTower.appendChild(diskElement);
        cnt += 30;
        randomColorCount++
    }
    cnt = 0;
    //randColor = "blue";
    for (var id = 1; id <= 3; id++) {
        var diskElement = makeDisk(xCoordinate - cnt, yCoordinate, randColor[randomArray[id+5]], id);
        console.log(diskElement);
        thirdTower === null || thirdTower === void 0 ? void 0 : thirdTower.appendChild(diskElement);
        cnt += 30;

    }
	
}

function makeDisk(lastPositionX, lastPositionY, diskColor, id) {
    var diskElement = document.createElement("div");
    diskElement.style.top = lastPositionX + 'px';
    diskElement.style.left = lastPositionY + 'px';
    diskElement.style.width = '100px';
    diskElement.style.height = '30px';
    diskElement.style.borderRadius = '50%';
    diskElement.style.backgroundColor = diskColor;
    diskElement.style.position = 'absolute';
    diskElement.style.zIndex = '100';
    diskElement.id = 'temp' + diskColor + id;
    diskElement.className = 'draggable' + ' ' + diskElement.id
    return diskElement;
}


function initDrag() {
    $(SELECT_DRAGGABLE).draggable({
        revert: "invalid",
        stack: $(SELECT_DRAGGABLE),
        cursor: "move",
        addClasses: "false"
    });
}

function initDrop() {
    $(".droppable").droppable({
        accept: SELECT_DRAGGABLE,
    });
}