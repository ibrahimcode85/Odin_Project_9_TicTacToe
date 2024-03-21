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
            let counter_markerX = 0;
            let counter_markerO = 0;

            // count element at each column
            for (let col = 0; col <3; col++){
                cellValue = boardArray[row][col];

                if (cellValue === 'x'){counter_markerX++};
                if (cellValue === 'o'){counter_markerO++};
            };

            // declare winner
            if (counter_markerX === 3){
                return {playerID: 'x', patternID: `row-${row}`};
            };
            
            if (counter_markerO === 3){
                return {playerID: 'o', patternID: `row-${row}`};
            };

            if (row === 2){
                console.log('Row check completed. No winner to declare.');
                return {playerID: 'none', patternID:'none'};
            };
        }; 
    }; // end of check row

    // check column pattern
    const checkCol = () =>{

        for (let col = 0; col <3 ; col++){

            // initialize counter at start of each row
            let counter_markerX = 0;
            let counter_markerO = 0;

            for (let row = 0; row < 3; row++){
                cellValue = boardArray[row][col];

                if (cellValue === 'x'){counter_markerX++};
                if (cellValue === 'o'){counter_markerO++};
            };
        
            // declare winner
            if (counter_markerX === 3){
                return {playerID: 'x', patternID: `col-${col}`};
            };
            
            if (counter_markerO === 3){
                return {playerID: 'o', patternID: `col-${col}`};
            };

            if (col === 2){
                console.log('Col check completed. No winner to declare.');
                return {playerID: 'none', patternID:'none'};
            };
        };
    }; //end of colCheck

    // check cross pattern
    const checkCross = () =>{

        // initialize counter
        let counter1_markerX= 0; // cross1 pattern (from top-left)
        let counter1_markerO = 0;

        let counter2_markerX = 0; // cross2 pattern (from top-right)
        let counter2_markerO = 0;

        //loop cross cells
        for (let i = 0; i < 3; i++){
            cellValue1 = boardArray[ i ][    i]; // cross1 pattern
            cellValue2 = boardArray[ i ][2 - i]; // cross2 pattern
            
            
            if (cellValue1 === 'x'){counter1_markerX++};
            if (cellValue1 === 'o'){counter1_markerO++};

            if (cellValue2 === 'x'){counter2_markerX++};
            if (cellValue2 === 'o'){counter2_markerO++};

        };

        // declare winner
        if (counter1_markerX === 3 || counter2_markerX === 3){

            // identify crossID
            let crossID = (counter1_markerX ===3)? 'cross-1':'cross-2';

            // return object
            return {playerID: 'x', patternID: crossID};

        }else if (counter1_markerO === 3 || counter2_markerO === 3){
            
            // identify crossID
            let crossID = (counter1_markerO ===3)? 'cross-1':'cross-2';

            // return object
            return {playerID: 'o', patternID: crossID};

        }else{
            console.log('Cross check completed. No winner to declare.');
            return {playerID: 'none', patternID: 'none'};

        };

    };

    return {playerMark, getBoard, checkRow, checkCol, checkCross, initializeBoard, changeMarker};

};

const gamePlay = (event) => {
    
    // get player selection
    let playerSelect = event.target.className; 

    // exit function if its not a cell (class includes substring '-' as in '1-3')
    if (!playerSelect.includes('-')){
        return;
    };
    
    // get cell id
    let cellID = event.target.id;

    // exit function if id is already being marked
    if (cellID !== '-'){
        return;
    };

    // mark player selection
    game.playerMark(playerSelect, playerMarker);
    display.markerDisplay(playerSelect, playerMarker);

    // check winning pattern (sequence: row > col > cross)
    // break loop if already found winning pattern.
    for (let i = 0; i < 3; i++){
        
        if (i === 0){
            let checkObj = game.checkRow();
            playerID = checkObj.playerID;
            patternID = checkObj.patternID;

            if (playerID != 'none') {break};
        };

        if (i === 1){
            let checkObj = game.checkCol();
            playerID = checkObj.playerID;
            patternID = checkObj.patternID;

            if (playerID != 'none') {break};
        };

        if (i === 2){
            let checkObj = game.checkCross();
            playerID = checkObj.playerID;
            patternID = checkObj.patternID;
        };
    };

    if (playerID != 'none'){
        // display winning style
        display.winDisplay(playerID,patternID);

        // disable game click once done
        gameArea = document.querySelector('.game-area');
        gameArea.removeEventListener('click',gamePlay);

    }else{
        // update gameCount
        gameCount += 1;

        // update marker for next player
        playerMarker = game.changeMarker(playerMarker);
    };
    
};

const gameDisplay = () =>{

    // initialize display
    const initializeDisplay = () =>{
        
        for (row = 1; row < 4; row++){
            for (col = 1; col < 4; col++){
                textSelector = `div[class="${row}-${col}"]`;
                cell = document.querySelector(textSelector);

                // delete child element 'marker'
                cell.removeChild(cell.firstElementChild);

                // update id
                cell.setAttribute('id', '-');
            };
        };
    }
    
    // create marker child element
    const markerElement = (cell) =>{
        
        // create child element
        const markerElement = document.createElement('div');
        markerElement.setAttribute('class', 'marker');

        // append to the selected cell
        const htmlSelect = `div[class="${cell}"]`;
        const htmlCell = document.querySelector(htmlSelect);
        htmlCell.appendChild(markerElement);

        // update class id with 'playerMarked'
        htmlCell.setAttribute('id','playerMarked');

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
                htmlCell.setAttribute('id','x');
                break;
            
            case 'o':
                htmlCell.style.backgroundImage = 'url("./Assets/o.png")';
                htmlCell.setAttribute('id','o');
                break;

            default:
                htmlCell.style.backgroundImage = '';
                htmlCell.setAttribute('id','-');
                break;
        }; 
    };

    // display winning pattern
    const winDisplay = (playerId, patternId) =>{

        // get pattern information
        arrayPatternId = patternId.split('-');
        
        // pattern type row, col or cross
        patternType = arrayPatternId[0];

        // pattern location e.g row/col 0, 1 or 2; or cross 1 or 2
        patternLoc = Number(arrayPatternId[1]);

        // update display
        switch (patternType){

            case ('row'):
                for (col = 1; col < 4; col++){

                    textSelector = `div[class="${patternLoc + 1}-${col}"]>.marker`
                    cell = document.querySelector(textSelector);
                    cellParent = cell.parentNode;

                    // update parent id
                    cellParent.setAttribute('id', 'playerMarked-win');

                    // update image and class based on marker type
                    if (playerId === 'x'){
                        cell.style.backgroundImage = 'url("./Assets/x-green.png")';
                    };

                    if (playerId === 'o'){
                        cell.style.backgroundImage = 'url("./Assets/o-green.png")';
                    }; 
                };
                break;

            case ('col'):

                for (row = 1; row < 4; row++){

                    textSelector = `div[class="${row}-${patternLoc + 1}"]>.marker`
                    cell = document.querySelector(textSelector);
                    cellParent = cell.parentNode;

                    // update parent id
                    cellParent.setAttribute('id', 'playerMarked-win');

                    // update image and class based on marker type
                    if (playerId === 'x'){
                        cell.style.backgroundImage = 'url("./Assets/x-green.png")';
                    };

                    if (playerId === 'o'){
                        cell.style.backgroundImage = 'url("./Assets/o-green.png")';
                    }; 
                };
                break;

            case ('cross'):
                const pattern1 = ['1-1', '2-2', '3-3'];
                const pattern2 = ['1-3', '2-2', '3-1'];
                let arrayCell = (patternLoc === 1)? pattern1 : pattern2;

                for (let cell of arrayCell){

                    textSelector = `div[class="${cell}"]>.marker`
                    cell = document.querySelector(textSelector);
                    cellParent = cell.parentNode;

                    // update parent id
                    cellParent.setAttribute('id', 'playerMarked-win');

                    // update image and class based on marker type
                    if (playerId === 'x'){
                        cell.style.backgroundImage = 'url("./Assets/x-green.png")';
                    };

                    if (playerId === 'o'){
                        cell.style.backgroundImage = 'url("./Assets/o-green.png")';
                    }; 
                };
                break; 
        };

    };

    return {markerDisplay, initializeDisplay, winDisplay};
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