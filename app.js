let listaDeNumerosSorteados = []; 
// Array vazio que vai armazenar os números já sorteados (para evitar repetições)

let numeroLimite = 10; 
// Define o valor máximo que pode ser sorteado (de 1 até 10)

let numeroSecreto = gerarNumeroAleatorio(); 
// Chama a função que gera um número secreto aleatório e já armazena aqui

let tentativas = 1; 
// Contador para registrar quantas vezes o jogador tentou adivinhar


// Função que exibe texto na tela dentro de uma tag HTML
function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag); 
    // Seleciona o elemento HTML pela tag passada (ex: 'h1', 'p')

    campo.innerHTML = texto; 
    // Substitui o conteúdo da tag pelo texto

    if ('speechSynthesis' in window) {
        // Verifica se o navegador suporta a API de voz
        let utterance = new SpeechSynthesisUtterance(texto);
        // Cria a fala com o texto

        utterance.lang = 'pt-BR'; 
        // Define o idioma como português do Brasil

        utterance.rate = 1.2; 
        // Ajusta a velocidade da fala

        window.speechSynthesis.speak(utterance); 
        // Executa a fala em voz alta
    } else {
        console.log("Web Speech API não suportada neste navegador.");
        // Caso o navegador não suporte, mostra aviso no console
    }
}


// Função que exibe a mensagem inicial do jogo
function exibirMensagemInicial() { 
    exibirTextoNaTela('h1', 'Jogo do número secreto'); 
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10'); 
    // Obs: tem um "I" sobrando no final da sua linha, pode apagar
}

exibirMensagemInicial(); 
// Chamando a função para aparecer a mensagem assim que o jogo iniciar


// Função que verifica o número digitado pelo jogador
function verificarChute() {
    let chute = document.querySelector('input').value;
    // Pega o valor digitado no campo input

    if (chute == numeroSecreto) {
        // Se o chute for igual ao número secreto
        exibirTextoNaTela('h1', 'Acertou!');

        let palavraTentativa = tentativas > 1 ? 'tentativas': 'tentativa';
        // Se for mais de uma tentativa, usa plural; senão, singular

        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`; 
        // Monta a mensagem final

        exibirTextoNaTela('p', mensagemTentativas);

        document.getElementById('reiniciar').removeAttribute('disabled');
        // Habilita o botão de reiniciar
    } else {
        // Se errou o chute
        if (chute > numeroSecreto) { 
            exibirTextoNaTela ('p', 'O número secreto é menor');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }

        tentativas++; 
        // Soma mais uma tentativa

        limparCampo(); 
        // Limpa o input para digitar de novo
    }
}


// Função que gera o número secreto
function gerarNumeroAleatorio(){
   let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
   // Sorteia número entre 1 e numeroLimite

   let quantidadeDeElementosDaLista = listaDeNumerosSorteados.length;
   // Conta quantos números já foram sorteados

   if(quantidadeDeElementosDaLista == numeroLimite){
       listaDeNumerosSorteados = [];
       // Se já sorteou todos os números possíveis, limpa a lista
   }

   if(listaDeNumerosSorteados.includes(numeroEscolhido)){
       // Se o número já foi sorteado, chama a função de novo até achar outro
       return gerarNumeroAleatorio();
   } else {
       listaDeNumerosSorteados.push(numeroEscolhido);
       // Guarda o número na lista

       console.log(listaDeNumerosSorteados);
       // Mostra no console os números já sorteados (debug)

       return numeroEscolhido;
       // Retorna o número secreto
   };
}


// Função que limpa o campo de entrada
function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
    // Deixa o campo input vazio
}


// Função que reinicia o jogo
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio(); 
    // Sorteia novo número

    limparCampo(); 
    tentativas = 1; 
    // Zera as tentativas

    exibirMensagemInicial(); 
    // Mostra mensagem inicial de novo

    document.getElementById('reiniciar').setAttribute('disabled', true);
    // Desabilita o botão até o jogador acertar novamente
}