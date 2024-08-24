import Box from "@mui/material/Box";
import { ReactComponent as TrelloLogo } from "~/assets/trello.svg";
import SvgIcon from "@mui/material/SvgIcon";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import Popover from "@mui/material/Popover";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import { Alert, FormControl } from "@mui/material";
import { fetchCreateBoardApi } from "~/apis";
import { toast } from "react-toastify";
// import AcUnitIcon from '@mui/icons-material/AcUnit'

const CreateTemplate = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setShowForm(false);
  };

  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  const handleShow = () => {
    setAnchorEl(null);
    setShowForm(!showForm);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const submitCreateTable = async (data) => {
    try {
      await fetchCreateBoardApi(data)
      toast.success("Board created successfully!");
    } catch (error) {
      toast.error(error.response.data.message); 
    }
    reset();
    handleClose();
  };

  return (
    <Box>
      <Button
        sx={{
          color: "white",
          border: "none",
          "&:hover": { border: "none" },
        }}
        variant="outlined"
        startIcon={<LibraryAddIcon />}
        aria-describedby={id}
        onClick={handleClick}
      >
        Create
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box sx={{ py: 1, maxWidth: 300 }}>
          {!showForm ? (
            <>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  px: 2,
                  py: 1,
                  "&:hover": { bgcolor: "rgba(239, 238, 238, 0.5)" },
                  cursor: "pointer",
                }}
                onClick={handleShowForm}
              >
                <Box sx={{ display: "flex" }}>
                  <SvgIcon
                    component={TrelloLogo}
                    inheritViewBox
                    aria-label="Trello Logo"
                    fontSize="small"
                    sx={{ mr: 1 }}
                  />
                  <Typography variant="subtitle1">Create Table</Typography>
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ fontSize: 11 }}>
                    A board is made up of cards arranged in a list. Use boards
                    to manage projects, track information, or organize anything.
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  px: 2,
                  py: 1,
                  "&:hover": { bgcolor: "rgba(239, 238, 238, 0.5)" },
                  cursor: "pointer",
                }}
              >
                <Box sx={{ display: "flex" }}>
                  <SvgIcon
                    component={TrelloLogo}
                    inheritViewBox
                    aria-label="Trello Logo"
                    fontSize="small"
                    sx={{ mr: 1 }}
                  />
                  <Typography variant="subtitle1">
                    Start with the template
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ fontSize: 11 }}>
                    Get started faster with table templates.
                  </Typography>
                </Box>
              </Box>
            </>
          ) : (
            <Box sx={{ px: 2, py: 1, width: "300px" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                <IconButton onClick={handleShowForm} aria-label="back">
                  <ArrowBackIcon sx={{ fontSize: "1.1rem" }} />
                </IconButton>
                <Typography
                  variant="h6"
                  sx={{ flexGrow: 1, textAlign: "center" }}
                >
                  Create table
                </Typography>
                <IconButton onClick={handleShow} aria-label="close">
                  <CloseIcon sx={{ fontSize: "1.1rem" }} />
                </IconButton>
              </Box>
              <Typography variant="subtitle1" gutterBottom sx={{ mt: 1 }}>
                Background
              </Typography>
              <form onSubmit={handleSubmit(submitCreateTable)}>
                <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                  <Box sx={{ width: 40, height: 40, bgcolor: "#5ba4cf" }}></Box>
                  <Box sx={{ width: 40, height: 40, bgcolor: "#d4a5c1" }}></Box>
                  <Box sx={{ width: 40, height: 40, bgcolor: "#92b3c4" }}></Box>
                </Box>
                {/* <Typography variant="subtitle1" gutterBottom sx={{ mt: 1 }}>
                Table Title <AcUnitIcon sx={{ color: "#ea3f3f", fontSize: '0.5rem', mb: 'inherit'}}/>
              </Typography> */}
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <TextField
                    label="Table Title *"
                    variant="outlined"
                    error={!!errors.title}
                    {...register("title", {
                      required: "This field is required.",
                    })}
                    fullWidth
                  />
                  {errors.title && (
                    <Alert
                      severity="error"
                      sx={{
                        mt: "0.7em",
                        ".MuiAlert-message": { overflow: "hidden" },
                      }}
                    >
                      {errors.title.message}
                    </Alert>
                  )}
                </FormControl>

                <FormControl fullWidth sx={{ mt: 2 }}>
                  <TextField
                    label="Table Description *"
                    variant="outlined"
                    error={!!errors.description}
                    {...register("description", {
                      required: "This field is required.",
                    })}
                    fullWidth
                  />
                  {errors.description && (
                    <Alert
                      severity="error"
                      sx={{
                        mt: "0.7em",
                        ".MuiAlert-message": { overflow: "hidden" },
                      }}
                    >
                      {errors.description.message}
                    </Alert>
                  )}
                </FormControl>

                <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                  Visibility
                </Typography>
                <RadioGroup
                  aria-labelledby="visibility-group"
                  name="type"
                  defaultValue="private"
                  {...register("type")}
                >
                  <FormControlLabel
                    value="private"
                    control={<Radio />}
                    label="Private"
                  />
                  <FormControlLabel
                    value="public"
                    control={<Radio />}
                    label="Public"
                  />
                </RadioGroup>
                <Button
                  variant="contained"
                  sx={{ mt: 2 }}
                  fullWidth
                  type="submit"
                >
                  Create
                </Button>
              </form>
            </Box>
          )}
        </Box>
      </Popover>
    </Box>
  );
};

export default CreateTemplate;
