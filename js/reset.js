function reset() {
    estadoJogo = JOGANDO;
    gameOver.visible = false;
    reiniciar.visible = false;
    cactos.destroyEach();
    nuvens.destroyEach();
    trex.changeImage("running", trexParado);
    pontuacao = 0;

    if (vidas >= 1) {
        vidas--;
    } else {
        vidas = 5;
        maiorPont = 0;
    }
}