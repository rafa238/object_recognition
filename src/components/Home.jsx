import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Home = ({username}) => {
  const [objects, setObjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/deteObjetos/Objects")
    .then(response => response.json())
    .then(response => {
      setObjects(response);
    });
  }, []);
  
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

  return (
    <>
        <h1 className="AlignCenter" > Bienvenido {username}</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th className="table-primary">#</th>
              <th className="table-primary">Objeto</th>
              <th className="table-primary" colSpan={3} >Acciones</th>
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
                </tr>
              ))
            }
          </tbody>
        </table>
    </>
  )
}

export default Home;