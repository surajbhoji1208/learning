// ===============================Polifil for bind=================================
let printName = function()
{
    console.log(this.fistName+ "  "+ this.LastName);
    
}

Function.prototype.myBind =function(...args){
    console.log(...args);
    
    const obj = this
    params = args.slice(1)
    return function(...args2)
    {
        obj.apply(args[0],[...params,...args2])
    }
}

const myBindemethod = printName.myBind({fistName:"suraj"})
myBindemethod()