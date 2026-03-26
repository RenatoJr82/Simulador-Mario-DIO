// Jogadores
const player1 = {
    NOME: "Mário",
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
async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

// Função para sortear o bloco
async function getRandomBlock(params) {
    let random = Math.random();
    let result

    switch (true) {
        case random < 0.33:
            result = "RETA";
            break;
        case random < 0.66:
            result = "CURVA";
            break;
        default:
            result = "CONFRONTO";
            break;
    }
    return result;
}

// Função para logar o resultado do dado
async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(`${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`);

}

// Função para simular a corrida
async function playRaceEngine(character1, character2) {     //Fonte usada pelo Felipe da DIO (firecode)
    for (let round = 1; round <= 5; round++) {
        console.log(`🏁 Rodada ${round}`);
        // sotear o dado para cada jogador
        let block = await getRandomBlock();
        console.log(`Bloco sorteado: ${block}`);

        // Rolar os dados
        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        // Teste de Habilidade
        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

        if (block === "RETA") {
            totalTestSkill1 = character1.VELOCIDADE + diceResult1;
            totalTestSkill2 = character2.VELOCIDADE + diceResult2;

            await logRollResult(
                character1.NOME,
                "velocidade",
                diceResult1,
                character1.VELOCIDADE
            );

            await logRollResult(
                character2.NOME,
                "velocidade",
                diceResult2,
                character2.VELOCIDADE
            );

        } else if (block === "CURVA") {
            totalTestSkill1 = character1.MANOBRABILIDADE + diceResult1;
            totalTestSkill2 = character2.MANOBRABILIDADE + diceResult2;

            await logRollResult(
                character1.NOME,
                "manobrabilidade",
                diceResult1,
                character1.MANOBRABILIDADE
            );

            await logRollResult(
                character2.NOME,
                "manobrabilidade",
                diceResult2,
                character2.MANOBRABILIDADE
            );
        } else { // CONFRONTO
            let powerResult1 = character1.PODER + diceResult1;
            let powerResult2 = character2.PODER + diceResult2;

            console.log(`${character1.NOME} confrontou com ${character2.NOME}! 🥊`);

            await logRollResult(
                character1.NOME,
                "poder",
                diceResult1,
                character1.PODER
            );

            await logRollResult(
                character2.NOME,
                "poder",
                diceResult2,
                character2.PODER
            );
            // No confronto, o perdedor perde um ponto (sem ir para negativo) JEITO IF TERNÁRIO
            character2.PONTOS -= 
                powerResult1 > powerResult2 && character2.PONTOS > 0 ? 1 : 0;
            character1.PONTOS -= 
                powerResult2 > powerResult1 && character1.PONTOS > 0 ? 1 : 0;
            // Verificar empate no confronto
            console.log(powerResult2 === powerResult1 
                ? "Empate no confronto! Ninguém perde pontos.": "");

            // Comparar os resultados e atribuir pontos
            if (totalTestSkill1 > totalTestSkill2) {
                console.log(`👍 ${character1.NOME} marcou um ponto!`);
                character1.PONTOS++;
            } else if (totalTestSkill2 > totalTestSkill1) {
                console.log(`👍 ${character2.NOME} marcou um ponto!`);
                character2.PONTOS++;
            }          
        }
        console.log("-----------------------------\n");
    }
}

// Início da simulação
(async function main() {
    console.log(`🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando...\n`);
    await playRaceEngine(player1, player2);
})();