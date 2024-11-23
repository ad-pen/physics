// Get the canvas element and its context
const canvas = document.getElementById('electricFieldCanvas');
const ctx = canvas.getContext('2d');

// Canvas dimensions
const width = canvas.width;
const height = canvas.height;

// Define an array to store charges
let charges = [];

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

        if (distanceSquared === 0) return; // Avoid division by zero

        // Electric field magnitude due to this charge (proportional to 1 / r^2)
        const E = charge.charge / distanceSquared;

        // Add the x and y components of the field vector
        Ex += E * (dx / distance);
        Ey += E * (dy / distance);
    });

    return { Ex, Ey };
}

// Function to draw the electric field vector at a specific point with arrowheads
function drawFieldAtPoint(x, y) {
    const field = calculateElectricField(x, y);
    const fieldStrength = Math.sqrt(field.Ex * field.Ex + field.Ey * field.Ey);

    // Normalize the field vectors and scale for visualization
    const scale = 100 / fieldStrength;  // Adjust the scale for better visualization
    const endX = x - field.Ex * scale;
    const endY = y - field.Ey * scale;

    // Draw the line representing the electric field
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = 'black';
    ctx.stroke();

    // Draw arrowhead
    drawArrowhead(x, y, endX, endY);
}

// Function to draw an arrowhead at the end of a line
function drawArrowhead(fromX, fromY, toX, toY) {
    const angle = Math.atan2(toY - fromY, toX - fromX);
    const arrowLength = 10;  // Length of the arrowhead lines
    const arrowWidth = 5;  // Width of the arrowhead angle

    ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.lineTo(
        toX - arrowLength * Math.cos(angle - Math.PI / 6),
        toY - arrowLength * Math.sin(angle - Math.PI / 6)
    );
    ctx.lineTo(
        toX - arrowLength * Math.cos(angle + Math.PI / 6),
        toY - arrowLength * Math.sin(angle + Math.PI / 6)
    );
    ctx.closePath();
    ctx.fillStyle = 'black';
    ctx.fill();
}

// Function to add a charge
function addCharge() {
    const x = parseFloat(prompt("Enter the X-coordinate of the charge (0 to 600):", 300));
    const y = parseFloat(prompt("Enter the Y-coordinate of the charge (0 to 400):", 200));
    const charge = parseFloat(prompt("Enter the charge value (1 for positive, -1 for negative):", 1));

    if (!isNaN(x) && !isNaN(y) && !isNaN(charge)) {
        charges.push({ x, y, charge });
        drawElectricField();
    } else {
        alert("Invalid input. Please try again.");
    }
}

// Function to remove the last charge
function removeCharge() {
    if (charges.length > 0) {
        charges.pop();
        drawElectricField();
    } else {
        alert("No charges to remove.");
    }
}

// Initial draw
drawElectricField();
