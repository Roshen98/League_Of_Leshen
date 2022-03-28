
// Background Music
var x = document.getElementById("myAudio");

function playAudio() {
  x.loop = true;
  x.play();
  element = document.querySelector('.game-container');
  element.style.visibility = 'visible';
  element = document.querySelector('.music');
  element.style.visibility = 'hidden';
}

// Create the canvas
var canvas = document.getElementById("game-canvas");
var context = canvas.getContext("2d");

// Next Button
function next_visible(){
  
  document.getElementById("storyline").innerHTML = "Press Q,W,E or R to kill the enemy! (Note: do not spam abilities, turn-based game)";
  
  // hide next button
  element = document.querySelector('#next');
  element.style.visibility = 'hidden';

  // display abilities
  element = document.querySelector('#actionBar');
  element.style.visibility = 'visible';

  // remove story line 2 in a few seconds
  var img = context.createImageData(300, 10);
  for (var i = img.data.length; --i >= 0; )
    img.data[i] = 0;
      
  setTimeout(() => { 
    context.putImageData(img, 10,40); 
  }, 10000);

}

// Create Diana 
var diana = new Image();
var diana_full_health = 570; //570
var q_ability_damage = 200; //60
var w_ability_damage = 66; // 3*18 = 54
var w_shield = 90; // 30
var e_ability_damage = 120;
var r_ability_damage = 400;
let diana_health = diana_full_health;
diana.src = "/assets/small_diana.png";
// diana.width = 200;
// diana.height = 200;
diana.onload = function () {
  //context.imageSmoothingEnabled = false;
	context.drawImage(diana, 0, 80);
  // 0, 80
};


// Create Monster1
const red_buff = new Image();
var red_buff_full_health = 1850; // original health : 1850
var red_buff_damage = 78;

let red_buff_health = red_buff_full_health;
red_buff.src = "/assets/red_buff.png";
red_buff.onload = function () {
	context.drawImage(red_buff, 160, 60, 200,200);
};

/*
// Create Monster2
const red_buff = new Image();
var red_buff_health = 185; // original health : 1850
var counter = 1;
red_buff.src = "/assets/blue_buff.png";
red_buff.onload = function () {
	context.drawImage(red_buff, 160, 60);
};
*/


// abilities done with keys pressed
function diana_attack(element){ 

  // enter to refresh the page
  if(element.keyCode == 13){
    location.reload();
  }

  // esc to restart the game
  else if(element.keyCode == 27){
    window.location.href = 'index.html';
  }

  else if(element.keyCode == 69){
    // if E pressed on keyboard 

    red_buff_health -= e_ability_damage;
    if(red_buff_health < 0)
      red_buff_health = 0;

    // removes original diana
    var img = context.createImageData(200, 200);
    for (var i = img.data.length; --i >= 0; )
      img.data[i] = 0;
    context.putImageData(img, 10, 10);

    // E on diana
    const e_ability = new Image();
    e_ability.src = "/assets/e_shadow.png";
    e_ability.onload = function () {
      context.drawImage(e_ability,30,40,140,150);
    }; 

    setTimeout(() => { 
      const lunar_rush = new Image();
      lunar_rush.src = "/assets/lunar_rush.png";
      lunar_rush.onload = function () {
        context.drawImage(lunar_rush,90,20,140,200);
      }
    }, 200);

    setTimeout(() => { 
      context.font = "20px Georgia";
      context.fillStyle = "red";
      context.fillText("-120",280,50); 
      updateMonsterHealth(myMonsterHealth, (red_buff_health/red_buff_full_health)*100);
    }, 1000);

    setTimeout(() => { 
      // remove everything on canvas
      var text_removal = context.createImageData(350, 198);
      for (var i = text_removal.data.length; --i >= 0; )
        text_removal.data[i] = 0;
      context.putImageData(text_removal, 0, 0); 

      // Recreate Diana 
      var recreate_diana = new Image();
      recreate_diana.src = "/assets/small_diana.png";
      // diana.width = 200;
      // diana.height = 200;
      recreate_diana.onload = function () {
        //context.imageSmoothingEnabled = false;
        context.drawImage(recreate_diana, 0, 80);
        // 0, 80
      };

    }, 2000);

    if(red_buff_health > 0){
      // Recreate Monster1
      setTimeout(() => { 
        const recreate_red_buff = new Image();
        recreate_red_buff.src = "/assets/red_buff.png";
        recreate_red_buff.onload = function () {
          context.drawImage(red_buff, 160, 60, 200,200);
        };
      },2000);

      setTimeout(() => { 
        const red_buff_attack = new Image();
        red_buff_attack.src = "/assets/scar.png";
        red_buff_attack.onload = function () {
          context.drawImage(red_buff_attack,50,50,100,100);
        }; 
      },3000);

      diana_health -= red_buff_damage;
      
      // diana get hit
      setTimeout(() => { 
        context.font = "20px Georgia";
        context.fillStyle = "red";
        context.fillText("-78",50,50);
        updateHealthBar(myHealthBar, (diana_health/diana_full_health)*100);
      },3500);

      if(diana_health > 0){
        
        // restore diana  
        setTimeout(() => { 
          // removes the damage 
          var img = context.createImageData(200, 200);
          for (var i = img.data.length; --i >= 0; )
            img.data[i] = 0;
          context.putImageData(img, 10, 10);

          // damaged_diana
          const damaged_diana = new Image();
          damaged_diana.src = "/assets/small_diana.png";
          damaged_diana.onload = function () {
            context.drawImage(damaged_diana, 0, 80);
          };
        }, 4500);
      }

      else{
        setTimeout(() => { 
          diana_health = 0;
          updateHealthBar(myHealthBar, (diana_health/diana_full_health)*100);
        }, 3500);

        setTimeout(() => { 
          // remove everything on canvas
          var text_removal = context.createImageData(350, 198);
          for (var i = text_removal.data.length; --i >= 0; )
            text_removal.data[i] = 0;
          context.putImageData(text_removal, 0, 0); 

          // recreate monster
          const recreate_red_buff = new Image();
          recreate_red_buff.src = "/assets/red_buff.png";
          recreate_red_buff.onload = function () {
            context.drawImage(red_buff, 160, 60, 200,200);
          };

          context.font = "30px Georgia";
          context.fillStyle = "red";
          context.fillText("OH NO YOU DIED!",50,50); 
        }, 4000);

        setTimeout(() => { 
          // remove everything on canvas
          var text_removal = context.createImageData(350, 198);
          for (var i = text_removal.data.length; --i >= 0; )
            text_removal.data[i] = 0;
          context.putImageData(text_removal, 0, 0); 

          // retry or return to story selection? 
          document.getElementById("storyline").innerHTML = "Press \"Enter\" to Retry and \"Esc\" to Restart the Game";
          context.fillStyle = 'White';
          context.fillRect(100,50, 150,120);
          context.font = "30px Georgia";
          context.fillStyle = "black";
          context.fillText("Retry?", 110,100);
          context.font = "30px Georgia";
          context.fillStyle = "black";
          context.fillText("Restart?",110,140);

        }, 5000);

      }

    }

    else{

      setTimeout(() => { 
        red_buff_health = 0;
        updateMonsterHealth(myMonsterHealth, (red_buff_health/red_buff_full_health)*100);
        context.font = "30px Georgia";
        context.fillStyle = "red";
        context.fillText("You Killed it!",50,50); 
      }, 2000);

      setTimeout(() => { 

        // remove everything on canvas
        var text_removal = context.createImageData(350, 198);
        for (var i = text_removal.data.length; --i >= 0; )
          text_removal.data[i] = 0;
        context.putImageData(text_removal, 0, 0); 

        // retry or return to story selection? 
        document.getElementById("storyline").innerHTML = "Press \"Enter\" to Retry and \"Esc\" to Restart the Game";
        context.fillStyle = 'White';
        context.fillRect(100,50, 150,120);
        context.font = "30px Georgia";
        context.fillStyle = "black";
        context.fillText("Retry?", 110,100);
        context.font = "30px Georgia";
        context.fillStyle = "black";
        context.fillText("Restart?",110,140);
      }, 3000);
    }

  }

  else if(element.keyCode == 82){
    // if R pressed on keyboard 

    red_buff_health -= r_ability_damage;
    if(red_buff_health < 0)
      red_buff_health = 0;

    // removes original diana
    var img = context.createImageData(200, 200);
    for (var i = img.data.length; --i >= 0; )
      img.data[i] = 0;
    context.putImageData(img, 10, 10);

    // R on diana
    const r_ability = new Image();
    r_ability.src = "/assets/moonfall.png";
    r_ability.onload = function () {
      context.drawImage(r_ability,140,50,140,140);
    }; 

    setTimeout(() => { 
      context.font = "20px Georgia";
      context.fillStyle = "red";
      context.fillText("-400!",280,50); 
      updateMonsterHealth(myMonsterHealth, (red_buff_health/red_buff_full_health)*100);
    }, 1000);

    setTimeout(() => { 
      // remove everything on canvas
      var text_removal = context.createImageData(350, 198);
      for (var i = text_removal.data.length; --i >= 0; )
        text_removal.data[i] = 0;
      context.putImageData(text_removal, 0, 0); 

      // Recreate Diana 
      var recreate_diana = new Image();
      recreate_diana.src = "/assets/small_diana.png";
      // diana.width = 200;
      // diana.height = 200;
      recreate_diana.onload = function () {
        //context.imageSmoothingEnabled = false;
        context.drawImage(recreate_diana, 0, 80);
        // 0, 80
      };

    }, 2000);

    if(red_buff_health > 0){
      // Recreate Monster1
      setTimeout(() => { 
        const recreate_red_buff = new Image();
        recreate_red_buff.src = "/assets/red_buff.png";
        recreate_red_buff.onload = function () {
          context.drawImage(red_buff, 160, 60, 200,200);
        };
      },2000);

      setTimeout(() => { 
        const red_buff_attack = new Image();
        red_buff_attack.src = "/assets/scar.png";
        red_buff_attack.onload = function () {
          context.drawImage(red_buff_attack,50,50,100,100);
        }; 
      },3000);

      diana_health -= red_buff_damage;
      
      // diana get hit
      setTimeout(() => { 
        context.font = "20px Georgia";
        context.fillStyle = "red";
        context.fillText("-78",50,50);
        updateHealthBar(myHealthBar, (diana_health/diana_full_health)*100);
      },3500);

      if(diana_health > 0){
        
        // restore diana  
        setTimeout(() => { 
          // removes the damage 
          var img = context.createImageData(200, 200);
          for (var i = img.data.length; --i >= 0; )
            img.data[i] = 0;
          context.putImageData(img, 10, 10);

          // damaged_diana
          const damaged_diana = new Image();
          damaged_diana.src = "/assets/small_diana.png";
          damaged_diana.onload = function () {
            context.drawImage(damaged_diana, 0, 80);
          };
        }, 4500);
      }

      else{
        setTimeout(() => { 
          diana_health = 0;
          updateHealthBar(myHealthBar, (diana_health/diana_full_health)*100);
        }, 3500);

        setTimeout(() => { 
          // remove everything on canvas
          var text_removal = context.createImageData(350, 198);
          for (var i = text_removal.data.length; --i >= 0; )
            text_removal.data[i] = 0;
          context.putImageData(text_removal, 0, 0); 

          // recreate monster
          const recreate_red_buff = new Image();
          recreate_red_buff.src = "/assets/red_buff.png";
          recreate_red_buff.onload = function () {
            context.drawImage(red_buff, 160, 60, 200,200);
          };

          context.font = "30px Georgia";
          context.fillStyle = "red";
          context.fillText("OH NO YOU DIED!",50,50); 
        }, 4000);

        setTimeout(() => { 
          // remove everything on canvas
          var text_removal = context.createImageData(350, 198);
          for (var i = text_removal.data.length; --i >= 0; )
            text_removal.data[i] = 0;
          context.putImageData(text_removal, 0, 0); 

          // retry or return to story selection? 
          document.getElementById("storyline").innerHTML = "Press \"Enter\" to Retry and \"Esc\" to Restart the Game";
          context.fillStyle = 'White';
          context.fillRect(100,50, 150,120);
          context.font = "30px Georgia";
          context.fillStyle = "black";
          context.fillText("Retry?", 110,100);
          context.font = "30px Georgia";
          context.fillStyle = "black";
          context.fillText("Restart?",110,140);

        }, 5000);

      }

    }

    else{

      setTimeout(() => { 
        red_buff_health = 0;
        updateMonsterHealth(myMonsterHealth, (red_buff_health/red_buff_full_health)*100);
        context.font = "30px Georgia";
        context.fillStyle = "red";
        context.fillText("You Killed it!",50,50); 
      }, 2000);

      setTimeout(() => { 

        // remove everything on canvas
        var text_removal = context.createImageData(350, 198);
        for (var i = text_removal.data.length; --i >= 0; )
          text_removal.data[i] = 0;
        context.putImageData(text_removal, 0, 0); 

        // retry or return to story selection? 
        document.getElementById("storyline").innerHTML = "Press \"Enter\" to Retry and \"Esc\" to Restart the Game";
        context.fillStyle = 'White';
        context.fillRect(100,50, 150,120);
        context.font = "30px Georgia";
        context.fillStyle = "black";
        context.fillText("Retry?", 110,100);
        context.font = "30px Georgia";
        context.fillStyle = "black";
        context.fillText("Restart?",110,140);
      }, 3000);
    }
      

      
  }

  else if(element.keyCode == 87){
    // if w pressed on keyboard 
    const w_ability = new Image();
    w_ability.src = "/assets/pale_cascade.png";
    w_ability.onload = function () {
      context.drawImage(w_ability,35,70,50,110);
    }; // W on diana

    // enemy attacks
    setTimeout(() => { 
      const red_buff_attack = new Image();
      // blocked
      red_buff_attack.src = "/assets/scar.png";
      red_buff_attack.onload = function () {
        context.drawImage(red_buff_attack,50,50,100,100);
      }; 
    }, 500);

    // enemy got hit by first orb
    setTimeout(() => { 
      red_buff_health -= w_ability_damage;
      context.font = "20px Georgia";
      context.fillStyle = "red";
      context.fillText("-66",280,50); 
      updateMonsterHealth(myMonsterHealth, (red_buff_health/red_buff_full_health)*100);
    }, 1500);

    // two orbs diana
    setTimeout(() => { 
        // removes the damage 
        var img = context.createImageData(200, 200);
  
        for (var i = img.data.length; --i >= 0; )
          img.data[i] = 0;
          
        context.putImageData(img, 10, 10);

        // damaged_diana
        const damaged_diana = new Image();
        damaged_diana.src = "/assets/diana_2_orbits.png";
        damaged_diana.onload = function () {
          context.drawImage(damaged_diana,35,70,50,110);
        };

        // enemy got hit by the second orb
        red_buff_health -= w_ability_damage;
        context.font = "20px Georgia";
        context.fillStyle = "red";
        context.fillText("-66",250,50); 
        updateMonsterHealth(myMonsterHealth, (red_buff_health/red_buff_full_health)*100);
      }, 2000);


    setTimeout(() => { 
        // removes the damage 
        var img = context.createImageData(200, 200);
  
        for (var i = img.data.length; --i >= 0; )
          img.data[i] = 0;
          
        context.putImageData(img, 10, 10);

        // damaged_diana
        const damaged_diana = new Image();
        damaged_diana.src = "/assets/one_orb.png";
        damaged_diana.onload = function () {
          context.drawImage(damaged_diana,35,70,50,110);
        };

        // enemy got hit by the second orb
        red_buff_health -= w_ability_damage;
        context.font = "20px Georgia";
        context.fillStyle = "red";
        context.fillText("-66",300,70); 
        updateMonsterHealth(myMonsterHealth, (red_buff_health/red_buff_full_health)*100);

    }, 3000);

    // just shield diana
    setTimeout(() => { 
        // removes the damage 
        var img = context.createImageData(200, 200);
  
        for (var i = img.data.length; --i >= 0; )
          img.data[i] = 0;
          
        context.putImageData(img, 10, 10);

        // damaged_diana
        const damaged_diana = new Image();
        damaged_diana.src = "/assets/diana_just_shield.png";
        damaged_diana.onload = function () {
          context.drawImage(damaged_diana,35,70,50,110);
        };

         // blocked
        context.font = "30px Georgia";
        context.fillStyle = "red";
        context.fillText("Blocked!",50,50); 
  
    }, 4000);

    // remove everything on canvas
    setTimeout(() => { 
      var text_removal = context.createImageData(350, 198);
      for (var i = text_removal.data.length; --i >= 0; )
      text_removal.data[i] = 0;
      context.putImageData(text_removal, 0, 0);  

      // Recreate Diana 
      var recreate_diana = new Image();
      recreate_diana.src = "/assets/small_diana.png";
      // diana.width = 200;
      // diana.height = 200;
      recreate_diana.onload = function () {
        //context.imageSmoothingEnabled = false;
        context.drawImage(recreate_diana, 0, 80);
        // 0, 80
      };
    }, 4500);

    if(red_buff_health > 0){

      setTimeout(() => { 
        // Recreate monster
        const recreate_red_buff = new Image();
        recreate_red_buff.src = "/assets/red_buff.png";
        recreate_red_buff.onload = function () {
          context.drawImage(red_buff, 160, 60, 200,200);
        };
      },4500);
      
    }

    else{

      setTimeout(() => { 
        red_buff_health = 0;
        updateMonsterHealth(myMonsterHealth, (red_buff_health/red_buff_full_health)*100);
        context.font = "30px Georgia";
        context.fillStyle = "red";
        context.fillText("You Killed it!",50,50); 
      }, 4500);

      setTimeout(() => { 

        // remove everything on canvas
        var text_removal = context.createImageData(350, 198);
        for (var i = text_removal.data.length; --i >= 0; )
          text_removal.data[i] = 0;
        context.putImageData(text_removal, 0, 0); 

        // retry or return to story selection? 
        document.getElementById("storyline").innerHTML = "Press \"Enter\" to Retry and \"Esc\" to Restart the Game";
        context.fillStyle = 'White';
        context.fillRect(100,50, 150,120);
        context.font = "30px Georgia";
        context.fillStyle = "black";
        context.fillText("Retry?", 110,100);
        context.font = "30px Georgia";
        context.fillStyle = "black";
        context.fillText("Restart?",110,140);
      }, 5500);
    }

    

    
    
    
  }

 // element.button == 0 ||    for clicking
  else if( element.keyCode == 81){
    // if q pressed on keyboard 
    const q_ability = new Image();
    red_buff_health -= q_ability_damage;
  
    q_ability.src = "/assets/crescent_strike.png";
    q_ability.onload = function () {
      context.drawImage(q_ability,80,100,200,70);
    };

    // monster hp lost
    setTimeout(() => { 
      context.font = "20px Georgia";
      context.fillStyle = "red";
      context.fillText("-60",280,50); 
      updateMonsterHealth(myMonsterHealth, (red_buff_health/red_buff_full_health)*100);
    }, 800);

    setTimeout(() => { 
      // remove everything on canvas
      var text_removal = context.createImageData(350, 198);
      for (var i = text_removal.data.length; --i >= 0; )
        text_removal.data[i] = 0;
      context.putImageData(text_removal, 0, 0); 

      // Recreate Diana 
      var recreate_diana = new Image();
      recreate_diana.src = "/assets/small_diana.png";
      // diana.width = 200;
      // diana.height = 200;
      recreate_diana.onload = function () {
        //context.imageSmoothingEnabled = false;
        context.drawImage(recreate_diana, 0, 80);
        // 0, 80
      };
    }, 1500);

    if(red_buff_health > 0){

      setTimeout(() => { 
        // Recreate monster
        const recreate_red_buff = new Image();
        recreate_red_buff.src = "/assets/red_buff.png";
        recreate_red_buff.onload = function () {
          context.drawImage(red_buff, 160, 60, 200,200);
        };
      },1500);

      // monster attack
      setTimeout(() => { 
        const red_buff_attack = new Image();
        red_buff_attack.src = "/assets/scar.png";
        red_buff_attack.onload = function () {
          context.drawImage(red_buff_attack,50,50,100,100);
        }; 
      },2000);

      diana_health -= red_buff_damage;
      
      // diana get hit
      setTimeout(() => { 
        context.font = "20px Georgia";
        context.fillStyle = "red";
        context.fillText("-78",50,50);
        updateHealthBar(myHealthBar, (diana_health/diana_full_health)*100);
      },2500);

      if(diana_health > 0){
        
        // restore diana  
        setTimeout(() => { 
          // removes the damage 
          var img = context.createImageData(200, 200);
          for (var i = img.data.length; --i >= 0; )
            img.data[i] = 0;
          context.putImageData(img, 10, 10);

          // damaged_diana
          const damaged_diana = new Image();
          damaged_diana.src = "/assets/small_diana.png";
          damaged_diana.onload = function () {
            context.drawImage(damaged_diana, 0, 80);
          };
        }, 3500);
      }

      else{
        setTimeout(() => { 
          diana_health = 0;
          updateHealthBar(myHealthBar, (diana_health/diana_full_health)*100);
        }, 2500);

        setTimeout(() => { 
          // remove everything on canvas
          var text_removal = context.createImageData(350, 198);
          for (var i = text_removal.data.length; --i >= 0; )
            text_removal.data[i] = 0;
          context.putImageData(text_removal, 0, 0); 

          // recreate monster
          const recreate_red_buff = new Image();
          recreate_red_buff.src = "/assets/red_buff.png";
          recreate_red_buff.onload = function () {
            context.drawImage(red_buff, 160, 60, 200,200);
          };

          context.font = "30px Georgia";
          context.fillStyle = "red";
          context.fillText("OH NO YOU DIED!",50,50); 
        }, 3000);

        setTimeout(() => { 
          // remove everything on canvas
          var text_removal = context.createImageData(350, 198);
          for (var i = text_removal.data.length; --i >= 0; )
            text_removal.data[i] = 0;
          context.putImageData(text_removal, 0, 0); 

          // retry or return to story selection? 
          document.getElementById("storyline").innerHTML = "Press \"Enter\" to Retry and \"Esc\" to Restart the Game";
          context.fillStyle = 'White';
          context.fillRect(100,50, 150,120);
          context.font = "30px Georgia";
          context.fillStyle = "black";
          context.fillText("Retry?", 110,100);
          context.font = "30px Georgia";
          context.fillStyle = "black";
          context.fillText("Restart?",110,140);

        }, 4000);

      }

    }

    else{

      setTimeout(() => { 
        red_buff_health = 0;
        updateMonsterHealth(myMonsterHealth, (red_buff_health/red_buff_full_health)*100);
        context.font = "30px Georgia";
        context.fillStyle = "red";
        context.fillText("You Killed it!",50,50); 
      }, 1500);

      setTimeout(() => { 

        // remove everything on canvas
        var text_removal = context.createImageData(350, 198);
        for (var i = text_removal.data.length; --i >= 0; )
          text_removal.data[i] = 0;
        context.putImageData(text_removal, 0, 0); 

        // retry or return to story selection? 
        document.getElementById("storyline").innerHTML = "Press \"Enter\" to Retry and \"Esc\" to Restart the Game";
        context.fillStyle = 'White';
        context.fillRect(100,50, 150,120);
        context.font = "30px Georgia";
        context.fillStyle = "black";
        context.fillText("Retry?", 110,100);
        context.font = "30px Georgia";
        context.fillStyle = "black";
        context.fillText("Restart?",110,140);
      }, 2500);
    }

  }

}

  

// Keys Pressed on Keyboard
document.addEventListener('keydown', diana_attack);

/*
// When the crescent strike(Q) is clicked
document.getElementById("q").addEventListener('mouseup', diana_attack);

// When the pale cascade(W) is clicked
document.getElementById("w").addEventListener('mouseup', diana_attack);

// When the lunar rush(E) is clicked
document.getElementById("e").addEventListener('mouseup', diana_attack);

// When the moonfall(R) is clicked
document.getElementById("r").addEventListener('mouseup', diana_attack);
*/


// Health Bar
function updateHealthBar(healthBar, value) {
  value = Math.round(value);
  healthBar.querySelector(".health_fill").style.width = `${value}%`;
  healthBar.querySelector(".health_text").textContent = `${value}%`;
}

const myHealthBar = document.querySelector(".health");

updateHealthBar(myHealthBar, (diana_health/diana_full_health)*100);

//Monster Health
function updateMonsterHealth(monsterHealth, value) {
  value = Math.round(value);
  monsterHealth.querySelector(".monster_fill").style.height = `${value}%`;
  monsterHealth.querySelector(".monster_text").textContent = `${value}%`;
}

const myMonsterHealth = document.querySelector(".monsterhealth");

updateMonsterHealth(myMonsterHealth, (red_buff_health/red_buff_full_health)*100);



/* 
*****************************************************
FEEDBACK
- Put Q,W,E,R on abilities to know which one is which 
- make passive work
- monster hp bar on top in red
- 
*/