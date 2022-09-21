var trex, trexCorrendo, trexParado;
var solo, imgSolo, soloInvisivel;
var imgNuvem, nuvens;
var imgCacto1, imgCacto2, imgCacto3, imgCacto4, imgCacto5, imgCacto6, cactos;
var gameOver, imgGameOver, btnReiniciar, imgBtnReiniciar;
var somPular, somBateu;
var p1, p2;
var pontuacao = 0;
var vidas = 5;
var maiorPont = 0;
var FIM = 2;
var JOGANDO = 1;
var PARADO = 0;
var estadoJogo = JOGANDO;
var soma = -8;


function preload() {
  trexCorrendo = loadAnimation("img/trex1.png", "img/trex2.png", "img/trex3.png");
  trexParado = loadImage("img/trex_parado.png");
  imgSolo = loadImage("img/solo.png");
  imgNuvem = loadImage("img/nuvem.png");
  imgCacto1 = loadImage("img/cacto1.png");
  imgCacto2 = loadImage("img/cacto2.png");
  imgCacto3 = loadImage("img/cacto3.png");
  imgCacto4 = loadImage("img/cacto4.png");
  imgCacto5 = loadImage("img/cacto5.png");
  imgCacto6 = loadImage("img/cacto6.png");
  imgGameOver = loadImage("img/gameOver.png");
  imgReiniciar = loadImage("img/reiniciar.png");
  somPular = loadSound("sound/pular.mp3");
  somBateu = loadSound("sound/bateu.mp3");
}
function setup() {
  createCanvas(500, 400);

  trex = createSprite(50, 340, 30, 30);
  trex.addAnimation("running", trexCorrendo);
  trex.addImage("collided", trexParado);
  trex.scale = 0.5;
  trex.setCollider("circle", 0, 0, 30);
  //trex.debug = true;

  solo = createSprite(250, 360, 500, 20);
  solo.addImage("ground", imgSolo);

  gameOver = createSprite(250, 200);
  gameOver.addImage(imgGameOver);
  gameOver.scale = 0.5;
  gameOver.visible = false;

  reiniciar = createSprite(250, 240);
  reiniciar.addImage(imgReiniciar);
  reiniciar.scale = 0.5;
  reiniciar.visible = false;

  soloInvisivel = createSprite(250, 370, 500, 20);
  soloInvisivel.visible = false;

  p1 = createSprite(165, 35, 1, 15);
  p1 = createSprite(285, 35, 1, 15);

  nuvens = new Group();
  cactos = new Group();
}

function draw() {
  background(250);

  text("Vidas: " + vidas, 95, 40);
  text("Pontuação: " + pontuacao, 180, 40);
  text("Maior Pontuação: " + maiorPont, 295, 40);

  if (estadoJogo === JOGANDO) {
    playingGame();
  }
  else if (estadoJogo === PARADO) {
    waitingGame();
  }

  drawSprites();
}
