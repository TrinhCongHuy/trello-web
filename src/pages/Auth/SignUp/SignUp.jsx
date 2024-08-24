import "./SignUp.scss";
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
import { useForm } from 'react-hook-form'
import { fetchSignUpApi } from "~/apis";
import { toast } from "react-toastify";


const SignUp = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate()

  const submitSignUp = async (data) => {
    try {
      await fetchSignUpApi(data)
      toast.success("Sign up successful!");
      navigate('/sign-in')
    } catch (error) {
      toast.error(error.response.data.message); 
    }
  }

  return (
    <Box className="page__sign-up">
      <Box className="container-xl">
        <Grid container>
          <Grid item xs={6} md={6}>
            <img 
              src="https://img.helpnetsecurity.com/wp-content/uploads/2024/01/23111837/trello-1400.jpg" 
              alt="logout"  
            />
          </Grid>
          <Grid item xs={6} md={6}>
            <Box className="form-container">
              <Typography variant="h2">Sign up</Typography>
              <form onSubmit={handleSubmit(submitSignUp)}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <TextField
                        label="First Name"
                        type="text"
                        variant="outlined"
                        placeholder="First Name"
                        error={!!errors.firstName}
                        {...register('firstName', {
                          required: 'This field is required.'
                        })}
                      />
                      {errors.firstName &&
                        <Alert severity="error" sx={{ mt: '0.7em', '.MuiAlert-message': { overflow: 'hidden' } }}>
                          {errors.firstName.message}
                        </Alert>
                      }
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <TextField
                        label="Last Name"
                        type="text"
                        variant="outlined"
                        placeholder="Last Name"
                        error={!!errors.lastName}
                        {...register('lastName', {
                          required: 'This field is required.'
                        })}
                      />
                      {errors.lastName &&
                        <Alert severity="error" sx={{ mt: '0.7em', '.MuiAlert-message': { overflow: 'hidden' } }}>
                          {errors.lastName.message}
                        </Alert>
                      }
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <TextField
                        label="Email address"
                        type="email"
                        variant="outlined"
                        placeholder="Email address"
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
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <TextField
                        label="Phone Number"
                        type="text"
                        variant="outlined"
                        placeholder="Phone Number"
                        error={!!errors.phone}
                        {...register('phone', {
                          required: 'This field is required.'
                        })}
                      />
                      {errors.phone &&
                        <Alert severity="error" sx={{ mt: '0.7em', '.MuiAlert-message': { overflow: 'hidden' } }}>
                          {errors.phone.message}
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
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={<Checkbox />}
                      label="I agree to all the Terms and Privacy Policies"
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ textAlign: 'center'}}>
                    <Button variant="contained" color="primary" type="submit">
                      Sign Up
                    </Button>
                  </Grid>
                </Grid>
              </form>
              <Box textAlign="center" mt={3}>
                <Typography variant="body2">Or Sign up with</Typography>
              </Box>
              <Box display="flex" justifyContent="center" mt={2}>
                <Box className="social-button" m={1}>
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                    alt="Facebook"
                  />
                </Box>
                <Box className="social-button" m={1}>
                  <img
                    src="https://i.pinimg.com/originals/74/65/f3/7465f30319191e2729668875e7a557f2.png"
                    alt="Google"
                  />
                </Box>
              </Box>
              <Box textAlign="center" mt={3}>
                <Typography variant="body2">
                  Do not have an account? <Link to="/sign-in">Login</Link>
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SignUp;
