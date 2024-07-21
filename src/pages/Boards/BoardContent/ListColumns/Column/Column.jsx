/* eslint-disable react/prop-types */
import Button from "@mui/material/Button"
import Tooltip from "@mui/material/Tooltip"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import { useState } from "react"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import Divider from "@mui/material/Divider"
import ListItemText from "@mui/material/ListItemText"
import ListItemIcon from "@mui/material/ListItemIcon"
import ContentCut from "@mui/icons-material/ContentCut"
import ContentCopy from "@mui/icons-material/ContentCopy"
import ContentPaste from "@mui/icons-material/ContentPaste"
import Cloud from "@mui/icons-material/Cloud"
import DeleteIcon from "@mui/icons-material/Delete"
import AddCardIcon from "@mui/icons-material/AddCard"
import DragHandleIcon from "@mui/icons-material/DragHandle"
import ListCards from "./ListCards/ListCards"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { InputAdornment, TextField } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import { toast } from "react-toastify"


const Column = ({ column, createNewCard }) => {
  const [showInputCard, setShowInputCard] = useState(false)
  const [newCardTitle, setNewCardTitle] = useState("")

  const toggleShowInputCard = () => {
    setShowInputCard(!showInputCard)
    setNewCardTitle('')
  }

  const orderedCards = column.cards

  const addNewCard = async () => {
    if (!newCardTitle) {
      toast.error('Please enter card title!', { position: "top-right", theme: "colored" })
      return
    }

    const newCard = {
      title: newCardTitle, 
      columnId: column._id
    }
    await createNewCard(newCard)

    setNewCardTitle("")
    setShowInputCard(false)
  }

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: column._id, data: { ...column } })

  const dndKitColumnStyles = {
    transform: CSS.Translate.toString(transform),
    transition,
    height: "100%",
    opacity: isDragging ? 0.5 : undefined
  }

  return (
    <div ref={setNodeRef} style={dndKitColumnStyles} {...attributes}>
      <Box
        {...listeners}
        sx={{
          minWidth: "300px",
          maxWidth: "300px",
          ml: 2,
          pb: "1px",
          bgcolor: (theme) =>
            theme.palette.mode == "dark" ? "#333643" : "#ebecf0",
          borderRadius: "6px",
          height: "fit-content",
          maxHeight: (theme) =>
            `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)} )`,
        }}
      >
        <Box
          sx={{
            height: (theme) => theme.trello.columnHeaderHeight,
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontSize: "1rem", fontWeight: "bold", cursor: "pointer" }}
          >
            {column?.title}
          </Typography>
          <Tooltip title="More options">
            <ExpandMoreIcon
              sx={{
                color: "text.primary",
                cursor: "pointer",
              }}
              id="basic-column-dropdown"
              aria-controls={open ? "basic-menu-column-dropdown" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            />
          </Tooltip>
          <Menu
            id="basic-menu-column-dropdown"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-column-dropdown",
            }}
          >
            <MenuItem>
              <ListItemIcon>
                <AddCardIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Add new card</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <ContentCut fontSize="small" />
              </ListItemIcon>
              <ListItemText>Cut</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <ContentCopy fontSize="small" />
              </ListItemIcon>
              <ListItemText>Copy</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <ContentPaste fontSize="small" />
              </ListItemIcon>
              <ListItemText>Paste</ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem>
              <ListItemIcon>
                <DeleteIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Remove this column</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <Cloud fontSize="small" />
              </ListItemIcon>
              <ListItemText>Archive this column</ListItemText>
            </MenuItem>
          </Menu>
        </Box>

        {/* List cards */}
        <ListCards cards={orderedCards} />

        {
          !showInputCard
          ?
          <Box
            onClick={toggleShowInputCard}
            sx={{
              height: (theme) => theme.trello.columnFooterHeight,
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Button startIcon={<AddCardIcon />}>Add new card</Button>
            <Tooltip title="Drag to move">
              <DragHandleIcon sx={{ cursor: "pointer" }} />
            </Tooltip>
          </Box>
          :
          <Box
            sx={{
              minWidth: "280px",
              maxWidth: "280px",
              m: 1.3,
              p: 1,
              borderRadius: "6px",
              height: "fit-content",
              display: "flex",
              bgcolor: "#ffffff3d",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <TextField
              id="outlined-search"
              label="Enter card title..."
              type="text"
              size="small"
              variant="outlined"
              data-no-dnd="true"
              autoFocus
              value={newCardTitle}
              onChange={(e) => setNewCardTitle(e.target.value)}
              sx={{

                "& label": {
                  color: (theme) => theme.palette.primary.main,
                  fontSize: "14px",
                },
                "& input": {
                  color: (theme) => theme.palette.primary.main,
                  bgcolor: (theme) => ( theme.palette.mode === 'dark' ? '#333643' : 'white')
                },
                "& label.Mui-focused": {
                  color: (theme) => theme.palette.primary.main
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: (theme) => theme.palette.primary.main },
                  "&:hover fieldset": { borderColor: (theme) => theme.palette.primary.main },
                  "&.Mui-focused fieldset": { borderColor: (theme) => theme.palette.primary.main },
                },
                "& .MuiOutlinedInput-input": {
                  borderRadius: 1
                }
              }}
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Button
                onClick={addNewCard}
                variant="contained"
                color="success"
                size="small"
                sx={{
                  boxShadow: "none",
                  border: "0.5px solid",
                  borderColor: (theme) => theme.palette.success.main,
                  "&:hover": {
                    bgcolor: (theme) => theme.palette.success.main,
                  },
                }}
              >
                Add card
              </Button>
              <InputAdornment position="end">
                <CloseIcon
                  fontSize="small"
                  sx={{
                    color: (theme) => ( theme.palette.mode === 'dark' ? 'white' : '#333643' ),
                    cursor: "pointer",
                    "&:hover": { bgcolor: "rgba(246, 245, 245, 0.3)" },
                  }}
                  onClick={toggleShowInputCard}
                />
              </InputAdornment>
            </Box>
          </Box>

        }
      </Box>
    </div>
  )
}

export default Column
