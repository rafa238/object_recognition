import React, { useEffect, useState } from "react";

export const Home = ({id, username}) => {
  const [objects, setObjects] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/deteObjetos/Objects")
    .then(response => response.json())
    .then(response => {
      setObjects(response);
    });
  }, []);
  
  
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
                  <td><button className="btn btn-success">Ver</button></td>
                  <td><button className="btn btn-warning">Modificar</button></td>
                  <td><button className="btn btn-danger">Eliminar</button></td>
                </tr>
              ))
            }
            
          </tbody>
        </table>
    </>
  )
}

export default Home;