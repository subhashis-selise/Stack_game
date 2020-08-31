"use strict";
var id_value;
var Color = ['magenta', 'purple', 'violet'];
var numberOfMoves = 0;
class randomNumberOnly {
    randColorFun() {
        var cnt = 100;
        while (cnt--) {
            var randNumber = Math.floor(Math.random() * 3);
            console.log(colorMap[Color[randNumber]]);
            if (!colorMap[Color[randNumber]]) {
                colorMap[Color[randNumber]] = 1;
            }
            else if (colorMap[Color[randNumber]] <= 3) {
                colorMap[Color[randNumber]]++;
                return Color[randNumber];
            }
        }
        return 'white';
    }
    initDisk(lastPositionX, lastPositionY, diskColor, id) {
        var diskElement = document.createElement("div");
        diskElement.style.top = lastPositionX + 'px';
        diskElement.style.zIndex = '100';
        diskElement.style.left = lastPositionY + 'px';
        diskElement.style.width = '100px';
        diskElement.style.height = '30px';
        diskElement.style.borderRadius = '50%';
        diskElement.style.backgroundColor = diskColor;
        diskElement.style.position = 'absolute';
        diskElement.id = 'temp' + diskColor + id;
        return diskElement;
    }


    removeDisk() {
        $('#first-tower').children().each(function () {
            if ($(this).attr('id') !== 'pollStick' && $(this).attr('id') !== 'pollBase') {
                $(this).remove();
            }
        });
        $('#second-tower').children().each(function () {
            if ($(this).attr('id') !== 'pollStick1' && $(this).attr('id') !== 'pollBase1') {
                $(this).remove();
            }
        });
        $('#third-tower').children().each(function () {
            if ($(this).attr('id') !== 'pollStick2' && $(this).attr('id') !== 'pollBase2') {
                $(this).remove();
            }
        });
    }
  
}

class GameDecision {
    gameStatus() {
        var firstPoll = $('#first-tower > div::last-child').css('backgroundColor');
        var secondPoll = $('#second-tower > div::last-child').css('backgroundColor');
        var thirdPoll = $('#third-tower > div::last-child').css('backgroundColor');
        console.log(firstPoll, secondPoll, thirdPoll);
        var cnt1 = 0, cnt2 = 0, cnt3 = 0;
        $('#first-tower').children().each(function () {
            if ($(this).css('backgroundColor') !== firstPoll) {
                cnt1++;
            }
        });
        $('#second-tower').children().each(function () {
            if ($(this).css('backgroundColor') !== secondPoll) {
                cnt2++;
            }
        });
        $('#third-tower').children().each(function () {
            if ($(this).css('backgroundColor') !== thirdPoll) {
                cnt3++;
            }
        });
        if (cnt1 || cnt2 || cnt3)
            return 0;
        return 1;
    }
}

const gameDecision = new GameDecision();

class clockTimer {

    clockTimer() {
        $('#btn').attr('disabled', 'true');
        var timeLeft = 300;
        var timer = setInterval(function () {
            if (gameDecision.gameStatus()) {
                clearInterval(timer);
                timeLeft = 0;
                $('.wining-msg').css('display', 'block');
                $('#timer').text('00:00');
                $('#btn').removeAttr('disabled');
                unDraggableDisk(true);
            }
            else if (timeLeft === 0) {
                clearInterval(timer);
                timeLeft = 0;
                $('.losing-msg').css('display', 'block');
                $('#timer').text('00:00');
                $('#btn').removeAttr('disabled');
                unDraggableDisk(true);
            }
            var timeleft = timeLeft--;
            var timeleft1 = Math.floor(timeleft / 60);
            var timeleft2 = timeleft % 60;
            var result = '0' + timeleft1.toString() + ' : ' + ((timeleft2 < 10) ? '0' : '') + timeleft2.toString();
            $('#timer').text(result);
        }, 1000);
    }

}

var colorMap = [];
var idMap = [];
const rand = new randomNumberOnly();
function addingDiskRandomly(lastPositionX, lastPositionY) {
    var firstPoll = document.getElementById('first-tower');
    var secondPoll = document.getElementById('second-tower');
    var thirdPoll = document.getElementById('third-tower');
    var cnt = 0;
    colorMap = [];
    idMap = [];
    for (var i = 0; i < 3; i++) {
        var randColor = rand.randColorFun();
        var randColor1 = rand.randColorFun();
        var randColor2 = rand.randColorFun();
        var tempo = 100, id = 0;
        while (tempo--) {
            var randNumber = Math.floor(Math.random() * 9);
            if (!idMap[randNumber]) {
                id = randNumber;
                idMap[randNumber] = 1;
                break;
            }
            else if (idMap[randNumber] <= 9) {
                id = randNumber;
                break;
            }
        }
        var diskElement = rand.initDisk(lastPositionX - cnt, lastPositionY, randColor, id);
        var diskElement1 = rand.initDisk(lastPositionX - cnt, lastPositionY, randColor1, id);
        var diskElement2 = rand.initDisk(lastPositionX - cnt, lastPositionY, randColor2, id);
        firstPoll === null || firstPoll === void 0 ? void 0 : firstPoll.appendChild(diskElement);
        secondPoll === null || secondPoll === void 0 ? void 0 : secondPoll.appendChild(diskElement1);
        thirdPoll === null || thirdPoll === void 0 ? void 0 : thirdPoll.appendChild(diskElement2);
        cnt += 30;
    }
}

function revertableDisk() {
    var firstPoll = $('#first-tower > div::last-child');
    var secondPoll = $('#second-tower > div::last-child');
    var thirdPoll = $('#third-tower > div::last-child');
    firstPoll.draggable({
        revert: true
    });
    secondPoll.draggable({
        revert: true
    });
    thirdPoll.draggable({
        revert: true
    });
}
function unDraggableDisk(last) {
    $('#first-tower').children().each(function () {
        $(this).draggable('disable');
    });
    $('#second-tower').children().each(function () {
        $(this).draggable('disable');
    });
    $('#third-tower').children().each(function () {
        $(this).draggable('disable');
    });
    if (!last) {
        var firstPoll = $('#first-tower > div::last-child');
        var secondPoll = $('#second-tower > div::last-child');
        var thirdPoll = $('#third-tower > div::last-child');
        firstPoll.draggable('enable');
        secondPoll.draggable('enable');
        thirdPoll.draggable('enable');
    }
}
function draggableDisk() {
    var firstPoll = $('#first-tower > div::last-child');
    var secondPoll = $('#second-tower > div::last-child');
    var thirdPoll = $('#third-tower > div::last-child');
    firstPoll.draggable();
    secondPoll.draggable();
    thirdPoll.draggable();
}
$(function () {
    $('#first-tower').droppable({
        activate: function (event, ui) {
            revertableDisk();
            $('#first-tower').addClass('dropHover');
        },
        deactivate: function (event, ui) {
            $('#first-tower').removeClass('dropHover');
        },
        dropable: "touch",
        drop: function (event, ui) {
            var dropable = $("#first-tower").droppable("option", "dropable");
            if (dropable === 'touch') {
                ui.draggable.draggable('option', 'revert', false);
                var tempTop = $('#first-tower > div::last-child').position().top;
                tempTop -= 30;
                var item = ui.draggable.css('top', tempTop).css('left', '52px');
                if (ui.draggable.parent().attr('id') === 'first-tower') {
                    unDraggableDisk(false);
                    draggableDisk();
                    revertableDisk();
                }
                else {
                    $(this).append(item);
                    unDraggableDisk(false);
                    draggableDisk();
                    numberOfMoves++;
                    $('#move').text(numberOfMoves.toString());
                }
                draggableDisk();
                console.log($('#first-tower > div::last-child'));
            }
        }
    });
    $('#second-tower').droppable({
        activate: function (event, ui) {
            revertableDisk();
            $('#second-tower').addClass('dropHover');
        },
        deactivate: function (event, ui) {
            $('#second-tower').removeClass('dropHover');
        },
        dropable: "touch",
        drop: function (event, ui) {
            var dropable = $("#second-tower").droppable("option", "dropable");
            if (dropable === 'touch') {
                ui.draggable.draggable('option', 'revert', false);
                var tempTop = $('#second-tower > div::last-child').position().top;
                tempTop -= 30;
                var item = ui.draggable.css('top', tempTop).css('left', '52px');
                if (ui.draggable.parent().attr('id') === 'second-tower') {
                    unDraggableDisk(false);
                    draggableDisk();
                    revertableDisk();
                }
                else {
                    $(this).append(item);
                    unDraggableDisk(false);
                    draggableDisk();
                    numberOfMoves++;
                    $('#move').text(numberOfMoves.toString());
                }
                draggableDisk();
            }
        }
    });
    $('#third-tower').droppable({
        activate: function (event, ui) {
            revertableDisk();
            $('#third-tower').addClass('dropHover');
        },
        deactivate: function (event, ui) {
            $('#third-tower').removeClass('dropHover');
        },
        dropable: "touch",
        drop: function (event, ui) {
            var dropable = $("#third-tower").droppable("option", "dropable");
            if (dropable === 'touch') {
                ui.draggable.draggable('option', 'revert', false);
                var tempTop = $('#third-tower > div::last-child').position().top;
                tempTop -= 30;
                var item = ui.draggable.css('top', tempTop).css('left', '52px');
                if (ui.draggable.parent().attr('id') === 'third-tower') {
                    unDraggableDisk(false);
                    draggableDisk();
                    revertableDisk();
                }
                else {
                    $(this).append(item);
                    unDraggableDisk(false);
                    draggableDisk();
                    numberOfMoves++;
                    $('#move').text(numberOfMoves.toString());
                }
                draggableDisk();
            }
        }
    });
});

const clock = new clockTimer();
addingDiskRandomly(251, 52);
(id_value = document.getElementById('btn')) === null || id_value === void 0 ? void 0 : id_value.addEventListener('click', function () {
    $('#move').text("0");
    numberOfMoves = 0;
    rand.removeDisk();
    addingDiskRandomly(251, 52);
    draggableDisk();
    clock.clockTimer();
    $('.wining-msg').css('display', 'none');
    $('.losing-msg').css('display', 'none');
});
