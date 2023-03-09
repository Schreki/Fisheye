function fetchData(url){

    return new Promise((resolve)=>{

        return fetch(url)
        .then((response) => response.json())
        .then((promise) => {
            resolve(promise);
        });

    })

}
