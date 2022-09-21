function gerarNuvens() {
    if (frameCount % 60 === 0) {
        var nuvem = createSprite(500, random(100, 250), 20, 10);
        nuvem.addImage(imgNuvem);
        nuvem.scale = 0.6;
        nuvem.velocityX = -3;
        nuvem.lifetime = 200;
        nuvem.depth = trex.depth;
        trex.depth = trex.depth + 2;
        nuvem.depth = gameOver.depth;
        gameOver.depth = gameOver.depth + 1;
        nuvem.depth = reiniciar.depth;
        reiniciar.depth = reiniciar.depth + 1;
        nuvens.add(nuvem);
    }
}