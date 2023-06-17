
$(document).ready(function(){
    $('#cpf').inputmask('999.999.999-99');
});
function validaCPF() {
  const cpfFormatado = document.getElementById("cpf").value;
  const cpf = limpaFormatacao(cpfFormatado);

  if (cpf.length !== 11) {
    mostraResultado("CPF deve conter 11 digitos.", "red");
    return;
  }

  if (verificaDigitosIguais(cpf)) {
    mostraResultado("CPF nao deve contar repeticao de digito", "red");
    return;
  }

  const digito1 = calculaDigitoVerificador(cpf, 1);

  if(!digito1){
    mostraResultado(`CPF invalido - ${cpfFormatado}`, 'red');
    return;
  }
  const digito2 = calculaDigitoVerificador(cpf, 2);
  if(!digito2){
    mostraResultado(`CPF invalido - ${cpfFormatado}`, 'red');
    return;
  }

  mostraResultado(`CPF valido - ${cpfFormatado}`, 'green');
  
}

function calculaDigitoVerificador(cpf, posicao) {
  const sequencia = cpf.slice(0, 8 + posicao).split("");

  let soma = 0;
  let multiplicador = 9 + posicao;

  for(const numero of sequencia){
    soma += multiplicador *Number(numero);
    multiplicador--;
  }

  const restoDivisao = (soma*10)%11;
  const digito = cpf.slice(8 + posicao, 9+posicao);

  return restoDivisao == digito;
}

function limpaFormatacao(cpf) {
  cpf = cpf.replace(/\D/g, "");

  return cpf;
}

function mostraResultado(texto, cor) {
  const span = document.getElementById("resultado");

  span.innerHTML = texto;
  span.style.color = cor;
}

function verificaDigitosIguais(cpf) {
  //funcao de manipulacao de array, verifica se todos os digitos sao repetidos
  return cpf.split("").every((d) => d === cpf[0]);
}
