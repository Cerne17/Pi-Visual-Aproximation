// SETTING THE DOM OBJECTS
const currentAproximationParagraph = document.querySelector("#currentAp");
const startBtn = document.querySelector("#startBtn");
const piDifferenceExhib = document.querySelector("#piDiff");
const truePi = document.querySelector("#truePi");
const canvas = document.querySelector("#canvas");
const canvasLength = canvas.width;
const context = canvas.getContext('2d');

// SETTING THE LOGIC'S VARIABLES
var totalPixels = 0;
var pixelsInside = 0;
const floatDigits = 15;

// CIRCLE'S CHARACTERISTICS
const radius = canvasLength/2;
const centerX = canvasLength/2;
const centerY = canvasLength/2;
const theta_0 = 0;
const finalTheta = 2*Math.PI;

// EXHIBITING PI IN THE SCREEN
truePi.innerHTML = `${Math.PI.toFixed(floatDigits)}`;

function drawCircle(centerX, centerY, radius, startAngle, endAngle)
{
    context.beginPath();
    context.arc(centerX, centerY, radius, startAngle, endAngle);
    context.lineWidth = 5;
    context.strokeStyle = "#E7ECEE";
    context.stroke();
}

drawCircle(centerX, centerY, radius, theta_0, finalTheta);

// RANDOM NUMBER PICKER
function pickNumber(maxValue)
{
    return Math.floor( Math.random() * maxValue +1 );
}

// LOGIC TO CHECK IF THE PIXEL IS IN THE CIRCLE
function pixelInCircle(xCoord, yCoord)
{
    let expression = Math.pow(xCoord, 2) + Math.pow(yCoord, 2) + radius*(radius-2*(xCoord+yCoord))
    if (expression <= 0)
    {
        return true;
    } else
    {
        return false;
    }
}

// DRAW PIXELS FUNCTION 
function drawPixel(canvasWidth, canvasHeight)
{
    var xPos = pickNumber(canvasWidth);
    var yPos = pickNumber(canvasHeight);
    context.beginPath();
    context.arc(xPos, yPos, 2.5, 0, Math.PI * 2)
    if (pixelInCircle(xPos, yPos) == true)
    {
        context.strokeStyle = "#EBE836";
        pixelsInside++;
    } else
    {
        context.strokeStyle = "#1E8ED4";
    }
    totalPixels++;
    context.stroke();
}

// APROXIMATION CALCULATION
function piCalc(pixelsInsideCircle, overallPixels)
{
    // (Circle area)/(Square area) = pi/4
    aproxedPi = 4*(pixelsInsideCircle/overallPixels);
    return aproxedPi;
}

// START PROCCESS ON CLICK
let pixelsPerIteration = 1;

startBtn.onclick = () => {
    setInterval(() => {
        let i=0;
        while (i<pixelsPerIteration)
        {
            drawPixel(canvasLength, canvasLength);
            i++;
        }
        if(pixelsPerIteration<=100)
        {
            pixelsPerIteration++;
        }
        var apPi = piCalc(pixelsInside, totalPixels);
        apPi = apPi.toFixed(floatDigits);
        currentAproximationParagraph.innerHTML = apPi;
        var piDiff = Math.abs(Math.PI.toFixed(floatDigits) - apPi).toFixed(floatDigits);
        piDifferenceExhib.innerHTML = piDiff;
        drawCircle(centerX, centerY, radius, theta_0, finalTheta);
    }, 500)
}