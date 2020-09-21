// Initialize app
var myApp = new Framework7({
    init: false // prevent app from automatic initialization 
 });


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
 });

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
  console.log("Device is ready!");
});


// page specific code
myApp.onPageInit('login', function (page) {
   console.log("login code executed");

})


// script for index page
myApp.onPageInit('index', function (page) {
   var board,
   game = new Chess(),
   statusEl = $('#status'),
   fenEl = $('#fen'),
   pgnEl = $('#pgn');

   // resize handling
   var temp = myApp.resize;
   myApp.resize = function() {
      board.resize()
      temp();
   }


    // do not pick up pieces if the game is over
    // only pick up pieces for the side to move
   var onDragStart = function(source, piece, position, orientation) {
      if (game.game_over() === true ||
            (game.turn() === 'w' && piece.search(/^b/) !== -1) ||
            (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
         return false;
      }
      else {
         onMouseoverSquare(source, piece);
      }
   };

   var onDrop = function(source, target) {
      onMouseoutSquare(source, null)
      // see if the move is legal
      var move = game.move({
         from: source,
         to: target,
         promotion: 'q' // NOTE: always promote to a queen for example simplicity
      });

      // illegal move
      if (move === null) return 'snapback';

      updateStatus();
   };

   // update the board position after the piece snap 
   // for castling, en passant, pawn promotion
   var onSnapEnd = function() {
      board.position(game.fen());
   };

   var updateStatus = function() {
      var status = '';

      var moveColor = 'White';
      if (game.turn() === 'b') {
         moveColor = 'Black';
      }


      if (game.in_checkmat/* checkmate?e() === true*/) {
         status = 'Game over, ' + moveColor + ' is in checkmate.';
      }

      // draw?
      else if (game.in_draw() === true) {
         status = 'Game over, drawn position';
      }

      // game still on
      else {
         status = moveColor + ' to move';
   
         // check?
         if (game.in_check() === true) {
            status += ', ' + moveColor + ' is in check';
         }
      }

     statusEl.html(status);
     fenEl.html(game.fen());
     pgnEl.html(game.pgn());
   };

   var removeGreySquares = function() {
      $('#board .square-55d63').css('background', '');
   };

   var greySquare = function(square) {
      var squareEl = $('#board .square-' + square);
   
      var background = '#a9a9a9';
      if (squareEl.hasClass('black-3c85d') === true) {
         background = '#696969';
      }

    squareEl.css('background', background);
   };

   var onMouseoverSquare = function(square, piece) {
      // get list of possible moves for this square
      var moves = game.moves({
         square: square,
         verbose: true
      });

      // exit if there are no moves available for this square
      if (moves.length === 0) return;

      // highlight the square they moused over
      greySquare(square);

      // highlight the possible squares for this piece
      for (var i = 0; i < moves.length; i++) {
         greySquare(moves[i].to);
      }
   };

   var onMouseoutSquare = function(square, piece) {
      removeGreySquares();
   };

   var cfg = {
      draggable: true,
      dropOffBoard: 'snapback',
      position: 'start',
      onDragStart: onDragStart,
      onDrop: onDrop,
      onMouseoutSquare: onMouseoutSquare,
      onMouseoverSquare: onMouseoverSquare,
      onSnapEnd: onSnapEnd
   };
   board = ChessBoard('board', cfg);

   updateStatus();
   

   var i = 0;
   // handle nav buttons for game
   // 3. If Next button clicked, move forward one
   $('#nextBtn').on('click', function() {
      board.position(game.next());
   });
   // 4. If Prev button clicked, move backward one
   $('#prevBtn').on('click', function() {
      board.position(game.back());
   });

   $('#resetBtn').on('click', function() {
      game.reset()
      board.position(board.start());
   });

   $('#saveBtn').on('click', function() {
      console.log("Speichern");
   });
})




myApp.init(); // init app manually