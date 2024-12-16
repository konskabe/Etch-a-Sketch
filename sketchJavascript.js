const container = document.getElementById("container");
let containerSize = window.innerWidth <= 768 ? 320 : 480;
const rainbow = document.getElementById("rainbow");
const classic = document.getElementById("classic");
const eraser = document.getElementById("eraser");
const buttons = document.querySelectorAll("button");

function createGrid(size){
    container.replaceChildren();
    for(let i=0; i<size; i++){
        let row = document.createElement("div");
        row.className = "row";
        row.id = "row"+i;
        container.appendChild(row);
        for (let j = 0;  j <size; j++){
            let square = document.createElement("div");
            square.className = "square";
            document.getElementById("row"+i).appendChild(square);
            square.style.width = containerSize/size +"px";
            square.style.height = containerSize/size +"px";
        }
    }
    draw();
}

function updateContainerSize(){
    const squares = document.querySelectorAll(".square");
    const newContainerSize = window.innerWidth <= 768 ? 320 : 480;
    if (containerSize !== newContainerSize) {
        containerSize = newContainerSize;
        squares.forEach((square) => {
            square.style.width = containerSize / size + "px";
            square.style.height = containerSize / size + "px";
        });
    }
}

window.addEventListener("resize", updateContainerSize);


function draw() {
    let squares = document.querySelectorAll(".square");
    let colorMode = () => "black"; // Default to black
    let isDrawing = false;

    function setHoverColor() {
        squares.forEach((square) => {
            const newSquare = square.cloneNode(true); 
            square.replaceWith(newSquare); 

            newSquare.addEventListener("mousedown", () => {
                newSquare.style.backgroundColor = colorMode();
                isDrawing = true; // Start drawing mode
            });

            newSquare.addEventListener("mouseenter", () => {
                if (isDrawing){
                    newSquare.style.backgroundColor = colorMode();
                };
            });
        });
        squares = document.querySelectorAll(".square"); // Update the squares NodeList
    }

    // Define color modes
    const blackMode = () => "black";
    const whiteMode = () => "white";
    const rainbowMode = getRandomRGBColor;

    // Set initial hover color mode to black
    setHoverColor();

    classic.addEventListener("click", () => {
        colorMode = blackMode;
        setHoverColor();
    });

    rainbow.addEventListener("click", () => {
        colorMode = rainbowMode;
        setHoverColor();
    });

    eraser.addEventListener("click", () => {
        colorMode = whiteMode;
        setHoverColor();
    });
    document.addEventListener("mouseup", () => isDrawing = false);
}




function getRandomRGBColor() {
    const r = Math.floor(Math.random() * 256); // Red
    const g = Math.floor(Math.random() * 256); // Green
    const b = Math.floor(Math.random() * 256); // Blue
    return `rgb(${r}, ${g}, ${b})`;
}

//slider size input
let slider = document.getElementById("gridSize");
let output = document.getElementById("demo");
let size = slider.value;
output.innerHTML = slider.value + "x" + slider.value;

createGrid(size);

slider.oninput = function() {
    size = this.value;
    output.innerHTML = size+"x"+size;
    createGrid(size);
}

const clearButton = document.getElementById("clearButton");
clearButton.addEventListener("click", ()=> {
    createGrid(size);
});

buttons.forEach((button)=> {
    button.addEventListener("click" , function (){
        if (document.querySelector("button.active")){
             document.querySelector("button.active").classList.remove("active");
        }
        if(button !== clearButton){
            button.classList.add("active");
        }else{
            classic.classList.add("active");
            clearButton.blur();
        }
    });
});



