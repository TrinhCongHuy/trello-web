import "./Auth.scss";
import {
  Alert,
  Box,
  Button,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchNewOtpApi } from "~/apis";

const EmailInput = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitEmail = async (data) => {
    try {
      const result = await fetchNewOtpApi(data)
      const { email } = result
      
      navigate(`/forgot-password/verify-otp/${email}`)
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <Box className="page__auth">
      <Box className="container-xl">
        <Grid container>
          <Grid item xs={12} md={6}>
            <Box sx={{ width: "100%", height: "100%" }}>
              <img
                src="https://img.helpnetsecurity.com/wp-content/uploads/2024/01/23111837/trello-1400.jpg"
                alt="Email Input"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  borderTopRightRadius: '100px'
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6} >
            <Box className="form-container">
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  color: '#576777'
                }}
              >
                Enter Your Email
              </Typography>
              <form onSubmit={handleSubmit(submitEmail)}>
                <Grid container spacing={2} sx={{ mt: 2 }}>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <TextField
                        label="Email Address"
                        type="email"
                        variant="outlined"
                        placeholder="Enter your email"
                        error={!!errors.email}
                        {...register("email", {
                          required: "Email is required.",
                          pattern: {
                            value:
                              /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                            message: "Invalid email format.",
                          },
                        })}
                      />
                      {errors.email && (
                        <Alert
                          severity="error"
                          sx={{
                            mt: "0.7em",
                            ".MuiAlert-message": { overflow: "hidden" },
                          }}
                        >
                          {errors.email.message}
                        </Alert>
                      )}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      fullWidth
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default EmailInput;
