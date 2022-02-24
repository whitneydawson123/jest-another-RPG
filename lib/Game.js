const inquirer = require('inquirer');
const Enemy = require('../lib/Enemy');
const Player = require('../lib/Player');

class Game {
    constructor() {
        this.roundNumber = 0;
        this.isPlayerTurn = false;
        this.enemies = [];
        this.currentEnemy;
        this.player;
    }

    initializeGame() {
        this.enemies.push(new Enemy('goblin', 'sword'));
        this.enemies.push(new Enemy('orc', 'baseball bat'));
        this.enemies.push(new Enemy('skeleton', 'axe'));

        this.currentEnemy = this.enemies[0];

        inquirer
        .prompt({
            type: 'text',
            name: 'name',
            message: 'What is your name'
        })
        .then(({ name }) => {
            this.player = new Player(name);

            this.startNewBattle();
        });
    }

    startNewBattle() {
        if (this.player.agility > this.currentEnemy.agility) {
            this.isPlayerTurn = true;
        } else {
            this.isPlayerTurn = false;
        }
        console.log('Your stats are as follows:');
        console.table(this.player.getStats());

        console.log(this.currentEnemy.getDescription());

        this.startNewBattle();
    }

    battle() {
        if (this.isPlayerTurn) {
            inquirer
            .prompt({
                type:'list',
                message:'What would you like to do?',
                name: 'action',
                choices: ['Attack', 'Use potion']
            })
            .then(({ action }) => {
                if (action === 'Use potion') {
                    if (!this.player.getInventory()) {
                        console.log("You don't have any potion!");
                        return this.checkEndOfBattle();
                    }

                    
                }
            })
        }
    }
}