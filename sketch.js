//variaveis
var trex, trexCorrendo, trexParado;

var solo, imgSolo, soloInvisivel;

var imgNuvem;

var imgCacto1, imgCacto2, imgCacto3, imgCacto4, imgCacto5, imgCacto6;

var gameOver, imgGameOver, btnReiniciar, imgBtnReiniciar;

var cactos, nuvens;

var p1, p2;

var pontuacao = 0;

var vidas = 0;

var maiorPont = 0;

var JOGANDO = 1;
var PARADO = 0;
var estadoJogo = JOGANDO;

//atribui as imagens para dentro das variaveis
function preload(){
  trexCorrendo =   loadAnimation("trex1.png","trex2.png","trex3.png");
  
  trexParado = loadImage("trex_parado.png");
  
  imgSolo = loadImage("solo.png");
  
  imgNuvem = loadImage("nuvem.png");
  
  imgCacto1 = loadImage("cacto1.png");
  imgCacto2 = loadImage("cacto2.png");
  imgCacto3 = loadImage("cacto3.png");
  imgCacto4 = loadImage("cacto4.png");
  imgCacto5 = loadImage("cacto5.png");
  imgCacto6 = loadImage("cacto6.png");
  
  imgGameOver = loadImage("gameOver.png");
  imgReiniciar = loadImage("reiniciar.png");
}

function setup() {
  createCanvas(500, 400);
  
  //cria o trex
  trex = createSprite(50,350,30,30);
  trex.addAnimation("running", trexCorrendo);
  trex.addImage("collided", trexParado);
  trex.scale = 0.5;
  trex.setCollider("circle",0,0,40);
  //trex.debug = true;
  
  //cria o solo
  solo = createSprite(250,360,500,20);
  solo.addImage("ground",imgSolo);
  
  //cria o game over
  gameOver = createSprite(250,200);
  gameOver.addImage(imgGameOver);
  gameOver.scale = 0.5;
  gameOver.visible = false;
  
  //cria o reiniciar
  reiniciar = createSprite(250,240);
  reiniciar.addImage(imgReiniciar);
  reiniciar.scale = 0.5;
  reiniciar.visible = false;

  //cria o solo invisivel
  soloInvisivel = createSprite(250,380,500,20);
  soloInvisivel.visible = false;
  
  p1 = createSprite(165,35,1,15);
  p1 = createSprite(285,35,1,15);
  
  //cria um grupo de nuvens
  nuvens = new Group();
  
  //cria um grupo de cactos
  cactos = new Group();
}

function draw() {
  //define a cor do fundo
  background(250);
  
  //exibe as vidas
  text("Vidas: "+ vidas, 95,40);
  
  //exibe a pontuação
  text("Pontuação: "+ pontuacao, 180,40);
  
  //exibe a maior pontuação
  text("Maior Pontuação: "+ maiorPont,295,40);
  
  
  //se o estado do jogo estiver em JOGANDO, então...
  if (estadoJogo === JOGANDO){
    
    //pontuação começa a contar
    pontuacao = pontuacao + Math.round(getFrameRate()/50);
    
    //movimenta o solo
    solo.velocityX = -5;
  
    //se o ESPAÇO for pressionado o trex pula
    if(keyDown("space") && trex.y >= 320) {
      trex.velocityY = -12;
    }
  
    //adiciona gravidade ao trex
    trex.velocityY = trex.velocityY + 0.8
  
    //o solo se repete infinitamente
    if (solo.x < 0){
      solo.x = solo.width/2;
    }
    
    //trex colide com a sprite do solo invisivel 
    trex.collide(soloInvisivel);
    
    //chama a função gerar nuvens
    gerarNuvens();
    
    //chama a função gerar cactos
    gerarCactos();
    
    //se o trex bater no grupo de cactos
    if(cactos.isTouching(trex)){
        //altera o estado do jogo
        estadoJogo = PARADO;
        
        //muda a maior pontuação
        if(maiorPont < pontuacao){
          maiorPont = pontuacao;
        }
    }
  }
  
  //se o estado do jogo estiver em PARADO, então...
  else if (estadoJogo === PARADO) {
    
    //muda a visibilidade das imagens de gameOver/reiniciar
    gameOver.visible = true;
    reiniciar.visible = true;
    
    //define velocidade das sprites do jogo como 0
    solo.velocityX = 0;
    trex.velocityY = 0;
    
    //define velocidade dos grupos do jogo como 0
    cactos.setVelocityXEach(0);
    nuvens.setVelocityXEach(0);
    
    //altera a animação do Trex
    trex.changeAnimation("collided",trexParado);
    
    //define o tempo de vida dos objetos do jogo para que nunca sejam destruídos
    cactos.setLifetimeEach(-1);
    nuvens.setLifetimeEach(-1);
    
    //quando o mouse clica na sprite reiniciar
    if(mousePressedOver(reiniciar)) {
      //chama a função reset
      reset();
    }
    
  }
  
  //desenha as sprites
  drawSprites();
}

//cria a função de gerar nuvens
function gerarNuvens() {
  //se o resto da divisão do frameCount por 60 for 0, entao...
  if (frameCount % 60 === 0) {
    //cria a sprite nuvem
    var nuvem = createSprite(500,random(100,250),20,10);
    nuvem.addImage(imgNuvem);
    nuvem.scale = 0.6;
    nuvem.velocityX = -3;
    
    //atribuir tempo de duração à variável
    nuvem.lifetime = 170; 
    
    //ajustando a profundidade do trex
    nuvem.depth = trex.depth;
    trex.depth = trex.depth + 2;
    
    //ajustando a profundidade do gameOver
    nuvem.depth = gameOver.depth;
    gameOver.depth = gameOver.depth + 1;
    
    //ajustando a profundidade do reiniciar
    nuvem.depth = reiniciar.depth;
    reiniciar.depth = reiniciar.depth + 1;
        
    //adicionando nuvem ao grupo nuvens
     nuvens.add(nuvem);
  }
}

//cria a função de gerar cactos
function gerarCactos() {
  //se o resto da divisão do frameCount por 60 for 0, entao...
  if(frameCount % 60 === 0) {
    //cria a sprite cacto
    var cacto = createSprite(500,345,10,30);
    cacto.velocityX = -5;
    
    //gera um numero aleatorio de 1 a 6 e atribui para alt
    var alt = Math.round(random(1,6));
    
    //seleciona as imagens dos cactos confome a variavel alt
    switch(alt) {
      case 1: cacto.addImage(imgCacto1);
              break;
      case 2: cacto.addImage(imgCacto2);
              break;
      case 3: cacto.addImage(imgCacto3);
              break;
      case 4: cacto.addImage(imgCacto4);
              break;
      case 5: cacto.addImage(imgCacto5);
              break;
      case 6: cacto.addImage(imgCacto6);
              break;
      default: break;
    }
    
          
    cacto.scale = 0.5;
    cacto.lifetime = 125;
    
    //adicionar cada cacto ao grupo de cactos
    cactos.add(cacto);
  }
}

//cria a função reset
function reset(){
  
  //define o estado do jogo para JOGANDO
  estadoJogo = JOGANDO;
  
  //muda a visibilidade do gameOver/reiniciar
  gameOver.visible = false;
  reiniciar.visible = false;
  
  //destroi o grupo de cactos/nuvens parados na tela
  cactos.destroyEach();
  nuvens.destroyEach();
  
  //muda a imagem do trex 
  trex.changeImage("running",trexParado);
  
  pontuacao = 0;

  //quando vidas for maior que 5, zera a maior pontuação
  if(vidas < 5){
    vidas++;
  }else{
    vidas = 0;
    maiorPont = 0;
  }
  
}