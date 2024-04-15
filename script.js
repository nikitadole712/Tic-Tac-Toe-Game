// Set initial player names
let player1Name = '';
let player2Name = '';

// Set initial player as X
let currentPlayer = 'X'; // Set X as the starting player

// Allow X to be dragged first
let canDragX = true;

// Disallow O to be dragged initially
let canDragO = false;

// Initialize the game board
const board = ['', '', '', '', '', '', '', '', ''];

// Get all cell elements
const cells = document.querySelectorAll('.cell');

// Get all draggable buttons (X and O)
const draggableButtons = document.querySelectorAll('.draggable');

// Add event listeners to cells for dropping
cells.forEach((cell) => {
  cell.addEventListener('drop', drop);
  cell.addEventListener('dragover', allowDrop);
});

// Add event listeners to draggable buttons for dragging
draggableButtons.forEach((button) => {
  button.addEventListener('dragstart', dragStart);
});

// Event listener for drag start
function dragStart(event) {
  const symbol = event.target.textContent;
  if ((symbol === 'X' && canDragX) || (symbol === 'O' && canDragO)) {
    event.dataTransfer.setData('text/plain', symbol);
  }
}

// Event listener for allowing drop
function allowDrop(event) {
  event.preventDefault();
}

// Event listener for dropping
function drop(event) {
  event.preventDefault();
  const cellId = event.target.id.split('-')[1];
  const symbol = event.dataTransfer.getData('text/plain');
  if (
    !board[cellId] &&
    ((symbol === 'X' && canDragX) || (symbol === 'O' && canDragO))
  ) {
    board[cellId] = symbol;
    event.target.textContent = symbol;
    if (symbol === 'X') {
      event.target.classList.add('dropped-x'); // Add a class to the dropped cell with X symbol
      canDragX = false; // Disallow X to be dragged next
      canDragO = true; // Allow O to be dragged next
    } else {
      canDragX = true; // Allow X to be dragged next
      canDragO = false; // Disallow O to be dragged next
    }
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    checkWinner();
  }
}

// Function to check for a winner
function checkWinner() {
  const combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  combinations.forEach((combination) => {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      showModal(`${getCurrentPlayerName()} (${board[a]}) wins!`); // Display modal when a player wins
      resetGame();
    }
  });

  if (board.every((cell) => cell)) {
    showModal("It's a draw!"); // Display modal when it's a draw
    resetGame();
  }
}

// Function to reset the game
function resetGame() {
  cells.forEach((cell) => {
    cell.textContent = '';
    cell.classList.remove('dropped-x'); // Remove the dropped class from all cells
  });
  currentPlayer = 'X'; // Set X as the starting player
  board.fill('');
}

// Function to display a modal
function showModal(message) {
  // Get the modal element
  const modal = document.getElementById('myModal');

  // Get the message element inside the modal
  const modalMessage = document.getElementById('modal-message');

  // Set the message content
  modalMessage.textContent = message;

  // Get the <span> element that closes the modal
  const closeBtn = document.querySelector('.close');

  // When the user clicks the <span> (x), close the modal
  closeBtn.onclick = function () {
    modal.style.display = 'none';
  };

  // Display the modal
  modal.style.display = 'block';
}

// Function to get the current player's name
function getCurrentPlayerName() {
  return currentPlayer === 'X' ? player1Name : player2Name;
}

// Function to start the game
function startGame() {
  // Get player names from input fields
  player1Name = document.getElementById('player1').value;
  player2Name = document.getElementById('player2').value;

  // Hide player name input fields and display game board
  document.querySelector('.player-names').style.display = 'none';
  document.getElementById('player1NameDisplay').textContent =
    player1Name;
  document.getElementById('player2NameDisplay').textContent =
    player2Name;
}

// Function to change player names
function changeNames() {
  // Show player name input fields
  document.querySelector('.player-names').style.display = 'flex';
  // Clear player names
  player1Name = '';
  player2Name = '';
  // Clear displayed player names
  document.getElementById('player1NameDisplay').textContent = '';
  document.getElementById('player2NameDisplay').textContent = '';
}
