var TIMER_TICKS = 10; // how many times do we countdown in a second
var FLAPPING_SPEED = 3;
var maya_avatars = ["img/maya_rest.png", "img/maya_up.png", "img/maya_down.png"];
var state=0;
var score=0;
var timer;
var maya = { 
    timer_ticks : 20, // higher is faster
    flapping_rate: 3,          // higher is slower
    avatars: ["img/maya_rest.png", "img/maya_up.png", "img/maya_down.png"],
    state: 0,
    score: 0,
    timer: 0,
    cycle: 0,
    init: function () {
        $("#play").click(maya.play);
        $("#x").hover(maya.hoverX);
        $("#y").hover(maya.hoverY);
    },
    //
    // hover() hovering over a goal - score update, etc..
    // params:
    //  over_what - 'x' or 'y'
    hover: function (over_what) {
        var time2toggle = {'y': 1, 'x': 2};
        if (maya.state == time2toggle[over_what]) {
            score ++;
            // toggle the state:
            // TODO: how to simply change state from 1 to 2 and 2 to 1?
            if (maya.state == 1)
                maya.state = 2;
            else
                maya.state = 1;
            $(".hotspot").css({color: "black"});
            $("#"+over_what).css({color: "white"});
            $("#scoreii").html(score);
        }
    },
    // 
    // hoverX and hoverY are just routers
    hoverX: function () { maya.hover('x'); },
    hoverY: function () { maya.hover('y'); },
    //
    //
    countdown: function () {
        maya.timer --;
        // test for game over
        if (maya.timer === 0) {
            maya.state = 0;
            alert("Game Over!\nyour score is " + maya.score);
            $(".hotspot").css({color:"black"});
        }
        else
            setTimeout(maya.countdown, 1000/maya.timer_ticks);
        // flap maya's wings
        if (maya.timer % maya.flapping_rate === 0) {
            maya.cycle ++;
            if (maya.cycle > maya.avatars.length)
                maya.cycle = 0;
            $('#maya img').attr('src', maya.avatars[maya.cycle]);
            // and update the timer
            $("#timer").html(maya.timer/maya.timer_ticks);
            // TODO: make maya flow the mouse
        }
    },
    play: function () {
        maya.timer = 11*maya.timer_ticks;
        maya.score = 0;
        maya.state = 1;
        $("#scoreii").html(maya.score);
        $("#y").css({color: "black"});
        $("#x").css({color: "white"});
        setTimeout(maya.countdown, 1000/maya.timer_ticks);
    }
};
        
$(document).ready(maya.init);
