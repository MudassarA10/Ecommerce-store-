import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CircularProgress from "@mui/material/CircularProgress";
import { toast, Toaster } from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";
import { authService } from "../../services/api";
import { Link } from "react-router-dom";

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin");
    }
  }, [isAuthenticated, navigate]);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const data = await authService.login({ email, password });
      login(data.token);
      toast.success("Login successful!", { position: "top-center" });

      setTimeout(() => {
        navigate("/admin");
      }, 2000);
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <Toaster />
      <div className="w-[350px] h-auto bg-white rounded-lg shadow-lg pb-10 pt-5 px-6">
        <form onSubmit={handleSubmit}>
          <h1 className="text-2xl font-serif mb-5 text-center">Admin Login</h1>
          {error && <p className="text-red-600 text-center mb-3">{error}</p>}

          {/* Email Input */}
          <div className="mb-4">
            <Box sx={{ "& > :not(style)": { width: "100%", borderRadius: "0.5rem" } }}>
              <TextField
                id="email"
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                 autoComplete="email"
                required
              />
            </Box>
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <FormControl variant="outlined" fullWidth required sx={{ width: "100%" }}>
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password" 
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-3 mt-2 bg-red-600 text-white rounded-md hover:bg-red-500 flex justify-center items-center"
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </button>

          {/* Forgot Password */}
          <p className="text-center mt-4">
            <Link to="/forgot-password" className="text-blue-500 hover:underline">
              Forgot Password?
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
