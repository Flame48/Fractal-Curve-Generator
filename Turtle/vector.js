class Vector {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.r;
        this.angle;
        this.calcPolar();
    }

    calcPolar() {
        this.r = Math.sqrt(Math.pow(this.x,2) + Math.pow(this.y,2));
        if(this.x==0) {
            if(this.y<0) {
                this.angle = 3*Math.PI/2;
                return;
            }
            if(this.y>0) {
                this.angle = Math.PI/2;
                return;
            }
            this.angle = 0;
        }
        this.angle = Math.atan(this.y/this.x);
        if(this.x>=0&&this.y>=0)
        return;
        if(this.x<0) {
            this.angle+=Math.PI;
            return;
        }
        this.angle+=2*Math.PI;
    }

    setDir(angle) {
        this.angle = this.angleWrap(angle);
        this.x = this.r * Math.cos(this.angle);
        this.y = this.r * Math.sin(this.angle);
    }

    rotate(angle) {
        this.setDir(angle+this.angle);
    }

    normalize() {
        this.r = 1;
        this.setDir(this.angle);
    }

    add(vector) {
        this.x += vector.x;
        this.y += vector.y;
        this.calcPolar();
    }

    sub(vector) {
        this.x-=vector.x;
        this.y-=vector.y;
        this.calcPolar();
    }

    mult(val) {
        this.x*=val;
        this.y*=val;
        this.calcPolar();
    }

    copy() {
        let copy = new Vector(this.x, this.y);
        return copy;
    }

    angleWrap(angle) {
        if(angle<0)
        return this.angleWrap(2*Math.PI + angle);
        if(angle>=2*Math.PI)
        return this.angleWrap(angle - 2*Math.PI);
        return angle;
    }
}