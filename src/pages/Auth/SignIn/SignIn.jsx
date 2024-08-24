import "./SignIn.scss";
import { Link, useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { fetchSignInApi } from "~/apis";
import { useForm } from 'react-hook-form'
import { toast } from "react-toastify";


const SignInPage = () => {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm()

  const submitSignIn = async (data) => {    
    try {
      const res = await fetchSignInApi(data);

      const userInfo = {
        id: res._id,
        email: res.email
      }

      localStorage.setItem('userInfo', JSON.stringify(userInfo))

      navigate('/boards')
    } catch (error) {
      toast.error(error.response.data.message); 
    }

  }

  const handleLoginGG = () => {
    window.open('http://localhost:8080/v1/auth/google', '_self')
  }

  return (
    <Box className="page__sign-in">
      <Box className="container-xl">
        <Grid container>
          <Grid item xs={6} md={6}>
            <Box sx={{width: '100%', height: '100%'}}>
              <img
                src="https://img.helpnetsecurity.com/wp-content/uploads/2024/01/23111837/trello-1400.jpg"
                alt="logout"
                style={{ width: "100%", height: "100%", objectFit: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
              />
            </Box>
          </Grid>
          <Grid item xs={6} md={6}>
            <Box className="form-container">
              <Typography variant="h2">Sign in</Typography>
              <form onSubmit={handleSubmit(submitSignIn)}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <TextField
                        label="Email address"
                        type="email"
                        variant="outlined"
                        placeholder="Enter Email"
                        error={!!errors.email}
                        {...register('email', {
                          required: 'This field is required.'
                        })}
                      />
                      {errors.email &&
                        <Alert severity="error" sx={{ mt: '0.7em', '.MuiAlert-message': { overflow: 'hidden' } }}>
                          {errors.email.message}
                        </Alert>
                      }
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        placeholder="Enter password"
                        error={!!errors.password}
                        {...register('password', {
                          required: 'This field is required.'
                        })}
                      />
                      {errors.password &&
                        <Alert severity="error" sx={{ mt: '0.7em', '.MuiAlert-message': { overflow: 'hidden' } }}>
                          {errors.password.message}
                        </Alert>
                      }
                    </FormControl>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    container
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Keep me signed in"
                    />
                    <Link to="/forgot-password/email" className="form-text">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      fullWidth
                    >
                      Continue with email
                    </Button>
                  </Grid>
                </Grid>
              </form>
              <Box textAlign="center" mt={3}>
                <Typography variant="body2">
                  Do not have an account? <Link to="/sign-up">Register</Link>
                </Typography>
              </Box>
              <Box textAlign="center" mt={2}>
                <Typography variant="body2">Or</Typography>
              </Box>
              <Box display="flex" justifyContent="center" mt={2}>
                <Box className="social-button" m={1} onClick={handleLoginGG}>
                  <img
                    src="https://i.pinimg.com/originals/74/65/f3/7465f30319191e2729668875e7a557f2.png"
                    alt="Google"
                  />
                </Box>
                <Box className="social-button" m={1}>
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                    alt="Facebook"
                  />
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SignInPage;
