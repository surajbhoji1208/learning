const promise1 = new Promise(function(resolve,reject){
    setTimeout(()=>{
        console.log("1st promise resolve")
        resolve({msg:"first data"})
    },1000)
})
const promise2 = new Promise(function(resolve,reject){
    setTimeout(()=>{
        console.log("2nd promise resolve")
        reject({msg:"2nd data"})
    },1000)
})
const promise3 = new Promise(function(resolve,reject){
    setTimeout(()=>{
        console.log("3rd promise resolve")
        resolve({msg:"3rd data"})
    },1000)
})

Promise.all([promise1,promise2,promise3]).then((data)=>{
    console.log("promise.all runs...",data)
    return data.msg
}).then((msg)=>{console.log(msg);
}).catch((err)=>console.log(err))