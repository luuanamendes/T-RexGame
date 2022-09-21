function playingGame() {
    pontuacao = pontuacao + Math.round(getFrameRate() / 50);

    if (keyDown("space") && trex.y >= 340) {
        trex.velocityY = -12;

        if (trex.y <= 345) {
            somPular.play();
        }
    }

    if (pontuacao % 100 === 0) {
        soma = soma + (-0.1);
    }

    solo.velocityX = soma;
    cactos.setVelocityXEach(soma);

    console.log(solo.velocityX);

    trex.velocityY = trex.velocityY + 0.9;

    if (solo.x < 0) {
        solo.x = solo.width / 2;
    }

    trex.collide(soloInvisivel);

    gerarNuvens();
    gerarCactos();

    if (cactos.isTouching(trex)) {
        estadoJogo = PARADO;
        somBateu.play();

        if (maiorPont < pontuacao) {
            maiorPont = pontuacao;
        }

        if (vidas <= 0) {
             gameOver.visible = true;
        }

    }
}

function waitingGame() {
    reiniciar.visible = true;

    solo.velocityX = 0;
    trex.velocityY = 0;

    cactos.setVelocityXEach(0);
    nuvens.setVelocityXEach(0);

    trex.changeAnimation("collided", trexParado);

    cactos.setLifetimeEach(-1);
    nuvens.setLifetimeEach(-1);

    if (mousePressedOver(reiniciar)) {
        reset();
    }
}
