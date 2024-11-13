import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../store/store";
import { login } from "../../store/Users/LoginUser";
import { IUser } from "../../types/Types";
import './Login.css';


const Login: FC = () => {
    
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();

  const { error, status, User } = useSelector((state: RootState) => state.Login);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (status === "idle" && userName && password) {
        const userLogin:IUser ={
            name: userName,
            password:password
        }
        if(userLogin) {
          dispatch(login(userLogin))
        }
      }
  };

  useEffect(() => {
    if (status === "rejected" || error) {
      navigate("/"); 
    } else if (status === "fulfilled") {
      const token = localStorage.getItem("token");
      if (token) {
        User?.area ? navigate("/defend"): navigate("/attack") ;
      } else {
        console.log("No token found");
        navigate("/"); 
      }
    }
  }, [status, error]);


  return (
    <div className="login-container">
            <h2>Login</h2>
            {error && <h3 className="error-message">{error}</h3>}
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="User Name" value={userName} onChange={(e) => setUserName(e.target.value)} required/>
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                <button type="submit">Login</button>
            </form>
            <button className="signup-button">
                <Link to="/SingUp">Page SingUp</Link>
            </button>
        </div>
  );
};

export default Login;