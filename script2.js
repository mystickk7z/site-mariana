// RESPOSTAS CORRETAS DA FASE 2
const respostasCorretas = {
    resposta1: "bebepensativo",
    resposta2: "vovo",
    resposta3: "23/12"
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
        feedback.textContent = 'Incrível! Você realmente me conhece bem!';
        feedback.className = 'feedback sucesso';
        
        // Redirecionar para próxima fase
        setTimeout(() => {
            window.location.href = 'pegadinha.html';
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
