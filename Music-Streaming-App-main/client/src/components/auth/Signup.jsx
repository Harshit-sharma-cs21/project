import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../../img/logo.png";
import { signupUser } from "../../store/thunks/user";
import Button from "../UI/Button";
import Input from "../UI/Input";
import "./Auth.scss";
import isValidEmail from "./isValidEmail";

const Signup = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const handleSignup = (e) => {
    e.preventDefault();

    if (password !== passwordConfirm)
      return toast.warn("Passwords do not match");
    else if (!isValidEmail(email)) {
      return toast.warn("Email is not valid");
    }

    dispatch(signupUser({ name, email, password, passwordConfirm }));
  };

  return (
    <>
      {!user.auth ? (
        <div className="auth">
          <form className="auth__form" onSubmit={handleSignup}>
            <img className="auth__form-logo" src={logo} alt="Spotify logo"/>
            <Link to="/login" className="auth__form-link">
              Log In here
            </Link>
            <Input
              name="name"
              placeholder="Name"
              required={true}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              type={email}
              name="email"
              placeholder="Email"
              required={true}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              required={true}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              type="password"
              name="passwordConfirm"
              placeholder="Password Confirm"
              required={true}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
            <Button type="submit">
              {user.loading ? "Go to LogIn" : "Sign Up"}
            </Button>
          </form>

          
        </div>
      ) : (
        <Navigate to={"/"}/>
      )}
    </>
  );
};

export default Signup;
