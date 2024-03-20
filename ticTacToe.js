function gameBoard() {
    
    // set initial board state
    let boardArray = [['_','_','_'], ['_','_','_'], ['_','_','_']];

    // initialize board
    const initializeBoard = () => boardArray = [['_','_','_'], ['_','_','_'], ['_','_','_']];
    
    // get cell reference
    const getCell = (cell) =>{
        cellReferenceArray = cell.split('-');
        rowReference = Number(cellReferenceArray[0]) - 1;
        colReference = Number(cellReferenceArray[1]) - 1;

        return cellValue = boardArray[rowReference][colReference];
    }
    
    // mark player's selected cell
    const playerMark = (cell,marker) => {

        cellValue = getCell(cell);

        if (cellValue === '_'){ 
            boardArray[rowReference][colReference] = marker; 
        }else{
            console.log(`This cell has already been marked ${cellValue}`);
        };
    
    };

    // updateMarker
    const changeMarker = (marker) =>{
        if (marker === 'x'){
            return 'o';
        }else{
            return 'x';
        };
    };
    
    // get updated board
    const getBoard = () => {console.log(boardArray)};

    
    // check row pattern
    const checkRow = () =>{
        
        for (let row = 0; row <3 ; row++){
            
            // initialize counter at start of each row
            let counter_player1 = 0;
            let counter_player2 = 0;

            // count element at each column
            for (let col = 0; col <3; col++){
                cellValue = boardArray[row][col];

                if (cellValue === 'x'){counter_player1++};
                if (cellValue === 'o'){counter_player2++};
            };

            // declare winner
            if (counter_player1 === 3){
                console.log(`Player1 wins in row ${row+1}.`);
                break;
            };
            
            if (counter_player2 === 3){
                console.log(`Player2 wins in row ${row+1}.`);
                break;
            };

            if (row === 2){console.log('Row check completed. No winner to declare.')};
        }; 
    }; // end of check row

    // check column pattern
    const checkCol = () =>{

        for (let col = 0; col <3 ; col++){

            // initialize counter at start of each row
            let counter_player1 = 0;
            let counter_player2 = 0;

            for (let row = 0; row < 3; row++){
                cellValue = boardArray[row][col];

                if (cellValue === 'x'){counter_player1++};
                if (cellValue === 'o'){counter_player2++};
            };
        
            // declare winner
            if (counter_player1 === 3){
                console.log(`Player1 wins in col ${col + 1}.`);
                break;
            };
            
            if (counter_player2 === 3){
                console.log(`Player2 wins in col ${col + 1}.`);
                break;
            };

            if (col === 2){console.log('Col check completed. No winner to declare.')};
        };
    }; //end of colCheck

    // check cross pattern
    const checkCross = () =>{

        // initialize counter
        let counter1_player1 = 0; // cross1 pattern (from top-left)
        let counter1_player2 = 0;

        let counter2_player1 = 0; // cross2 pattern (from top-right)
        let counter2_player2 = 0;

        //loop cross cells
        for (let i = 0; i < 3; i++){
            cellValue1 = boardArray[ i ][    i]; // cross1 pattern
            cellValue2 = boardArray[ i ][2 - i]; // cross2 pattern
            
            
            if (cellValue1 === 'x'){counter1_player1++};
            if (cellValue1 === 'o'){counter1_player2++};

            if (cellValue2 === 'x'){counter2_player1++};
            if (cellValue2 === 'o'){counter2_player2++};

        };

        // declare winner
        if (counter1_player1 === 3 || counter2_player1 === 3){
            console.log(`Player1 wins on cross pattern.`);

        }else if (counter1_player2 === 3 || counter2_player2 === 3){
            console.log(`Player2 wins on cross 1 pattern.`);

        }else{
            console.log('Cross pattern check completed. No winner to declare.');

        };

    };

    return {playerMark, getBoard, checkRow, checkCol, checkCross, initializeBoard, changeMarker};

};

const gamePlay = (event) => {
    
    // get player selection
    let playerSelect = event.target.className; 
        
    // mark player selection
    game.playerMark(playerSelect, playerMarker);
    display.markerDisplay(playerSelect, playerMarker);

    // check winning pattern
    // game.checkRow()
    // game.checkCol()
    // game.checkCross()

    // update gameCount
    gameCount += 1;

    // update marker for next player
    playerMarker = game.changeMarker(playerMarker);

    //show board
    game.getBoard();

};

const gameDisplay = () =>{

    // create marker child element
    const markerElement = (cell) =>{
        
        // create child element
        const markerElement = document.createElement('div');
        markerElement.setAttribute('class', 'marker');

        // append to the selected cell
        const htmlSelect = `div[class="${cell}"]`;
        const htmlCell = document.querySelector(htmlSelect);
        htmlCell.appendChild(markerElement);

    };
    
    // display marker in html
    const markerDisplay = (cell, marker) =>{
        
        // create marker element
        markerElement(cell);

        // add marker
        htmlSelect = `div[class="${cell}"]>.marker`;
        htmlCell = document.querySelector(htmlSelect);

        switch (marker){
            case 'x':
                htmlCell.style.backgroundImage = 'url("./Assets/x.png")';
                break;
            
            case 'o':
                htmlCell.style.backgroundImage = 'url("./Assets/o.png")';
                break;

            default:
                htmlCell.style.backgroundImage = '';
                break;
        }; 
    };

    return {markerDisplay};
};

//  initiate factory functions
const game = gameBoard();
const display = gameDisplay();

// initiate control variables
let gameCount = 0;
let playerMarker = 'x'

// add event listener
gameArea = document.querySelector('.game-area');
gameArea.addEventListener('click',gamePlay);