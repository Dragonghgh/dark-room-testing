const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let player = { x: 50, y: 50 };
let monster = { x: 300, y: 300 };
let playing = false;

function newGame() {
  localStorage.setItem("save", JSON.stringify(player));
  startGame();
}

function continueGame() {
  const save = localStorage.getItem("save");
  if (save) player = JSON.parse(save);
  startGame();
}

function startGame() {
  document.getElementById("menu").classList.add("hidden");
  document.getElementById("loading").classList.remove("hidden");

  setTimeout(() => {
    document.getElementById("loading").classList.add("hidden");
    canvas.classList.remove("hidden");
    playing = true;
    requestAnimationFrame(loop);
  }, 1500);
}

document.addEventListener("keydown", e => {
  if (!playing) return;

  if (e.key === "ArrowUp") player.y -= 5;
  if (e.key === "ArrowDown") player.y += 5;
  if (e.key === "ArrowLeft") player.x -= 5;
  if (e.key === "ArrowRight") player.x += 5;

  localStorage.setItem("save", JSON.stringify(player));
});

function loop() {
  if (!playing) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Player
  ctx.fillStyle = "white";
  ctx.fillRect(player.x, player.y, 10, 10);

  // Monster slowly follows
  monster.x += (player.x - monster.x) * 0.01;
  monster.y += (player.y - monster.y) * 0.01;

  ctx.fillStyle = "red";
  ctx.fillRect(monster.x, monster.y, 15, 15);

  // Jumpscare
  if (Math.abs(player.x - monster.x) < 10 &&
      Math.abs(player.y - monster.y) < 10) {
    jumpscare();
    return;
  }

  requestAnimationFrame(loop);
}

function jumpscare() {
  playing = false;
  document.body.style.background = "red";
  alert("DON'T LOOK BACK");
  location.reload();
}
