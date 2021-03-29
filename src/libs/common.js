import config from './config'
const common = {
    PostWorkData:function (url,obj){
        if(obj!=undefined){
            let data = new FormData()
            for(let key in obj){
                data.append(key,obj[key])
            }
            return fetch(config.url + config.work + url,{
                method:"POST",
                headers:new Headers({
                    "Authorization":localStorage.getItem('token')
                }),
                body:data
            })
        }
        return fetch(config.url + config.work + url,{
            method:"POST",
            headers:new Headers({
                "Authorization":localStorage.getItem('token')
            })
        })
    },
    Authorization:function (token){
        return fetch(config.url + config.work + "token",{
            method:'POST',
            headers:new Headers({
                "Authorization":token,
            })
        })
    },
    GetWorkData:function (url){
        return fetch(config.url + config.work + url,{
            method:"GET",
            headers:new Headers({
                "Authorization":localStorage.getItem('token')
            })
        })
    },
    DeleteWorker:function(id){
        return fetch(config.url + config.work + "worker/" + id,{
            method:"DELETE",
            headers:new Headers({
                "Authorization":localStorage.getItem('token')
            })
        })
    }
}

export default common