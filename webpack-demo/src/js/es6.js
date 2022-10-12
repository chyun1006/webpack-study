let proxy = new Proxy({},{
    get:function(){
        return 1
    }
})

console.log(proxy.name)