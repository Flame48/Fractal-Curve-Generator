class Variable {
    constructor(name, base, rule) {
        this.name = name;
        this.base = base;
        this.variables;
        this.activate;
        this.rule = rule;
    }

    setActivationFunction() {
        let fBody = 'if(n==0) {\nthis.base();\nreturn;\n}\n';

        for(let i=0; i<this.rule.length; i++) {
            let indx = this.findIndxOf(this.rule.charAt(i));
            if(indx == -1)
            continue;
            fBody = fBody + 'this.variables['+indx+'].activate(n-1);\n';
        }
        fBody = fBody + 'return;';
        this.activate = new Function('n', fBody);
        console.log(this.activate)
    }

    setVariableList(variables) {
        this.variables = variables;
    }

    findIndxOf(name) {
        for(let i=0; i<this.variables.length; i++) {
            if(this.variables[i].name === name) {
                return i;
            }
        }
        return -1;
    }
}

// Setting up Canvas Reference and Context
let canv = document.getElementById('canv');
let ctx = canv.getContext('2d');
let width = canv.width;
let height = canv.height;
ctx.translate(width/2, height/2);
const Pi = Math.PI;

// Setting up Turtle
let turtStep = 1.8; // Adjusts length of edge
let turtTurnAng = Pi/3; // Adjusts Turn Angle

let turtPos = new Vector(0, 0);
let turtDir = new Vector(1, 0);

let turt = new Turtle(turtPos, turtDir);

let firstRun = true;
let xMin = turt.pos.x;
let xMax = turt.pos.x;
let yMin = turt.pos.y;
let yMax = turt.pos.y;
let fractLen = 0;

function Min(a,b) {
    if(a>b)
    return b;
    return a;
}
function Max(a,b) {
    if(a>b)
    return a;
    return b;
}

let base = () => { };
let Forward = () => {
    turt.move(turtStep);
    if(turt.pen)
    ctx.lineTo(turt.pos.x, turt.pos.y);
    if(!firstRun)
    return;
    xMin = Min(xMin, turt.pos.x);
    xMax = Max(xMax, turt.pos.x);
    yMin = Min(yMin, turt.pos.y);
    yMax = Max(yMax, turt.pos.y);
    fractLen++;
};
let turnP = () => { turt.turn(turtTurnAng) };
let turnN = () => { turt.turn(-turtTurnAng) };

/*
    Example Fractals:

    Sierpinski Arrowhead:
    A --> BF+AF+B
    B --> AF-BF-A
    turn: Pi/3
    Axiom: A

    Hilbert Curve:
    A --> +BF-AFA-FB+
    B --> -AF+BFB+FA-
    turn: Pi/2
    Axiom: A

    Gosper:
    F --> F-G--G+F++FF+G-
    G --> +F-GG--G-F++F+G
    turn: Pi/3
    Axiom: F

    Dragon:
    F --> F+G
    G --> F-G
    turn: Pi/2
    Axiom: F

    Custom:
    F --> F+G+F
    G --> G-F-G
    turn: Pi/3
    Axiom: F
*/

let Vars = [];
let Axiom = 'A';
let N = 8;

run();
function main() {
    for(let i=0; i<Vars.length; i++) {
        Vars[i].setVariableList(Vars);
        Vars[i].setActivationFunction();
    }
    
    function indxOf(name) {
        for(let i=0; i<Vars.length; i++) {
            if(Vars[i].name === name) {
                return i;
            }
        }
        return -1;
    }

    let fBody = '';
    for(let i=0; i<Axiom.length; i++) {
        let indx = indxOf(Axiom.charAt(i));
        if(indx==-1)
        continue;
        fBody += 'Vars['+indx+'].activate(N);\n';
    }
    let start = new Function('N', fBody);
    
    ctx.fillStyle = '#000000';
    ctx.fillRect(-width/2, -height/2, width, height);

    ctx.strokeStyle = '#ffffff'; //Adjusts line color
    ctx.lineWidth = 1; //Adjusts line width

    // Running algorithm to find the mean position of all points on the curve.
    turt.moveTo(new Vector(0,0));
    turt.penUp();
    start(N);
    firstRun = false;

    ctx.fillStyle = '#ff0000';
    xMean = (xMin+xMax)/2;
    yMean = (yMin+yMax)/2;
    console.log(xMin, yMin, xMax, yMax);


    // Redrawing curve to be centered on the canvas.
    turt.moveTo(new Vector(-xMean,-yMean));
    turt.setDir(0);
    turt.penDown();

    ctx.beginPath();
    ctx.moveTo(turt.pos.x, turt.pos.y);
    start(N);

    ctx.stroke();
}

function getInputs() {
    // Regex for invalid inputs.
    let regex = new RegExp(/[^ABFG\+\-]/);

    let axiomIn = document.getElementById("axiomIn").value.toUpperCase();
    if (regex.test(axiomIn)) {
        throw new Error("INVALID INPUT");
    }

    let aValIn = document.getElementById("aRelationships").value.toUpperCase();
    if (regex.test(aValIn)) {
        throw new Error("INVALID INPUT");
    }
    
    let bValIn = document.getElementById("bRelationships").value.toUpperCase();
    if (regex.test(bValIn)) {
        throw new Error("INVALID INPUT");
    }

    let fValIn = document.getElementById("fRelationships").value.toUpperCase();
    if (regex.test(fValIn)) {
        throw new Error("INVALID INPUT");
    }

    let gValIn = document.getElementById("gRelationships").value.toUpperCase();
    if (regex.test(gValIn)) {
        throw new Error("INVALID INPUT");
    }

    N = document.getElementById("numIter").value;
    turtTurnAng = document.getElementById("turnAngle").value * Pi / 180;
    turtStep = document.getElementById("turnStepSize").value;
    Axiom = axiomIn;
    Vars = [];
    
    Vars.push(new Variable('A', base, aValIn));
    Vars.push(new Variable('B', base, bValIn));
    Vars.push(new Variable('F', Forward, fValIn));
    Vars.push(new Variable('G', Forward, gValIn));
    Vars.push(new Variable('+', turnP, '+'));
    Vars.push(new Variable('-', turnN, '-'));
}

function run() {
    try {
        getInputs();
        main();
    } catch (error) {
        console.log(error);
    }
}