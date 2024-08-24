import Box from "@mui/material/Box";
import ModeSelect from "~/components/ModeSelect/ModeSelect";
import AppsIcon from "@mui/icons-material/Apps";
import { ReactComponent as TrelloLogo } from "~/assets/trello.svg";
import SvgIcon from "@mui/material/SvgIcon";
import Typography from "@mui/material/Typography";
import Workspaces from "./Menus/Workspaces";
import Recent from "./Menus/Recent";
import Starred from "./Menus/Starred";
import Templates from "./Menus/Templates";
import TextField from "@mui/material/TextField";
import Badge from "@mui/material/Badge";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Tooltip from "@mui/material/Tooltip";
import Profiles from "./Menus/Profiles";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import CreateTemplate from "./Menus/CreateTemplate";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Button, Menu, MenuItem, Switch } from "@mui/material";
import {
  fetchBoardDetailApi,
  fetchInviteByUserApi,
  fetchInviteUpdateApi,
  fetchUserDetailApi,
} from "~/apis";
import { toast } from "react-toastify";
import { wrap } from "lodash";

const AppBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [invites, setInvites] = useState([]);
  const [isReading, setIsReading] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/boards");
  };

  console.log("invites", invites);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleShowNotify = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    fetchInviteOfUser();
  }, [isReading]);

  const fetchInviteOfUser = async () => {
    const result = await fetchInviteByUserApi(isReading);
    const resultInfo = await fetchBoardsForInvites(result);

    setInvites(resultInfo);
  };

  const fetchBoardsForInvites = async (invites) => {
    const boardsInfo = await Promise.all(
      invites.map(async (invite) => {
        const boardInfo = await fetchBoardDetailApi(invite.boardId);
        const userInfo = await fetchUserDetailApi(invite.invitedBy);
        return {
          ...invite,
          boardInfo,
          userInfo,
        };
      })
    );

    return boardsInfo;
  };

  const handleAcceptInvite = async (inviteId) => {
    try {
      await fetchInviteUpdateApi(inviteId, { status: "accepted" });
      toast.success("Invitation accepted successfully.");
    } catch (error) {
      toast.error("Error accepting invitation:");
    }
  };

  // const handleRejectInvite = async (inviteId) => {
  //   try {
  //     await fetchInviteUpdateApi(inviteId, { status: 'declined' })
  //     toast.success("Invitation declined successfully.")
  //   } catch (error) {
  //     toast.error("Error declining invitation:");
  //   }
  // };

  const handleSwitchChange = () => {
    setIsReading(!isReading);
  };

  return (
    <>
      <Box
        px={2}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          overflowX: "auto",
          height: (theme) => theme.trello.appBarHeight,
          bgcolor: (theme) =>
            theme.palette.mode == "dark" ? "#2c3e50" : "#1565c0",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <AppsIcon sx={{ color: "white" }} />

          <Box
            onClick={handleNavigate}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              cursor: "pointer",
            }}
          >
            <SvgIcon
              component={TrelloLogo}
              inheritViewBox
              aria-label="Trello Logo"
              fontSize="small"
              sx={{ color: "white" }}
            />
            <Typography
              variant="span"
              sx={{ color: "white", fontWeight: "600", fontSize: "1.2rem" }}
            >
              Trello
            </Typography>
          </Box>

          <Workspaces />
          <Recent />
          <Starred />
          <Templates />
          <CreateTemplate />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <TextField
            id="outlined-search"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "white" }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <CloseIcon
                    fontSize="small"
                    sx={{
                      color: searchValue ? "white" : "transparent",
                      cursor: "pointer",
                    }}
                    onClick={() => setSearchValue("")}
                  />
                </InputAdornment>
              ),
            }}
            label="Search..."
            type="text"
            size="small"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            sx={{
              minWidth: "120px",
              maxWidth: "170px",
              "& label": {
                color: "white",
              },
              "& input": {
                color: "white",
              },
              "& label.Mui-focused": {
                color: "white",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "white" },
                "&:hover fieldset": { borderColor: "white" },
                "&.Mui-focused fieldset": { borderColor: "white" },
              },
            }}
          />
          <ModeSelect />
          <Badge color="warning" variant="dot" onClick={handleShowNotify}>
            <Tooltip title="Notification">
              <NotificationsNoneIcon sx={{ color: "white" }} />
            </Tooltip>
          </Badge>

          {invites && invites.length > 0 ? (
            <Menu
              id="invite-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              PaperProps={{
                style: {
                  maxHeight: "400px",
                  width: "350px",
                  marginTop: "15px",
                  borderRadius: "8px",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                },
              }}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                p={2}
                borderBottom="1px solid #ddd"
              >
                <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                  Thông báo
                </span>
                <Switch checked={isReading} onChange={handleSwitchChange} />
              </Box>

              <Box maxHeight="300px" overflow="auto">
                {invites.map((invite) => (
                  <MenuItem
                    key={invite._id}
                    style={{
                      padding: "12px 16px",
                      borderBottom: "1px solid #f0f0f0",
                    }}
                  >
                    <Box
                      display="flex"
                      flexDirection="column"
                      width="100%"
                      sx={{
                        borderRadius: 1,
                        border: "1px solid #e3e1e1",
                        p: 1,
                        boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                      }}
                    >
                      <Box display="flex" justifyContent="space-between">
                        <span style={{ fontWeight: "bold", color: "#333" }}>
                          {invite.boardInfo?.title || "No Title"}
                        </span>
                      </Box>
                      <Box
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                        marginTop={1}
                      >
                        <span style={{ marginRight: "5px" }}>
                          <Avatar
                            alt="Remy Sharp"
                            src="/static/images/avatar/1.jpg"
                          />
                        </span>
                        <span style={{ color: "#777", fontSize: "1rem" }}>
                          {invite.userInfo?.email}
                        </span>
                      </Box>
                      <Box
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                        marginTop={1}
                        flexWrap={wrap}
                      >
                        <span
                          style={{
                            color: "#777",
                            fontSize: "16px",
                            display: "flex",
                            flexWrap: "wrap",
                            wordWrap: "break-word",
                            whiteSpace: "normal",
                          }}
                        >
                          Đã thêm bạn vào bảng
                          <Link to={`/board/${invite.boardId}`} style={{ color: "#4ca5e5", margin: "0 5px", textDecoration: 'none' }}>
                            {invite.boardInfo?.title}
                          </Link>
                          <span style={{ fontSize: '0.8rem'}}>{new Date(invite.createAt).toLocaleTimeString()}</span>
                        </span>
                      </Box>
                      {invite.status === "pending" && (
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          marginTop={1}
                        >
                          <Button
                            size="small"
                            variant="contained"
                            color="primary"
                            onClick={() =>
                              handleAcceptInvite(invite._id, invite.invitedBy)
                            }
                            style={{ marginRight: "8px" }}
                          >
                            Chấp nhận
                          </Button>
                        </Box>
                      )}
                    </Box>
                  </MenuItem>
                ))}
              </Box>
            </Menu>
          ) : (
            <Menu
              id="invite-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              PaperProps={{
                style: {
                  maxHeight: "400px",
                  width: "350px",
                  marginTop: "15px",
                  borderRadius: "8px",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                },
              }}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                p={2}
                borderBottom="1px solid #ddd"
              >
                <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                  Thông báo
                </span>
                <Switch checked={isReading} onChange={handleSwitchChange} />
              </Box>
              <MenuItem
                disabled
                style={{ justifyContent: "center", padding: "20px" }}
              >
                Không có lời mời nào
              </MenuItem>
            </Menu>
          )}

          <Tooltip title="Information">
            <HelpOutlineIcon sx={{ color: "white" }} />
          </Tooltip>

          <Profiles />
        </Box>
      </Box>
    </>
  );
};

export default AppBar;
