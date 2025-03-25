/**
 * le se a example of simple callback function adn convert this to promise
 */


const { isUtf8 } = require('buffer')
const fs = require('fs')
function reactFunctionCallback(filePath, callback) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err)
            return callback(err)
        else
            return callback(data)
    })
}
// reactFunctionCallback('./promis.txt', (err, data) => {
//     if (err)
//         console.log(err);
//     else
//         console.log(data);
// })

// lets convert above callback code into promise
 function reactFunctionPromise(filePath)
 {
    return new Promise(function(resolve, reject){
        fs.readFile(filePath,'utf8',(err,data)=>{
            if(err)
                reject(err)
            else
                resolve(data)
        })
    })
 }

 reactFunctionPromise('./promise.txt').then((res)=>
{
    console.log("promise resolve",res);
    
}).catch((err)=>{
    console.log("promise reject",err);
    
})