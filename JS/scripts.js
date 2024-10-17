// Get the canvas element and its context
const canvas = document.getElementById('electricFieldCanvas');
const ctx = canvas.getContext('2d');

// Canvas dimensions
const width = canvas.width;
const height = canvas.height;

// Define an array to store charges
let charges = [
    { x: 200, y: 200, charge: 1 },   // Positive charge
    { x: 400, y: 200, charge: -1 }   // Negative charge
];

// Function to draw the electric field lines based on charges
function drawElectricField() {
    ctx.clearRect(0, 0, width, height); // Clear the canvas

    // Draw charges
    drawCharges();

    // Loop through a grid of points on the canvas
    for (let x = 0; x < width; x += 20) {
        for (let y = 0; y < height; y += 20) {
            drawFieldAtPoint(x, y);
        }
    }
}

// Function to draw the charges
function drawCharges() {
    charges.forEach(charge => {
        ctx.beginPath();
        ctx.arc(charge.x, charge.y, 10, 0, 2 * Math.PI);
        ctx.fillStyle = charge.charge > 0 ? 'red' : 'blue';  // Positive: red, Negative: blue
        ctx.fill();
    });
}

// Function to calculate the electric field at a point (x, y)
function calculateElectricField(x, y) {
    let Ex = 0, Ey = 0; // Electric field components

    charges.forEach(charge => {
        const dx = x - charge.x;
        const dy = y - charge.y;
        const distanceSquared = dx * dx + dy * dy;
        const distance = Math.sqrt(distanceSquared);
        
        // Electric field magnitude due to this charge (proportional to 1 / r^2)
        const E = charge.charge / distanceSquared;

        // Add the x and y components of the field vector
        Ex += E * (dx / distance);
        Ey += E * (dy / distance);
    });

    return { Ex, Ey };
}

// Function to draw the electric field vector at a specific point
function drawFieldAtPoint(x, y) {
    const field = calculateElectricField(x, y);
    const fieldStrength = Math.sqrt(field.Ex * field.Ex + field.Ey * field.Ey);

    // Normalize the field vectors and scale for visualization
    const scale = 100 / fieldStrength;  // Adjust the scale for better visualization

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - field.Ex * scale, y - field.Ey * scale);  // Draw field line
    ctx.strokeStyle = 'black';
    ctx.stroke();
}

// Function to update charges based on user input
function updateCharges() {
    // Get values from input fields
    const charge1X = parseFloat(document.getElementById('charge1X').value);
    const charge1Y = parseFloat(document.getElementById('charge1Y').value);
    const charge1Value = parseFloat(document.getElementById('charge1Value').value);

    const charge2X = parseFloat(document.getElementById('charge2X').value);
    const charge2Y = parseFloat(document.getElementById('charge2Y').value);
    const charge2Value = parseFloat(document.getElementById('charge2Value').value);

    // Update the charges array
    charges[0] = { x: charge1X, y: charge1Y, charge: charge1Value };
    charges[1] = { x: charge2X, y: charge2Y, charge: charge2Value };

    // Redraw the electric field with updated charges
    drawElectricField();
}

// Call the function to draw the electric field initially
drawElectricField();
