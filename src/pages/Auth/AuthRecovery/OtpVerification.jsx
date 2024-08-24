import "./Auth.scss";
import { Box, Grid, Typography, Button } from "@mui/material";
import OtpInput from "react-otp-input";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchOtpApi } from "~/apis";

const OtpVerification = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate()
  const { email } = useParams()

  const handleVerify = async () => {
    try {
      const objectOtp = {
        email, otp
      }
      await fetchOtpApi(objectOtp)
      
      navigate(`/forgot-password/reset-password/${email}`)
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
                alt="Otp verification visual"
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
                  color: '#576777'
                }}
              >
                Verify OTP
              </Typography>
              <Typography variant="body1" gutterBottom>
                Enter the OTP sent to your email to verify your account.
              </Typography>
              <Box display="flex" justifyContent="center" mt={4} mb={3}>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  renderSeparator={<span>-</span>}
                  renderInput={(props) => <input {...props} />}
                  inputStyle={{
                    width: "3rem",
                    height: "3rem",
                    margin: "0 0.5rem",
                    fontSize: "1.5rem",
                    borderRadius: "8px",
                    border: "1px solid #ced4da",
                    backgroundColor: "#f7f7f7",
                    color: "#333",
                    textAlign: "center",
                  }}
                  focusStyle={{
                    border: "2px solid #3f51b5",
                    outline: "none",
                  }}
                />
              </Box>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleVerify}
              >
                Verify OTP
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default OtpVerification;
