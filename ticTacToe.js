function gameBoard(boardArray) {
    
    // get cell reference
    const getCell = (cell) =>{
        cellReferenceArray = cell.split('-');
        rowReference = Number(cellReferenceArray[0]) - 1;
        colReference = Number(cellReferenceArray[1]) - 1;

        return cellValue = boardArray[rowReference][colReference];
    }
    
    // mark player's selected cell
    const playerSelect = (cell,marker) => {

        cellValue = getCell(cell);

        if (cellValue === '_'){ 
            boardArray[rowReference][colReference] = marker; 
        }else{
            console.log(`This cell has already been marked ${cellValue}`);
        };
    
    };

    // get updated board
    const getBoard = () => {console.log(boardArray)};

    
    // check row
    const checkRow = () =>{
        
        let result_player1=[];
        let result_player2=[];

        for (let row=0; row<3; row++){
            
            // initialize counter at start of each row
            let counter_player1 = 0;
            let counter_player2 = 0;

            // count element at each column
            for (let col=0; col<3; col++){
                cellValue = boardArray[row][col];

                if (cellValue === 'x'){counter_player1++};
                if (cellValue === 'o'){counter_player2++}
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
        
    };



    return {playerSelect, getBoard, checkRow};

};

// run the game
let board1 = [['_','_','_'], ['_','_','_'], ['_','_','_']];
const game1 = gameBoard(board1);
game1.playerSelect('1-2','x');
game1.playerSelect('1-1','o');
game1.playerSelect('1-3','o');
game1.checkRow();

game1.playerSelect('2-1','o');
game1.playerSelect('2-2','o');
game1.playerSelect('2-3','o');
game1.checkRow();