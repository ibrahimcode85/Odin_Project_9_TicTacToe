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

    
    return {playerSelect, getBoard};

};

// run the game
let board1 = [['_','_','_'], ['_','_','_'], ['_','_','_']];
const game1 = gameBoard(board1);
game1.playerSelect('1-2','x');
game1.playerSelect('1-1','o');