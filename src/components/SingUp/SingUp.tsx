import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../store/store";
import { register, resetRegisterState } from "../../store/Users/RegisterUser";
import { IUser } from "../../types/Types";

const SingUp: FC = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>("");
  const [organization, setOrganization] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const { error, status } = useSelector((state: RootState) => state.Register);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.log("The passwords do not match ");
      navigate("/");
    }

    if (status === "idle" && userName && password && organization) {
      const NewUser: IUser = {
        name: userName,
        password: password,
        organization: organization,
        area: location,
      };
      dispatch(register(NewUser));
      setLocation("");
      setOrganization("");
    }
  };

  useEffect(() => {
    if (status == "rejected" || error) {
      navigate("/");
    } else if (status == "fulfilled") {
      dispatch(resetRegisterState());
      navigate("/");
    }
  }, [status]);

  const handelLocation = () => {
    if (organization == "IDF") {
      return (
        <select
          name="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value="North">North</option>
          <option value="South">South</option>
          <option value="Center">Center</option>
          <option value="West Bank">West Bank</option>
        </select>
      );
    }
  };

  return (
    <div className="login-container">
      <h2>SingUp</h2>
      {error && <h3 className="error-message">{error}</h3>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="User Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <select
          name="organization"
          value={organization}
          onChange={(e) => setOrganization(e.target.value)}
        >
          <option value="IDF">IDF</option>
          <option value="Hezbollah">Hezbollah</option>
          <option value="Hamas">Hamas</option>
          <option value="IRGC">IRGC</option>
          <option value="Houthis">Houthis</option>
        </select>
        {handelLocation()}
        <button type="submit">Sign up</button>
      </form>
      <button className="signup-button">
        <Link to="/">Page Login</Link>
      </button>
    </div>
  );
};

export default SingUp;
