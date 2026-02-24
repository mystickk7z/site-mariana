// RESPOSTAS CORRETAS DA FASE 3
const respostasCorretas = {
    resposta1: "you",
    resposta2: "menino-menina",
    resposta3: "programador"
};

let respostasSelecionadas = {
    resposta1: null,
    resposta2: null,
    resposta3: null
};

function selecionarOpcao(pergunta, valor, correta) {
    // Salvar a resposta
    respostasSelecionadas['resposta' + pergunta] = valor;
    
    // Remover seleção de todos os botões da pergunta
    const container = event.target.parentElement;
    const botoes = container.querySelectorAll('.btn-opcao');
    botoes.forEach(btn => {
        btn.classList.remove('selecionado');
    });
    
    // Adicionar classe ao botão clicado
    event.target.classList.add('selecionado');
}

function verificarRespostas() {
    const r1 = respostasSelecionadas.resposta1;
    const r2 = respostasSelecionadas.resposta2;
    const r3 = respostasSelecionadas.resposta3;
    
    const feedback = document.getElementById('feedback');
    
    console.log('Respostas selecionadas:', r1, r2, r3);
    console.log('Respostas corretas:', respostasCorretas);
    
    let acertos = 0;
    if (r1 === respostasCorretas.resposta1) acertos++;
    if (r2 === respostasCorretas.resposta2) acertos++;
    if (r3 === respostasCorretas.resposta3) acertos++;
    
    console.log('Acertos:', acertos);
    
    if (acertos === 3) {
        feedback.textContent = 'Parabéns! Você realmente me conhece muito bem!';
        feedback.className = 'feedback sucesso';
        
        // Redirecionar para página final
        setTimeout(() => {
            window.location.href = 'final.html';
        }, 2000);
    } else if (acertos === 2) {
        feedback.textContent = '😊 Quase lá! Você acertou ' + acertos + ' de 3. Tenta de novo!';
        feedback.className = 'feedback medio';
    } else if (acertos === 1) {
        feedback.textContent = '🤔 Você acertou apenas ' + acertos + '. Pensa melhor nas nossas memórias!';
        feedback.className = 'feedback erro';
    } else {
        feedback.textContent = '❌ Nenhuma correta! Vamos, você consegue! Tenta de novo!';
        feedback.className = 'feedback erro';
    }
}
