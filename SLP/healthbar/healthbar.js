function updateHealthBar(healthBar, value) {
  value = Math.round(value);
  healthBar.querySelector(".health_fill").style.width = `${value}%`;
  healthBar.querySelector(".health_text").textContent = `${value}%`;
}

const myHealthBar = document.querySelector(".health");


// Example 
updateHealthBar(myHealthBar, 50);

var c = document.getElementById('canvas')
var ctx = c.getContext('2d')
var playerImg = new Image()

// http://i.imgur.com/ruZv0dl.png sees a CLEAR, CRISP image
playerImg.src = 'http://i.imgur.com/ruZv0dl.png'
playerImg.width = 32
playerImg.height = 32

playerImg.onload = function() {
  ctx.drawImage(playerImg, 0, 0, 32, 32);
};

$("#clear").on("click", function()
{
  location.href = "healthbar.html";
});
