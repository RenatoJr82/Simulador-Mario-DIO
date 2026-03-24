// Jogadores
const player1 = {
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0,
};

const player2 = {
    NOME: "Luigi",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 3,
    PONTOS: 0, 
};
// Função para rolar o dado
async function rollDice(){
    return Math.floor(Math.random() * 6) + 1;
}

(async function main(){
    console.log("");
})();