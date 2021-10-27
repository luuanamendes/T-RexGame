//cria a função de criar cactos
function criarCactos() {
    //se o resto da divisão do frameCount por 60 for 0, entao...
    if(frameCount % 60 === 0) {
      //cria a sprite cacto
      var cacto = createSprite(width+20,height-95,10,30);
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
      
            
      cacto.scale = 0.6;
      cacto.lifetime = width/4;
      
      //adicionar cada cacto ao grupo de cactos
      cactos.add(cacto);
    }
  }