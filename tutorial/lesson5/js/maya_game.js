var maya = { 
    timer_ticks : 20, // higher is faster
    flapping_rate: 3,          // higher is slower
    avatars: ["img/maya_rest.png", "img/maya_up.png", "img/maya_rest.png", "img/maya_down.png"],
    next_target: {"p": "l", "l": "a", "a": "y", "y": "p"},
    target: 0,
    score: 0,
    timer: 0,
    cycle: 0,
    init: function () {
        $("#play").click(maya.play);
        $(".hotspot").hover(maya.hover);
    },
    /*
        hover
        =====
        hovering over a hotspot - update score & target
        params:
            this.id - 'p', 'l', 'a' or 'y'

    */  
    hover: function () {
        if (this.id == maya.target) {
            maya.score ++;
            maya.target = maya.next_target[this.id];
            $(".hotspot").css({color: "white"});
            var target_id = "#" + maya.target;
            $(target_id).css({color: "black"});
            $("#scoreii").html(maya.score);
        }
    },
    countdown: function () {
        maya.timer --;
        // test for game over
        if (maya.timer === 0) {
            maya.target = 0;
            alert("Game Over!\nyour score is " + maya.score);
            $(".hotspot").css({color:"black"});
        }
        else {
            setTimeout(maya.countdown, 1000/maya.timer_ticks);
        }
        if (maya.timer % maya.flapping_rate === 0) {
            maya.flap_wings();
            // and update the timer
            $("#timer").html(maya.timer/maya.timer_ticks);
            // TODO: make maya flow the mouse
        }
    },
    play: function () {
        if (maya.target === 0) {
            maya.timer = 11*maya.timer_ticks;
            maya.score = 0;
            maya.target = 'p';
            $("#scoreii").html(maya.score);
            $(".hotspot").css({color: "white"});
            $("#"+maya.target).css({color: "black"});
            setTimeout(maya.countdown, 1000/maya.timer_ticks);
        }
    },
    flap_wings: function () {
        // flap maya's wings
        maya.cycle ++;
        if (maya.cycle > maya.avatars.length) {
            maya.cycle = 0;
        }
        $('#maya img').attr('src', maya.avatars[maya.cycle]);
    }
};
        
// ready is an Event and maya.init is our Callback
$(document).ready(maya.init);
