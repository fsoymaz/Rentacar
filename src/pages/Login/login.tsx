import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import authService from "../../service/authService/AuthService";
import "../Login/styles.css";

import { useNavigate } from "react-router-dom";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { loginSuccess } from "../../store/user/userSlice";
import { setToken } from "../../utils/Interceptors";
import { addLogin } from "../../models/auth/addLogin";
import SignedIn from "../../components/Navbar/SignedIn";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authState = useSelector((store: any) => store.auth);

  const [credentials, setCredentials] = useState<addLogin>({
    email: "",
    password: "",
  });

  useEffect(() => {
    console.log("authState", authState);
  }, [authState]);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await authService.login(credentials);
      if (response.status === 200) {
        const accessToken = response.data.access_token;
        const decodedToken: JwtPayload = jwtDecode(accessToken);
        dispatch(loginSuccess(decodedToken));
        setToken(accessToken);

        const naviToken = localStorage.getItem("navi");
        if (naviToken) {
          navigate(naviToken);
        } else {
          navigate("/");
        }
      } else {
        toast.error("Kullanıcı adı veya şifre yanlış");
      }
    } catch (error) {
      console.error("Login işlemi başarısız:", error);
      toast.error("Giriş yapılırken bir hata oluştu.");
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  return (
    <div className="wrapper fadeInDown">
      <div id="formContent">
        <div className="fadeIn first">
          <img
            src="https://medyaweb.net/wp-content/uploads/2019/01/hazir-rent-a-car-768x288.png.webp"
            id="icon"
            alt="User Icon"
          />
        </div>
        {/* <SignedIn /> */}
        <form  onSubmit={handleSubmit}>
          <input
            type="text"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            className="fadeIn second"
            placeholder="Email"
          />
          <br />
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            className="fadeIn third"
            placeholder="Password"
          />
          <br />
          <input type="submit" className="fadeIn fourth" value="Log In" />
        </form>

        <div id="formFooter">
          <a className="underlineHover" href="#">
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
