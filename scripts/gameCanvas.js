// Game canvas class
class GameCanvas {
    constructor() {
        this.grid = document.getElementById('grid');
        this.boardLength = 8;
        this.boardArray = [];
        this.currTile;
        this.otherTile;
    }

    // Fills an empty board with random tiles
    populateBoard() {
        for (let i = 0; i < this.boardLength; i++) {
            let row = [];
            for (let j = 0; j < this.boardLength; j++) {
                let tile = document.createElement("img");

                // Gives each tile img element an id value that can be used for later comparisons.
                tile.id = i.toString() + '-' + j.toString();

                // Randomly determines the image displayed.
                // For now, it only pulls from the five default cat images, since API
                // integration hasn't been done yet.
                // In the future, these default cat images will only be used as a backup for
                // the case where no API responses are received.
                tile.src = './images/defaultCat' + Math.floor(Math.random() * 5) + '.jpg';

                // Adds tile drag functionality
                tile.addEventListener("dragstart", dragStart); // For the initial click that starts the tile dragging
                tile.addEventListener("dragover", dragOver); // Moving the mouse after the initial click
                tile.addEventListener("dragenter", dragEnter); // When a tile is dragged onto another tile
                tile.addEventListener("dragleave", dragLeave); // When a tile is held over another tile
                tile.addEventListener("drop", dragDrop); // When the mouse is released, and the tile is dropped
                tile.addEventListener("dragend", dragEnd); // What happens after the tile dragging process has ended (tile swap)


                grid.append(tile);
                row.push(tile);
            }
            this.boardArray.push(row);
        }

        console.log(this.boardArray);
    }

    checkForMatches() {
        this.fiveTilesMatch();
        this.fourTilesMatch();
        this.threeTilesMatch();
    }

    fiveTilesMatch() {
        // console.log('fiveTilesMatch()'); //Only for testing purposes
    }

    fourTilesMatch() {
        // console.log('fourTilesMatch()'); //Only for testing purposes
    }

    threeTilesMatch() {
        // Checking for matches along the rows
        for (let r = 0; r < this.boardLength; r++) {
            for (let c = 0; c < this.boardLength - 2; c++) {
                let tile1 = this.boardArray[r][c];
                let tile2 = this.boardArray[r][c + 1];
                let tile3 = this.boardArray[r][c + 2];

                // If tiles match, remove the tile images, repopulate the board,
                // and give the player points. Planning on making this into its
                // own function to decrease redundant code.
                if (tile1.src === tile2.src && tile1.src === tile3.src && !tile1.src.includes("lightblue")) {
                    tile1.src = "./images/lightblue.JPG";
                    tile2.src = "./images/lightblue.JPG";
                    tile3.src = "./images/lightblue.JPG";

                    // Give the player points.

                }
            }
        }

        // Checking for matches along the columns
        for (let c = 0; c < this.boardLength; c++) {
            for (let r = 0; r < this.boardLength - 2; r++) {
                let tile1 = this.boardArray[r][c];
                let tile2 = this.boardArray[r + 1][c];
                let tile3 = this.boardArray[r + 2][c];

                if (tile1.src === tile2.src && tile1.src === tile3.src && !tile1.src.includes("lightblue")) {
                    tile1.src = "./images/lightblue.JPG";
                    tile2.src = "./images/lightblue.JPG";
                    tile3.src = "./images/lightblue.JPG";

                    // Give the player points.

                }
            }
        }
    }
};

// For the initial click that starts the tile dragging
function dragStart() {
    // The current tile is the one that was clicked on for the drag
    currTile = this;
}

// Moving the mouse after the initial click. Not currently used, but left for possible later additions.
function dragOver(e) {
    e.preventDefault();
}

// When a tile is dragged onto another tile. Not currently used, but left for possible later additions.
function dragEnter(e) {
    e.preventDefault();
}

// When a tile is held over another tile. Not currently used, but left for possible later additions.
function dragLeave(e) {
    e.preventDefault();
}

// When the mouse is released, and the tile is dropped
function dragDrop() {
    //The other tile is the one that the dragged (current) tile is dropped onto
    otherTile = this;
}

// What happens after the tile dragging process has ended (tile swap)
// !!! Planning on making the tile swap validity check into its own function !!!
function dragEnd() {
    // Decrease the player's turn count when they make a move.



    // Validity check start:

    // tile id set in populateBoard(). id="1-7" -> ["1", "7"] for easy comparison between the current and other tiles
    let currCoords = currTile.id.split("-");
    let r1 = parseInt(currCoords[0]);
    let c1 = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    // Establishes all possible valid moves
    let moveLeft = c2 == c1 - 1 && r2 == r1;
    let moveRight = c2 == c1 + 1 && r2 == r1;
    let moveUp = c2 == c1 && r2 == r1 - 1;
    let moveDown = c2 == c1 && r2 == r1 + 1;

    // Determines if the current move is valid
    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if (isAdjacent) {
        // Tile swap - in reality, it just swaps the images displayed in both tiles.
        let currImg = currTile.src;
        let otherImg = otherTile.src;

        currTile.src = otherImg;
        otherTile.src = currImg;
    }
}