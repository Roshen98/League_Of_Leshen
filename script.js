
document.getElementById("startGameBtn").addEventListener('mouseup', login);

function showElement() {
  card_visible = document.querySelector('.card-deck');
  card_visible.style.visibility = 'visible';
}

$("#beginStoryBtn").on("click", function()
{
  location.href = "gameplay.html";
  var audio = new Audio("assets/story_music.mp3");
  audio.loop = true;
  audio.play();
});

// Keys Pressed on Keyboard
document.addEventListener('keydown', login);

function login(element){
  
  if(element.keyCode == 13 || element.button == 0){
    event.preventDefault();
    var audio = new Audio("assets/background_music.mp3");
    audio.loop = true;
    audio.play();
    var pName = $("#playerName").val();
    jQuery("#greetingSpan").text("Hello " + pName + ". Please choose your character below.");
    showElement();
  }
}
