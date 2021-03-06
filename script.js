var SELECT_DRAGGABLE = ".draggable";

$(document).ready(function () {
    addDisk(250, 52);
    initDrag();
    initDrop();
});


function addDisk(xCoordinate, yCoordinate) {
    var randColor = "green";
    var cnt = 0;
    var firstTower = document.getElementById('first-tower');
    var secondTower = document.getElementById('second-tower');
    var thirdTower = document.getElementById('third-tower');
    for (var id = 1; id <= 3; id++) {
        var diskElement = makeDisk(xCoordinate - cnt, yCoordinate, randColor, id);
        console.log(diskElement);
        firstTower === null || firstTower === void 0 ? void 0 : firstTower.appendChild(diskElement);
        cnt += 30;
    }
    cnt = 0;
    randColor = "red";
    for (var id = 1; id <= 3; id++) {
        var diskElement = makeDisk(xCoordinate - cnt, yCoordinate, randColor, id);
        console.log(diskElement);
        secondTower === null || secondTower === void 0 ? void 0 : secondTower.appendChild(diskElement);
        cnt += 30;
    }
    cnt = 0;
    randColor = "blue";
    for (var id = 1; id <= 3; id++) {
        var diskElement = makeDisk(xCoordinate - cnt, yCoordinate, randColor, id);
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