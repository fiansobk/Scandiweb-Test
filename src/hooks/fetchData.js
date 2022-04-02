export default function fetchData (method = 'GET' , data = {} , endpoint = 'endpoint') {
    const url = 'https://darkling-swivel.000webhostapp.com/' + endpoint;
    const param = {
        method : method,
        
    };
    if (method === 'POST') {
        param.body = JSON.stringify(data) ;
    }
    const response = fetch( url , param )
    .then( (response) => {
        if (!response.ok)
            throw Error('connection fail.');
        return response.json();
    })
    .then( (res) => {
        if (res.error)
            return { success : true , err : res.error };
        return { success : true , data : res };
    })
    .catch( (err) => {
        return { success : false , err  };
    })
    
    return response ;

}