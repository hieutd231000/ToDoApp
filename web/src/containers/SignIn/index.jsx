import React, { useState } from "react";
import { SignInStyle } from "./index.style";
import LogInLayout from "../layouts/LogInLayout";
import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import EmailIcon from "@mui/icons-material/Email";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import Loading from "../../components/Loading";
import SuccessNotification from "../../components/SuccessNotification";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [emailErrorText, setEmailErrorText] = useState("");

  const [passError, setPassError] = useState(false);
  const [passErrorText, setPassErrorText] = useState("");

  const [loginFail, setLoginFail] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const navigate = useNavigate();

  const handleEmail = e => {
    if (!e.target.value) {
      setEmailError(true);
      setEmailErrorText("Yêu cầu nhập email!");
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.target.value)
    ) {
      setEmailError(true);
      setEmailErrorText("Địa chỉ email không hợp lệ!");
    } else {
      setEmailError(false);
      setEmailErrorText("");
      setEmail(e.target.value);
    }
  };

  const handlePassword = e => {
    setLoginFail(false);
    if (!e.target.value) {
      setPassError(true);
      setPassErrorText("Yêu cầu nhập mật khẩu!");
    } else if (e.target.value !== "" && e.target.value.length < 6) {
      setPassError(true);
      setPassErrorText("Mật khẩu tối thiểu cần 6 ký tự!");
    } else {
      setPassError(false);
      setPassErrorText("");
      setPassword(e.target.value);
    }
  };

  let data = { email, password };

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    if (emailError || passError) return false;
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/login`, data)
      .then(res => {
        localStorage.setItem(
          "todoapp_token",
          JSON.stringify(res.data.data.token),
        );
        setLoginSuccess(true);
        setTimeout(() => {
          navigate("/home");
        }, 1500);
      })
      .catch(err => {
        setLoginFail(true);
        setLoading(false);
      });
  };

  return (
    <LogInLayout>
      <SignInStyle onSubmit={e => handleSubmit(e)}>
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <EmailIcon
            sx={{ fontSize: 32, color: "action.active", mr: 1, my: 0.5 }}
          />
          <TextField
            error={emailError}
            id='email'
            label='Email'
            variant='standard'
            helperText={emailErrorText}
            onChange={e => handleEmail(e)}
            required
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <LockPersonIcon
            sx={{ fontSize: 32, color: "action.active", mr: 1, my: 0.5 }}
          />
          <TextField
            id='password'
            label='Mật khẩu'
            type='password'
            variant='standard'
            error={passError}
            helperText={passErrorText}
            onChange={e => handlePassword(e)}
            required
          />
        </Box>

        {loginFail ? (
          <span className='LogInFail'>
            Tài khoản hoặc mật khẩu không chính xác!
          </span>
        ) : (
          ""
        )}
        <div className='Bottom'>
          <button type='submit' disabled={emailError || passError}>
            Đăng nhập
          </button>
          <p onClick={() => navigate("/sign-up")}>Đăng ký</p>
        </div>
        {loading ? <Loading /> : ""}
        {loginSuccess ? (
          <SuccessNotification
            isOpen={loginSuccess}
            textSuccess='Đăng nhập thành công!'
          />
        ) : (
          ""
        )}
      </SignInStyle>
    </LogInLayout>
  );
};

export default SignIn;
