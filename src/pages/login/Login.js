import * as React from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/system";
import Navbar from "../../components/navbar/Navbar";
import "./login.css";
import { Box, TextField } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const initialData = {
  username: "",
  email: "",
  fullname: "",
  password: "",
};

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState(initialData);

  const navigate = useNavigate();

  const signInToggel = () => {
    setIsLogin(!isLogin);
  };

  const { username, fullname, email, password } = formData;

  const submitFormHandler = async () => {
    //console.log(isLogin);

    if (!isLogin) {
      try {
        if (username && email && password && fullname) {
          await axios.post("http://localhost:5000/register", formData);
          navigate("/login");
          console.log(formData);
        } else {
          console.log("Please fill  all required filled!!!!");
        }
      } catch (error) {
        console.log("Username already exist!!", error);
      }
      setFormData(initialData);
    }
    //Login
    else {
      try {
        if (formData.username && formData.password) {
          let user = await axios.post("http://localhost:5000/login", formData);
          console.log(user);
          // setformData(initialData);
          setFormData(initialData);
          localStorage.setItem("user", JSON.stringify(user));
          navigate("/");
        }
      } catch (error) {
        alert("User not found!!");
        setFormData(initialData);
        console.log(error);
      }
    }
  };

  // const loginInputChangeHandler = (e) => {
  //   const name = e.target.name;
  //   const value = e.target.value;

  //   setformData({ ...formData, [name]: value });
  // };

  const inputChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <Navbar />
      <div className="loginPage">
        <Card sx={{ minWidth: 500 }} className="loginItems">
          <CardContent className="loginItems">
            <Typography
              sx={{ fontSize: 34 }}
              color="text.secondary"
              gutterBottom
            >
              {isLogin ? "Login" : "Sign Up"}
            </Typography>

            <Box
              sx={{
                width: 350,
                maxWidth: "100%",
              }}
              className="loginItems"
            >
              {!isLogin ? (
                <>
                  <TextField
                    fullWidth
                    label="Full Name"
                    id="fullWidth"
                    name="fullname"
                    value={formData.fullname}
                    onChange={inputChangeHandler}
                  />
                  <TextField
                    fullWidth
                    label="Email Id"
                    id="emailId"
                    name="email"
                    value={formData.email}
                    onChange={inputChangeHandler}
                  />
                </>
              ) : null}

              <TextField
                required
                fullWidth
                label="Username"
                id="username"
                name="username"
                value={formData.username}
                onChange={inputChangeHandler}
              />
              <TextField
                required
                id="outlined-password-input"
                fullWidth
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={inputChangeHandler}
              />
            </Box>
          </CardContent>
          <CardActions>
            <Button
              size="medium"
              variant="contained"
              color="primary"
              onClick={submitFormHandler}
            >
              {isLogin ? "Login" : "Sign Up"}
            </Button>
          </CardActions>

          {isLogin ? (
            <p>
              Don't have Account?{" "}
              <Link to="/register" onClick={signInToggel}>
                Sign Up
              </Link>
            </p>
          ) : (
            <p>
              Already have Account?{" "}
              <Link to="/login" onClick={signInToggel}>
                Sign in
              </Link>
            </p>
          )}
        </Card>
      </div>
    </>
  );
}
