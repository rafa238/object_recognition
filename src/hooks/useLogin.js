async function useLoggin (username, password) {
    //build data
    const data = {
        "username": username,
        "passwd": password,
    };
    //build request
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(data),
    };
    //make request and send response
    
    return fetch('http://localhost:8080/deteObjetos/Loggin', options)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            return response;
        });
}

export default  useLoggin;