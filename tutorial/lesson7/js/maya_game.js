var LEFT = 37;
var RIGHT = 39;
var SPACE = 32;

var Key = {
  /*
   * The Key object helps us keep track of which keys are currently pressed
   * using the keydown event directly doesn't when pressing two keys and
   * adds a delay when the user keeps the keys pressed
   * copied from: http://nokarma.org/2011/02/27/javascript-game-development-keyboard-input/index.html
   */
  _pressed: {},

  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  
  isDown: function(keyCode) {
    return this._pressed[keyCode];
  },
  
  onKeydown: function(event) {
    this._pressed[event.keyCode] = true;
  },
  
  onKeyup: function(event) {
    delete this._pressed[event.keyCode];
  }
};

var maya = { 
    timer_ticks : 20, // higher is faster
    flapping_rate: 3,          // higher is slower
    avatars: ["img/maya_rest.png", "img/maya_up.png", "img/maya_rest.png", "img/maya_down.png"],
    next_target: {"p": "l", "l": "a", "a": "y", "y": "p"},
    target: 0,
    score: 0,
    timer: 0,
    cycle: 0,
    hotspots: [],
    ghosts: [{"left": 120, "top": 30, "v":4 , "id": "ghost1"},
             {"left": 120, "top": 300, "v": -4, "id": "ghost2"}],
    fall_t: 0, // how long did maya started falling? 

    init: function () {
        $("#play").click(maya.play);
        $(document).keydown(function(event) {Key.onKeydown(event); });
        $(document).keyup(function(event) {Key.onKeyup(event); });
    },

    // moving maya ledt, right, up and falling down
    move_maya: function() {
        if (Key.isDown(LEFT)) {
            maya.posX -= 4;
            $("#maya").css("left", String(maya.posX)+"px");
        }
        if (Key.isDown(RIGHT)) {
            maya.posX += 4;
            $("#maya").css("left", String(maya.posX)+"px");
        }
        if (Key.isDown(SPACE)) {
            maya.space_down = true;
            maya.posY -= 4;
            $("#maya").css("top", String(maya.posY)+"px");
            maya.fall_t = 0;
            // flap wings
            if (maya.timer % maya.flapping_rate === 0) {
                maya.flap_wings();
            }
        }
        else {
            if (maya.posY < 337) {
                var v = 10*maya.fall_t/5;
                maya.fall_t ++;
                maya.posY += v;
                $("#maya").css("top", String(maya.posY)+"px");
            }
        }
    },

    // main timer function
    countdown: function () {
        maya.timer --;
        // test for game over
        if (maya.timer === 0) {
            maya.target = 0;
            alert("Game Over!\nyour score is " + maya.score);
            $(".hotspot").css({color:"black"});
        }
        else {
            // set the next timer
            setTimeout(maya.countdown, 1000/maya.timer_ticks);
            // and update the timer display
            $("#timer").html(maya.timer/maya.timer_ticks);
            // check if maya found the target - 
            // a hit is made by entering a 20X20 rectangle around the target
            var target_pos = $("#"+maya.target).position();
            if (maya.posX > target_pos.left-20 && maya.posX < target_pos.left+20  &&
                maya.posY > target_pos.top-20 && maya.posY < target_pos.top+20) {
                maya.score ++;
                maya.target = maya.next_target[maya.target];
                $(".hotspot").css({color: "white"});
                var target_id = "#" + maya.target;
                $(target_id).css({color: "black"});
                $("#scoreii").html(maya.score);
            }
            // move the ghosts by looping on all ghosts, changing their Y position
            // based on their speed and changing direction if necessary
            for (var i=0; i<maya.ghosts.length; i++) {
                var g = maya.ghosts[i];
                g.top += g.v;
                $("#"+g.id).css("top", String(g.top)+"px");
                if (g.top < 30 || g.top > 300) {
                    g.v = -g.v;
                }
            }
            maya.move_maya();
        }
    },
    play: function () {
        if (maya.target === 0) {
            var pos = $("#maya").position();
            maya.posX = pos.left;
            maya.posY = pos.top;
            maya.timer = 60*maya.timer_ticks;
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
