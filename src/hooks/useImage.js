import { useEffect, useState } from "react";

export const useImage = (id) => {
    const [images, setImages] = useState([]);
    
    useEffect(() => {
        fetch(`http://localhost:8080/deteObjetos/ListImages?id=${id}`)
        .then(response => (response.json()))
        .then(response => {
            setImages(response);
        });
    }, [images]); 

    const onAddImage = async (file) => {
        const formData = new FormData();

        formData.append('file', file);
        formData.append("id", id);
        const options = {
            method: 'POST',
            body: formData
        };
        return fetch('http://localhost:8080/deteObjetos/AddImage', options)
        .then(response => (response.json()))
        .then(response => {
            setImages([...images, response])
            return response;
        }).catch(error => {
            return {"error": error};
        });
    }

    const onEditImage = async (file, idObj) => {
        const formData = new FormData();

        formData.append('file', file);
        formData.append("id", idObj);
        const options = {
            method: 'POST',
            body: formData
        };
        return fetch('http://localhost:8080/deteObjetos/UpdateImage', options)
        .then(response => (response.json()))
        .then(response => {
            setImages([...images, response])
            return response;
        }).catch(error => {
            return {"error": error};
        });
    }

    const onEliminateImage = async (idObj) => {
        //build data
        const data = {
            "id": idObj,
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
        return fetch('http://localhost:8080/deteObjetos/DeleteImage', options)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            return response;
        });
    }

    return {
        images,
        onAddImage,
        onEditImage,
        onEliminateImage
    }
}