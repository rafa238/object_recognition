import useLoggin from "../hooks/useLogin";
import { useForm } from "../hooks/useForm";
import Swal from 'sweetalert2';
import '../login.css';
const initialState = { username: "", password: "" };
const Login = ({ setUser, saveUser }) => {

  const { reset, handleInputChanges, formState } = useForm(initialState);
  const { password, username } = formState;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationStatus = await useLoggin(username, password);
    if (validationStatus.hasOwnProperty('error')) {
      //alert(validationStatus.error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: validationStatus.error
      })
      reset();
    } else {
      //alert("Se ha logueado con exito");
      Swal.fire(
        'Felicidades!',
        'Se ha logueado con exito!',
        'success'
      )
      saveUser({ ...validationStatus });
      setUser({ ...validationStatus });
    }
  }

  return (
    <section>
      <div className="formbox">
        <div className="form-value">
          <div action="">
            <h2>Bienvenido</h2>
            <form onSubmit={handleSubmit}>
              <div className="inputbox">
                <ion-icon name="person-circle-outline"></ion-icon>
                <input
                  onChange={handleInputChanges}
                  value={username}
                  name="username"
                  placeholder="Ingrese el usuario"
                  type="text"
                  className="form-control" />
                <label htmlFor="">Usuario</label>
              </div>
              <div className="inputbox">
                <ion-icon name="lock-closed-outline"></ion-icon>
                <input
                  value={password}
                  onChange={handleInputChanges}
                  name="password"
                  placeholder="Ingrese su contraseña"
                  type="password"
                  className="form-control" />
                <label htmlFor="">Contraseña</label>
              </div>
              <button type="submit" >
                Enviar
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>

  )
}

export default Login; 