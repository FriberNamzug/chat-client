import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { loginService } from "../services/auth";
import { toast } from "react-toastify";
import {
  LinearProgress,
  TextField,
  Button,
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput,
  IconButton,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import PasswordIcon from "@mui/icons-material/Password";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import Socket from '../components/Socket'


export default function LoginPage() {

  const navigate = useNavigate();
  const KEY_CAPTCHA = import.meta.env.VITE_HCAPTCHA_KEY;
  const [usuario, setUsuario] = useState({
    email: "",
    password: "",
    showPassword: false,
  });
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");


  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //if (!token) return toast.error("Por favor verifica el captcha");
    setLoading(true);
    try {
      const info = {
        email: usuario.email,
        password: usuario.password,
        token: token,
      };
      const response = await loginService(info);
      if (response.status === 200) {
        toast.success(response.data.message);
        localStorage.setItem(
          "token",
          JSON.stringify(response.data.data.token)
        );
        Socket.emit('conectado', {token:response.data.data.token})
        console.log(response.data.data)

        navigate("/dashboard");
        setLoading(false);
      }
    } catch (error) {
      setToken("");
      setLoading(false);
      console.log(error);
    }
  };

  const handleClickShowPassword = () => {
    setUsuario({
      ...usuario,
      showPassword: !usuario.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      {loading && <LinearProgress />}
      <div className="flex justify-center items-center h-screen">
        <div className="w-96 p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-2xl duration-500  sm:p-6 lg:p-8 ">
          <form
            className="space-y-6 flex flex-col items-center"
            onSubmit={handleSubmit}
          >

            <div className="w-full">
              <TextField
                label="Usuario"
                type="email"
                name="email"
                onChange={handleChange}
                size="medium"
                variant="outlined"
                margin="normal"
                fullWidth
                autoComplete="usuario"
                autoFocus
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            <div className="w-full">
              <FormControl variant="outlined" className="w-full">
                <InputLabel htmlFor="outlined-adornment-password">
                  Contraseña
                </InputLabel>
                <OutlinedInput
                  label="Contraseña"
                  type={usuario.showPassword ? "text" : "password"}
                  name="password"
                  size="medium"
                  onChange={handleChange}
                  fullWidth
                  required
                  startAdornment={
                    <InputAdornment position="start">
                      <PasswordIcon />
                    </InputAdornment>
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {usuario.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              fullWidth>
              Ingresar al sistema
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}