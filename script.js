// PERSONALIZE AS RESPOSTAS AQUI!
const respostasCorretas = {
    resposta1: "16/07",       // Fácil: primeira mensagem
    resposta2: "amiga",       // Médio: como se conheceram
    resposta3: "opcao4"       // Difícil: nome completo e aniversário
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
    
    let acertos = 0;
    if (r1 === respostasCorretas.resposta1) acertos++;
    if (r2 === respostasCorretas.resposta2) acertos++;
    if (r3 === respostasCorretas.resposta3) acertos++;
    
    if (acertos === 3) {
        feedback.textContent = 'Que gracinha, você me conhece mesmo... por enquanto, rs';
        feedback.className = 'feedback sucesso';
        
        // Redirecionar para próxima fase
        setTimeout(() => {
            window.location.href = 'perguntas2.html';
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

// Configurações do jogo - PERSONALIZE AQUI!
const CONFIG = {
    // Respostas do Quiz (Etapa 1)
    respostasQuiz: {
        q1: "inception", // Primeiro filme
        q2: "parque", // Lugar favorito
        q3: "15" // Dia que se conheceram
    },
    
    // Senha (Etapa 3) - exemplo: dia 15 + dia 20 = 35
    senhaCorreta: "35",
    
    // Palavras embaralhadas (Etapa 4)
    palavrasCorretas: {
        p1: "amor",
        p2: "felicidade",
        p3: "paixão"
    }
};

let etapaAtual = 0;
let cartasViradas = [];
let paresEncontrados = 0;

// Iniciar jornada
function iniciarJornada() {
    mudarTela('etapa1');
    atualizarProgresso(1);
}

// Mudar entre telas
function mudarTela(idTela) {
    document.querySelectorAll('.tela').forEach(tela => {
        tela.classList.remove('ativa');
    });
    document.getElementById(idTela).classList.add('ativa');
}

// Atualizar barra de progresso
function atualizarProgresso(etapa) {
    etapaAtual = etapa;
    const porcentagem = (etapa / 4) * 100;
    document.getElementById('barraProgresso').style.width = porcentagem + '%';
    document.getElementById('etapaAtual').textContent = etapa;
}

// ETAPA 1: Quiz
function verificarQuiz() {
    const r1 = document.getElementById('q1').value.toLowerCase().trim();
    const r2 = document.getElementById('q2').value.toLowerCase().trim();
    const r3 = document.getElementById('q3').value.toLowerCase().trim();
    
    const feedback = document.getElementById('feedback1');
    
    if (r1 === CONFIG.respostasQuiz.q1 && 
        r2 === CONFIG.respostasQuiz.q2 && 
        r3 === CONFIG.respostasQuiz.q3) {
        feedback.textContent = '✅ Perfeito! Você se lembra de tudo! 💕';
        feedback.className = 'feedback sucesso';
        
        setTimeout(() => {
            iniciarJogoMemoria();
            mudarTela('etapa2');
            atualizarProgresso(2);
        }, 1500);
    } else {
        feedback.textContent = '❌ Hmm, tenta de novo! Pensa bem nas nossas memórias...';
        feedback.className = 'feedback erro';
    }
}

// ETAPA 2: Jogo da Memória
function iniciarJogoMemoria() {
    const simbolos = ['❤️', '💕', '💖', '💗', '💝', '💘', '💞', '💓'];
    const cartas = [...simbolos, ...simbolos];
    cartas.sort(() => Math.random() - 0.5);
    
    const container = document.getElementById('jogoMemoria');
    container.innerHTML = '';
    
    cartas.forEach((simbolo, index) => {
        const carta = document.createElement('div');
        carta.className = 'carta';
        carta.dataset.simbolo = simbolo;
        carta.dataset.index = index;
        carta.textContent = '?';
        carta.onclick = () => virarCarta(carta);
        container.appendChild(carta);
    });
    
    cartasViradas = [];
    paresEncontrados = 0;
}

function virarCarta(carta) {
    if (cartasViradas.length >= 2 || carta.classList.contains('virada') || 
        carta.classList.contains('encontrada')) {
        return;
    }
    
    carta.classList.add('virada');
    carta.textContent = carta.dataset.simbolo;
    cartasViradas.push(carta);
    
    if (cartasViradas.length === 2) {
        setTimeout(verificarPar, 800);
    }
}

function verificarPar() {
    const [carta1, carta2] = cartasViradas;
    
    if (carta1.dataset.simbolo === carta2.dataset.simbolo) {
        carta1.classList.add('encontrada');
        carta2.classList.add('encontrada');
        paresEncontrados++;
        
        if (paresEncontrados === 8) {
            document.getElementById('feedback2').textContent = '🎉 Você encontrou todos os pares!';
            document.getElementById('feedback2').className = 'feedback sucesso';
            
            setTimeout(() => {
                mudarTela('etapa3');
                atualizarProgresso(3);
            }, 1500);
        }
    } else {
        carta1.classList.remove('virada');
        carta2.classList.remove('virada');
        carta1.textContent = '?';
        carta2.textContent = '?';
    }
    
    cartasViradas = [];
}

// ETAPA 3: Senha
function verificarSenha() {
    const senha = document.getElementById('senha').value;
    const feedback = document.getElementById('feedback3');
    
    if (senha === CONFIG.senhaCorreta) {
        feedback.textContent = '🔓 Código correto! Desbloqueado!';
        feedback.className = 'feedback sucesso';
        
        setTimeout(() => {
            mudarTela('etapa4');
            atualizarProgresso(4);
        }, 1500);
    } else {
        feedback.textContent = '❌ Código incorreto. Pensa nos nossos dias especiais...';
        feedback.className = 'feedback erro';
    }
}

// ETAPA 4: Palavras Embaralhadas
function verificarPalavras() {
    const p1 = document.getElementById('p1').value.toLowerCase().trim();
    const p2 = document.getElementById('p2').value.toLowerCase().trim();
    const p3 = document.getElementById('p3').value.toLowerCase().trim();
    
    const feedback = document.getElementById('feedback4');
    
    if (p1 === CONFIG.palavrasCorretas.p1 && 
        p2 === CONFIG.palavrasCorretas.p2 && 
        p3 === CONFIG.palavrasCorretas.p3) {
        feedback.textContent = '✨ Perfeito! Essas palavras definem a gente!';
        feedback.className = 'feedback sucesso';
        
        setTimeout(() => {
            mudarTela('etapaFinal');
        }, 1500);
    } else {
        feedback.textContent = '❌ Quase lá! Tenta reorganizar as letras...';
        feedback.className = 'feedback erro';
    }
}

// Reiniciar jogo
function reiniciar() {
    // Limpar inputs
    document.querySelectorAll('input').forEach(input => input.value = '');
    document.querySelectorAll('.feedback').forEach(fb => {
        fb.textContent = '';
        fb.className = 'feedback';
    });
    
    mudarTela('inicio');
    atualizarProgresso(0);
}
