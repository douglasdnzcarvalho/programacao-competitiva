require('readline').createInterface({input: process.stdin}).on('line', readLine).on('close', main);

const inputs = [];

function readLine(value){
    value = parseInt(value);

    if(value){
        inputs.push(value)
    }  
}

function main() {
    if(inputs.length){        
        let feynman = new Array(101);
    
        for(let index = 0; index < feynman.length; index += 1){
            if(index <= 1){                
                feynman[index] = index;
            }else{
                feynman[index] = (index * index) + feynman[index-1];
            }
        }

        for(let value of inputs){
            console.log(feynman[value]);
        }
    }
}