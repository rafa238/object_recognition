import React, { useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom';
import { useImage } from '../hooks/useImage';
import { AddModal } from './AddModal';
import Swal from 'sweetalert2';
const BASE_URL = "http://localhost:8080/deteObjetos/";

export const Images = () => {
    const { id, edit } = useParams();
    const [allowEdit, setEdit] = useState((edit == 1));
    
    const { images, onAddImage, onEditImage, onEliminateImage} = useImage(id);
    
    const handleAddImage = async () => {
        const { value: file } = await Swal.fire({
            title: 'Selecciona una imagen',
            input: 'file',
            inputAttributes: {
                'accept': 'image/*',
                'aria-label': 'Selecciona una imagen de tu galeria'
            }
        })
          
        if (file) {
            const reader = new FileReader();
            //ejecutamos el hook para enviar la peticion
            const response = await onAddImage(file);
            console.log(response);
            if(response.hasOwnProperty('error')){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "Al parecer tu imagen no se ha podido subir"
                });
            } else {
                reader.readAsDataURL(file);
                reader.onload = (e) => {
                    Swal.fire({
                        title: 'Tu imagen se ha subido con exito',
                        imageUrl: e.target.result,
                        imageAlt: 'Tu imagen subida'
                    });
                }
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Parece que algo fue mal durante el proceso o no seleccionaste alguna imagen valida!'
            });
        }
    }

    const handleEditImage = async (idObj, routeObj) => {
        const { value: file } = await Swal.fire({
            title: 'Selecciona una imagen para cambiar la actual',
            imageUrl: BASE_URL + routeObj,
            imageAlt: 'Tu imagen subida',
            input: 'file',
            inputAttributes: {
                'accept': 'image/*',
                'aria-label': 'Selecciona una imagen de tu galeria'
            }
        })
          
        if (file) {
            const reader = new FileReader();
            //ejecutamos el hook para enviar la peticion
            const response = await onEditImage(file, idObj);
            console.log(response);
            if(response.hasOwnProperty('error')){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "Al parecer tu imagen no se ha podido subir"
                });
            } else {
                reader.readAsDataURL(file);
                reader.onload = (e) => {
                    Swal.fire({
                        title: 'Tu imagen se ha subido con exito',
                        imageUrl: e.target.result,
                        imageAlt: 'Tu imagen subida'
                    });
                }
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Parece que algo fue mal durante el proceso o no seleccionaste alguna imagen valida!'
            });
        }
    }

    const handleEliminateImage = async (idObj) => {
        const result = await Swal.fire({
            title: 'Estas seguro de eliminar la imagen?',
            showDenyButton: true,
            confirmButtonText: 'Si',
            denyButtonText: `No`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                return true;
            } else if (result.isDenied) {
                Swal.fire('No se elimino el elemento', '', 'info')
                return false;
            }
        });
        if(result == true){
            const response = await onEliminateImage(idObj);
            console.log(response);
            if(response.hasOwnProperty('error')){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: response.error
                });
            } else {
                Swal.fire(
                    'Excelente!',
                    response.message,
                    'success'
                );
            }
        }   
    }

    return (
        <>
            <h1 className="AlignCenter" > Objeto {id}</h1>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end mb-5">
                <button 
                    className="btn btn-outline-success me-md-2"
                    type="button"
                    onClick={handleAddImage}>
                        Agregar Imagen
                </button>
            </div>
            <div className="row text-center">
                {images.map((obj)=> (
                    <div className="card m-4" key={obj.id} style={{width: "18rem"}}>
                        <img src={BASE_URL + obj.route} className="card-img-top" alt={obj.name}/>
                        <div className="card-body">
                            <p className="card-text">
                                {obj.name}
                            </p>
                        </div>
                        {(edit==true) &&

                            (<div className="card-body">
                                <button
                                    onClick={() => handleEliminateImage(obj.id)}  
                                    className="btn btn-danger m-2">Delete</button>
                                <button
                                    onClick={() => handleEditImage(obj.id, obj.route)} 
                                    className="btn btn-warning m-2">Edit</button>
                            </div>)
                        }
                        
                    </div>
                    
                ))}
                
            </div>
        </>
    )
}