let table;
let data = [];
let colors = {};
let currentIndex = 0;
let lastSwitchTime = 0;
let switchInterval = 3000; 

function preload() {
    
    table = loadTable('package wates UK.csv', 'csv', 'header');
}

function setup() {
    createCanvas(800, 600);
    textAlign(CENTER, CENTER);
    textSize(24);
    processData();
}

function processData() {
    
    for (let row of table.rows) {
        let material = row.get('Material');
        let amount = parseFloat(row.get('Packaging waste arising').replace(/,/g, ''));
        let rate = parseFloat(row.get('Achieved recovery / recycling rate').replace('%', ''));
        if (!isNaN(amount) && !isNaN(rate)) {
            data.push({ material, amount, rate });
        }
    }

    let colorPalette = [
        [255, 0, 0],
        [255, 165, 0],
        [255, 255, 0],
        [0, 128, 0],
        [0, 0, 255],
        [75, 0, 130],
        [238, 130, 238]
    ];
    
    let index = 0;
    for (let item of data) {
        colors[item.material] = colorPalette[index % colorPalette.length];
        index++;
    }
}

function draw() {
    background(255);
    let x = width / 2;
    let y = height / 2;


    stroke(0);
    noFill();
    ellipse(x, y, 300, 300);
    fill(0);
    noStroke();
    textSize(16); 
    text("This is the size of the circle with 100% recycling rate", x, y + 200);

   
    if (millis() - lastSwitchTime > switchInterval) {
        currentIndex = (currentIndex + 1) % data.length;
        lastSwitchTime = millis();
    }

    let currentItem = data[currentIndex];

    fill(colors[currentItem.material]);
    let diameter = map(currentItem.rate, 0, 100, 50, 300); 
    ellipse(x, y, diameter, diameter);

    fill(0);
    noStroke();
    textSize(24); 
    text(currentItem.material, x, y);
}
