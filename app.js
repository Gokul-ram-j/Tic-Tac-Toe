class TicTacToe {
    constructor() {
        this.currentPlayer = 'X';
        this.gameBoard = Array(9).fill('');
        this.gameActive = true;
        this.xScore = 0;
        this.oScore = 0;
        
        this.winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];
        
        this.initializeGame();
        this.bindEvents();
    }
    
    initializeGame() {
        this.gameBoard = Array(9).fill('');
        this.gameActive = true;
        this.currentPlayer = 'X';
        this.updateCurrentPlayerDisplay();
        this.clearBoard();
        this.hideOverlays();
    }
    
    bindEvents() {
        // Board click events
        document.querySelectorAll('.box').forEach((box, index) => {
            box.addEventListener('click', () => this.handleBoxClick(index));
        });
        
        // Button events
        document.querySelector('.reset-btn').addEventListener('click', () => this.resetGame());
        document.querySelector('.new-game-btn').addEventListener('click', () => this.newMatch());
        document.querySelector('.play-again-btn').addEventListener('click', () => this.resetGame());
        document.querySelector('.draw-play-again-btn').addEventListener('click', () => this.resetGame());
    }
    
    handleBoxClick(index) {
        if (!this.gameActive || this.gameBoard[index] !== '') {
            return;
        }
        
        this.makeMove(index);
    }
    
    makeMove(index) {
        const box = document.getElementById((index + 1).toString());
        const boxContent = box.querySelector('.box-content');
        
        // Add move to game board
        this.gameBoard[index] = this.currentPlayer;
        
        // Add visual feedback
        this.animateMove(box, boxContent);
        
        // Check for win or draw
        setTimeout(() => {
            if (this.checkWinner()) {
                this.handleWin();
            } else if (this.checkDraw()) {
                this.handleDraw();
            } else {
                this.switchPlayer();
            }
        }, 500);
    }
    
    animateMove(box, boxContent) {
        // Add filled class to prevent further clicks
        box.classList.add('filled');
        
        // Set content and animate
        boxContent.textContent = this.currentPlayer;
        boxContent.className = `box-content ${this.currentPlayer.toLowerCase()}`;
        
        // Trigger show animation
        setTimeout(() => {
            boxContent.classList.add('show');
        }, 100);
        
        // Add box animation
        box.style.transform = 'scale(1.1) rotateZ(5deg)';
        setTimeout(() => {
            box.style.transform = 'scale(1) rotateZ(0deg)';
        }, 200);
    }
    
    checkWinner() {
        return this.winningCombinations.some(combination => {
            const [a, b, c] = combination;
            if (this.gameBoard[a] && 
                this.gameBoard[a] === this.gameBoard[b] && 
                this.gameBoard[a] === this.gameBoard[c]) {
                this.winningCombination = combination;
                return true;
            }
            return false;
        });
    }
    
    checkDraw() {
        return this.gameBoard.every(cell => cell !== '') && !this.checkWinner();
    }
    
    handleWin() {
        this.gameActive = false;
        this.highlightWinningCombination();
        this.updateScore();
        this.showWinningOverlay();
    }
    
    handleDraw() {
        this.gameActive = false;
        this.showDrawOverlay();
    }
    
    highlightWinningCombination() {
        this.winningCombination.forEach(index => {
            const box = document.getElementById((index + 1).toString());
            box.classList.add('winner');
        });
    }
    
    updateScore() {
        if (this.currentPlayer === 'X') {
            this.xScore++;
            document.getElementById('x-score').textContent = this.xScore;
        } else {
            this.oScore++;
            document.getElementById('o-score').textContent = this.oScore;
        }
        
        // Animate score update
        const scoreElement = document.getElementById(`${this.currentPlayer.toLowerCase()}-score`);
        scoreElement.style.transform = 'scale(1.3)';
        scoreElement.style.color = '#00ff88';
        setTimeout(() => {
            scoreElement.style.transform = 'scale(1)';
            scoreElement.style.color = '#00d4ff';
        }, 300);
    }
    
    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        this.updateCurrentPlayerDisplay();
    }
    
    updateCurrentPlayerDisplay() {
        const playerElement = document.querySelector('.cur-player');
        const playerContainer = document.querySelector('.current-player');
        
        playerElement.textContent = this.currentPlayer;
        
        // Add transition effect
        playerContainer.style.transform = 'scale(0.8) rotateY(90deg)';
        setTimeout(() => {
            playerContainer.style.transform = 'scale(1) rotateY(0deg)';
        }, 150);
    }
    
    showWinningOverlay() {
        const overlay = document.querySelector('.winning-overlay');
        const winnerPlayer = document.querySelector('.winner-player');
        
        winnerPlayer.textContent = `PLAYER ${this.currentPlayer}`;
        
        setTimeout(() => {
            overlay.classList.add('show');
            this.createConfetti();
        }, 1000);
    }
    
    showDrawOverlay() {
        const overlay = document.querySelector('.draw-overlay');
        
        setTimeout(() => {
            overlay.classList.add('show');
        }, 1000);
    }
    
    hideOverlays() {
        document.querySelector('.winning-overlay').classList.remove('show');
        document.querySelector('.draw-overlay').classList.remove('show');
    }
    
    createConfetti() {
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'];
        const confettiContainer = document.body;
        
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.style.position = 'fixed';
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.top = '-10px';
                confetti.style.width = '10px';
                confetti.style.height = '10px';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.borderRadius = '50%';
                confetti.style.pointerEvents = 'none';
                confetti.style.zIndex = '9999';
                confetti.style.animation = `confetti-fall ${Math.random() * 3 + 2}s linear forwards`;
                
                confettiContainer.appendChild(confetti);
                
                setTimeout(() => {
                    confetti.remove();
                }, 5000);
            }, i * 100);
        }
    }
    
    clearBoard() {
        document.querySelectorAll('.box').forEach(box => {
            const boxContent = box.querySelector('.box-content');
            boxContent.textContent = '';
            boxContent.className = 'box-content';
            box.classList.remove('filled', 'winner');
            box.style.transform = '';
        });
    }
    
    resetGame() {
        this.initializeGame();
        this.addResetAnimation();
    }
    
    newMatch() {
        this.xScore = 0;
        this.oScore = 0;
        document.getElementById('x-score').textContent = '0';
        document.getElementById('o-score').textContent = '0';
        this.resetGame();
    }
    
    addResetAnimation() {
        const gameBoard = document.querySelector('.game-board');
        gameBoard.style.transform = 'scale(0.9) rotateY(180deg)';
        gameBoard.style.opacity = '0.5';
        
        setTimeout(() => {
            gameBoard.style.transform = 'scale(1) rotateY(0deg)';
            gameBoard.style.opacity = '1';
        }, 300);
    }
}

// Add CSS for confetti animation
const style = document.createElement('style');
style.textContent = `
    @keyframes confetti-fall {
        0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
    
    .box {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .current-player {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .score-value {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .game-board {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
`;
document.head.appendChild(style);

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new TicTacToe();
    
    // Add title animation on load
    const titleChars = document.querySelectorAll('.title-char');
    titleChars.forEach((char, index) => {
        char.style.animationDelay = `${index * 0.1}s`;
        char.style.animation = 'glow-pulse 2s ease-in-out infinite alternate';
    });
    
    // Add smooth entrance animation
    const gameContainer = document.querySelector('.game-container');
    gameContainer.style.opacity = '0';
    gameContainer.style.transform = 'translateY(50px)';
    
    setTimeout(() => {
        gameContainer.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
        gameContainer.style.opacity = '1';
        gameContainer.style.transform = 'translateY(0)';
    }, 100);
});