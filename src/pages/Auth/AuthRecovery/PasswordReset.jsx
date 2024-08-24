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
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchResetPasswordApi } from "~/apis";

const PasswordReset = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { email } = useParams()

  const onSubmit = async (data) => {
    try {
      data.email = email
      await fetchResetPasswordApi(data)
      toast.success("Password updated successfully!");
      navigate('/sign-in')
    } catch (error) {
      toast.error("Failed to reset password. Please try again.");
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
                alt="Reset password visual"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box className="form-container">
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  color: "#576777",
                }}
              >
                Reset Password
              </Typography>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <TextField
                        label="New Password"
                        type="password"
                        variant="outlined"
                        placeholder="Enter new password"
                        error={!!errors.newPassword}
                        {...register("newPassword", {
                          required: "Please enter your new password.",
                        })}
                      />
                      {errors.newPassword && (
                        <Alert
                          severity="error"
                          sx={{
                            mt: "0.7em",
                            ".MuiAlert-message": { overflow: "hidden" },
                          }}
                        >
                          {errors.newPassword.message}
                        </Alert>
                      )}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <TextField
                        label="Confirm New Password"
                        type="password"
                        variant="outlined"
                        placeholder="Confirm new password"
                        error={!!errors.confirmPassword}
                        {...register("confirmPassword", {
                          required: "Please confirm your confirm password.",
                          validate: (value) =>
                            value ===
                              document.querySelector(
                                'input[name="newPassword"]'
                              ).value || "Passwords do not match.",
                        })}
                      />
                      {errors.confirmPassword && (
                        <Alert
                          severity="error"
                          sx={{
                            mt: "0.7em",
                            ".MuiAlert-message": { overflow: "hidden" },
                          }}
                        >
                          {errors.confirmPassword.message}
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
                      Reset Password
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

export default PasswordReset;
