class Turtle {
    constructor(startPos, startDir) {
        this.pos = startPos;
        this.dir = startDir;
        this.pen;
    }
    
    move(r) {
        let copy = this.dir.copy();
        copy.mult(r);
        this.pos.add(copy);
    }

    moveTo(movePos) {
        this.pos = movePos;
    }

    turn(angle) {
        this.dir.rotate(angle);
    }

    setDir(angle) {
        this.dir.setDir(angle);
    }

    penUp() {
        this.pen = false;
    }

    penDown() {
        this.pen = true;
    }
}