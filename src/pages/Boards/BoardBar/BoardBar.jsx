/* eslint-disable react/prop-types */
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PublicIcon from "@mui/icons-material/Public";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import BoltIcon from "@mui/icons-material/Bolt";
import FilterListIcon from "@mui/icons-material/FilterList";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { capitalizeFirstLetter } from "~/utils/formatters";
import { useEffect, useState } from "react";
import { Modal, Popover, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Tab from "@mui/material/Tab";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { io } from "socket.io-client";
import { toast } from "react-toastify";
import { fetchCreateInviteApi } from "~/apis";

const MENU_STYLE = {
  color: "white",
  bgcolor: "transparent",
  border: "none",
  paddingX: "5px",
  borderRadius: "4px",
  "& .MuiSvgIcon-root": {
    color: "white",
  },
  "&:hover": {
    bgcolor: "primary.50",
  },
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 550,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 2,
};

const BoardBar = (props) => {
  const { board } = props;
  const [openForm, setOpenForm] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [ inviteEmail, setInviteEmail ] = useState(null)

  const socket = io('http://localhost:8080')

  // Modal
  const handleOpen = () => setOpenForm(true);
  const handleClose = () => setOpenForm(false);

  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Popover
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClosePop = () => {
    setAnchorEl(null);
  };

  // Handle invite email
  const handleChangeValue = (e) => {
    setInviteEmail(e.target.value)
  }

  // const handleShareBoard = async () => {
  //   if (inviteEmail) {
  //     socket.emit('joinRoom', inviteEmail);
  //     socket.emit('inviteUserToBoard', { boardId: `${board?._id}`, email: inviteEmail });
  //   }
  // }

  // const handleAcceptInvitation = (data) => {
  //   // Gửi yêu cầu đến server để chấp nhận lời mời
  //   socket.emit('acceptInvitation', { boardId: data.boardId, email: 'trinhconghuy.2003@gmail.com' });
  // };

  // socket.on('invitationAccepted', (data) => {
  //   console.log(data);
  //   toast.success('Đối phương đã chấp nhận lời mời tham gia board.')
  // });

  // useEffect(() => {
  //   socket.on('invitationReceived', (data) => {
  //     console.log('Bạn đã nhận được lời mời tham gia board:', data);
  //     // console.log('User invitationReceived:', data);
  //     toast.info(`Bạn đã nhận được lời mời tham gia board "${data.boardId}"`, {
  //       onClick: () => {
  //         // Xử lý khi nhấp vào thông báo (chấp nhận lời mời)
  //         handleAcceptInvitation(data);
  //       }
  //     });
  //   });
  // }, [socket])

  const handleShareBoard = async () => {
    try {
      await fetchCreateInviteApi({ 
        boardId: board?._id,
        invitedUserEmail: inviteEmail,
       })

      toast.success('Invite sent successfully!');
      setOpenForm(false)
    } catch (error) {
      toast.error('Failed to send invite. Please try again.');
    }
  }

  useEffect(() => {
    socket.on('invite-received', (invite) => {
      // Hiển thị thông báo cho người dùng về lời mời mới
      toast.success(`Bạn nhận được lời mời vào board ${invite.boardId}`);
    });
  }, [socket])

  return (  
    <>
      <Box
        px={2}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          overflowX: "auto",
          height: (theme) => theme.trello.boardBarHeight,
          bgcolor: (theme) =>
            theme.palette.mode == "dark" ? "#34495e" : "#1976d2",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Chip
            sx={MENU_STYLE}
            icon={<DashboardIcon />}
            label={board?.title}
            clickable
          />
          <Chip
            sx={MENU_STYLE}
            icon={<PublicIcon />}
            label={capitalizeFirstLetter(board?.type)}
            clickable
          />
          <Chip
            sx={MENU_STYLE}
            icon={<AddToDriveIcon />}
            label="Add To Google Drive"
            clickable
          />
          <Chip
            sx={MENU_STYLE}
            icon={<BoltIcon />}
            label="Automation"
            clickable
          />
          <Chip
            sx={MENU_STYLE}
            icon={<FilterListIcon />}
            label="Filters"
            clickable
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button
            variant="outlined"
            sx={{
              color: "white",
              borderColor: "white",
              "&:hover": { borderColor: "white" },
            }}
            startIcon={<PersonAddIcon />}
            onClick={handleOpen}
          >
            Invite
          </Button>

          <Modal
            open={openForm}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalStyle}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Typography
                  id="modal-modal-title"
                  variant="h3"
                  sx={{ fontSize: "1.2rem" }}
                >
                  Share board
                </Typography>
                <CloseIcon onClick={handleClose} sx={{ cursor: "pointer" }} />
              </Box>
              <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                <TextField
                  fullWidth
                  label="Email address"
                  variant="outlined"
                  onChange={(e) => handleChangeValue(e)}
                  InputProps={{
                    sx: {
                      height: "40px",
                      padding: "0 2px",
                      display: "flex",
                      alignItems: "center",
                    },
                  }}
                  InputLabelProps={{
                    sx: {
                      top: "-7px",
                      "&.MuiInputLabel-shrink": {
                        top: "0px",
                      },
                    },
                  }}
                />
                <Button variant="outlined" onClick={handleClick} sx={{ width: '200px'}}>
                  Thành viên
                  <KeyboardArrowDownIcon />
                </Button>
                <Button variant="contained" onClick={handleShareBoard}>Share</Button>
              </Box>
              <Box sx={{ width: "100%", typography: "body1", mt: 2 }}>
                <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList
                      onChange={handleChange}
                      aria-label="lab API tabs example"
                    >
                      <Tab
                        label="Member of the bulletin board"
                        value="1"
                        sx={{
                          p: 1,
                          fontSize: "0.8rem",
                          textTransform: "unset",
                        }}
                      />
                      <Tab
                        label="Requirements to participate"
                        value="2"
                        sx={{
                          p: 1,
                          fontSize: "0.8rem",
                          textTransform: "unset",
                        }}
                      />
                    </TabList>
                  </Box>

                  <TabPanel
                    value="1"
                    sx={{
                      padding: "10px 0px",
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      justifyContent: "space-between",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                      />
                      trinhconghuy.2003@gmail.com
                    </Box>
                    <Button variant="outlined" onClick={handleClick}>
                      Quản trị viên 
                      <KeyboardArrowDownIcon />
                    </Button>
                    <Popover
                      id={id}
                      open={open}
                      anchorEl={anchorEl}
                      onClose={handleClosePop}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                      sx={{ mt: 1 }}
                    >
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
                          <Typography variant="subtitle1">Quản trị viên</Typography>
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
                          <Typography variant="subtitle1">Thành viên</Typography>
                        </Box>
                        <Box>
                          <Typography variant="body2" sx={{ fontSize: 11 }}>
                            Các bảng phải có ít nhất 1 quản trị viên
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
                          <Typography variant="subtitle1">Quan sát viên</Typography>
                        </Box>
                        <Box>
                          <Typography variant="body2" sx={{ fontSize: 11 }}>
                            Thêm những người có quyền hạn chế vào bảng này.
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
                          <Typography variant="subtitle1">Rời khởi bảng</Typography>
                        </Box>
                        <Box>
                          <Typography variant="body2" sx={{ fontSize: 11 }}>
                            Các bảng phải có ít nhất 1 quản trị viên.
                          </Typography>
                        </Box>
                      </Box>
                    </Popover>
                  </TabPanel>
                  <TabPanel
                    value="2"
                    sx={{ padding: "10px 0px", textAlign: "center" }}
                  >
                    <Box
                      sx={{
                        width: 45,
                        height: 45,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "50%",
                        background: "#f1f2f4",
                        margin: "0 auto",
                        mb: 1,
                      }}
                    >
                      <PersonOutlineIcon />
                    </Box>
                    There are no requirements to join this bulletin board.
                  </TabPanel>
                </TabContext>
              </Box>
            </Box>
          </Modal>

          <AvatarGroup
            max={4}
            sx={{
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                borderColor: "transparent",
              },
            }}
          >
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
            <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
            <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
          </AvatarGroup>
        </Box>
      </Box>
    </>
  );
};

export default BoardBar;
