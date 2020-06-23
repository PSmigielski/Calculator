function round(n, k) {
    const factor = Math.pow(10, k+1);
    n = Math.round(Math.round(n*factor)/10);
    return n/(factor/10);
}
function show(result) {
    k=12-round(result,0).toString().length;
    document.querySelector('.display').innerHTML=round(result,k);
}
class Calc {
    constructor(){
        this.accum = 0;
        this.flagnewnum = false;
        this.pendingop = "";
    }
    numpressed(num) {
        if (this.flagnewnum) {
            document.querySelector('.display').innerHTML=num;
            this.flagnewnum = false;
        }
        else {
            if (document.querySelector('.display').innerHTML=="0") document.querySelector('.display').innerHTML = num;
            else {
                if(document.querySelector('.display').innerHTML.length<12) document.querySelector('.display').innerHTML+= num;
                show(document.querySelector('.display').innerHTML);
            }
        }
    }
       
    myclear(){
        this.accum = 0;
        this.pendingop = "";
        clearentry();
    }

    clearentry() {
        document.querySelector('.display').innerHTML = "0";
        this.flagnewnum = true;
    }

    percent() {
        show((parseFloat(document.querySelector('.display').innerHTML) / 100) * parseFloat(this.accum));
    }

    sqroot() {
        show(Math.sqrt(parseFloat(document.querySelector('.display').innerHTML)));
    }

    decimal() {	
        let curreadout = document.querySelector('.display').innerHTML;
        if (this.flagnewnum) {
            curreadout = "0.";
            this.flagnewnum = false;
        }
        else {
            if (curreadout.indexOf(".") == -1) curreadout += ".";
        }
        document.querySelector('.display').innerHTML = curreadout;
    }

    operation(op) {
        let readout = document.querySelector('.display').innerHTML;
        if (this.flagnewnum && this.pendingop != "=");
            else {
                this.flagnewnum = true;
                if ( '+' == this.pendingop ) this.accum += parseFloat(readout);
                else 
                    if ( '-' == this.pendingop ) this.accum -= parseFloat(readout);
                    else 
                        if ( '/' == this.pendingop ) this.accum /= parseFloat(readout);
                        else 
                            if ( '*' == this.pendingop ) this.accum = this.accum * parseFloat(readout);
                            else this.accum = parseFloat(readout);
            show(this.accum);
            this.pendingop = op;
            }   
    }
}

let Calculator = new Calc();