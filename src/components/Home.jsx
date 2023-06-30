import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

export const Home = ({ username }) => {
  const [objects, setObjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/deteObjetos/Objects")
      .then(response => response.json())
      .then(response => {
        setObjects(response);
      });
  }, [objects]);

  const onWatch = (object) => {
    console.log(object);
    navigate({
      pathname: `watch/${object.id}/0`,
    });
  }

  const onEdit = (object) => {
    console.log(object);
    navigate({
      pathname: `watch/${object.id}/1`,
    });
  }

  const onEliminate = (object) => {
    console.log(object);
    navigate({
      pathname: `watch/${object.id}/1`,
    });
  }

  const onAddType = () => {
    Swal.fire({
      title: 'Ingresa el nombre del tipo a agregar',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Registrar',
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        return fetch(`http://localhost:8080/deteObjetos/AddTypeObject?typeName=${login}`)
          .then(response => {
            if (!response.ok) {
              throw new Error(response.statusText)
            }
            return response.json()
          })
          .catch(error => {
            Swal.showValidationMessage(
              `Error: ${error}`
            )
          })
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: `Se ha registrado con exito`
        })
      }
    })
  }

  const onTest = (object) => {
    Swal.fire({
      title: `Es esto un ${object.name}`,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'SI',
      denyButtonText: `NO`,
      cancelButtonText: "Cancelar"
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Se ha probado con exito este objeto!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Se probo este objeto con No', '', 'info')
      }
    })
  }

  return (
    <>
      <h1 className="AlignCenter" > Bienvenido {username}</h1>
      <button
        className="btn btn-primary"
        onClick={onAddType}> Agregar tipo de objeto</button>
      <table className="table table-striped mt-4">
        <thead>
          <tr>
            <th className="table-primary">#</th>
            <th className="table-primary">Objeto</th>
            <th className="table-primary" colSpan={4} >Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            objects.map((object1) => (
              <tr key={object1.id}>
                <td>{object1.id}</td>
                <td>{object1.name}</td>
                <td>
                  <button
                    onClick={() => onWatch(object1)}
                    className="btn btn-success">Ver</button>
                </td>
                <td>
                  <button
                    onClick={() => onEdit(object1)}
                    className="btn btn-warning">Editar</button>
                </td>
                <td>
                  <button
                    onClick={() => onEliminate(object1)}
                    className="btn btn-danger">
                    Eliminar
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => onTest(object1)}
                    className="btn btn-info">
                    Probar
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </>
  )
}

export default Home;