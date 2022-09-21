function gerarCactos() {
    if(frameCount % 60 === 0) {
      var cacto = createSprite(500,345,10,30);;
      cacto.velocityX = -8;
      var alt = Math.round(random(1,6));
      
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
      cactos.add(cacto);
    }
}