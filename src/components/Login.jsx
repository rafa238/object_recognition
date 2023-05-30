import useLoggin from "../hooks/useLogin";
import { useForm } from "../hooks/useForm";

const initialState = { username: "", password: "" };
const Login = ({setUser, saveUser}) => {

  const {reset, handleInputChanges, formState}  = useForm(initialState);
  const {password, username} = formState;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationStatus = await useLoggin(username, password);
    if(validationStatus.hasOwnProperty('error')){
      alert(validationStatus.error);
      reset();
    } else {
      alert("Se ha logueado con exito");
      saveUser({...validationStatus});
      setUser({...validationStatus});
    }
  }

  return (
    <div style={{
      backgroundImage: `url("./fondo2.jpg")`,
      width: "100vh",
      color: "white"
    }} >
      <h1 className="AlignCenter"> Visual Mind - LOGIN </h1>
      <form onSubmit={handleSubmit}>
          <label className="form-label" htmlFor="User">Usuario</label>
          <input 
            onChange={ handleInputChanges } 
            value={ username} 
            name="username" 
            placeholder="Ingrese el usuario" 
            type="text" 
            className="form-control" />
          <label 
            className="form-label" 
            htmlFor="password">Password</label>
          <input 
            value={ password }
            onChange={ handleInputChanges } 
            name="password" 
            placeholder="Ingrese su contraseña"
            type="password" 
            className="form-control" />
          <button className="btn btn-primary" type="submit" >
            Enviar
          </button>
      </form>

      <ul>
        <li>Juarez Laureano Rafael</li>
        <li>Romero De la Cruz Fernando</li>
        <li>Lopez Zamora Uriel</li>
      </ul>
    </div>
  )
}

export default Login; 