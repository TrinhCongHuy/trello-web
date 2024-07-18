/* eslint-disable react/prop-types */
import Box from "@mui/material/Box"
import Column from "./Column/Column"
import { Button } from "@mui/material"
import NoteAddIcon from "@mui/icons-material/NoteAdd"
import {
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable"
import { useState } from "react"
import TextField from "@mui/material/TextField"
import InputAdornment from "@mui/material/InputAdornment"
import CloseIcon from "@mui/icons-material/Close"
import { toast } from "react-toastify"


const ListColumns = ({ columns }) => {
  const [showInputColum, setShowInputColum] = useState(false)
  const [newColumnTitle, setNewColumnTitle] = useState("")

  const toggleShowInputColum = () => setShowInputColum(!showInputColum)

  const addNewColum = () => {
    if (!newColumnTitle) {
      toast.error('Please enter column title!', { position: "top-right", theme: "colored" })
      return
    }

    // console.log("newColumnTitle", newColumnTitle)
    setNewColumnTitle("")
    setShowInputColum(false)
  }

  return (
    <>
      <SortableContext
        items={columns?.map((c) => c._id)}
        strategy={horizontalListSortingStrategy}
      >
        <Box
          sx={{
            backgroundColor: "inherit",
            width: "100%",
            height: "100%",
            display: "flex",
            overflowX: "auto",
            overflowY: "hidden",
            "&::-webkit-scrollbar-track": { m: 2 },
          }}
        >
          {columns?.map((column) => {
            return <Column key={column._id} column={column} />
          })}

          {/* Box add new column */}
          {!showInputColum ? (
            <Box
              onClick={toggleShowInputColum}
              sx={{
                mx: 2,
                minWidth: "250px",
                maxWidth: "250px",
                borderRadius: "6px",
                height: "fit-content",
                bgcolor: "#ffffff3d",
              }}
            >
              <Button
                sx={{
                  color: "white",
                  width: "100%",
                  justifyContent: "flex-start",
                  pl: 2.5,
                }}
                startIcon={<NoteAddIcon />}
              >
                Add new column
              </Button>
            </Box>
          ) : (
            <Box
              sx={{
                minWidth: "250px",
                maxWidth: "250px",
                mx: 2,
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
                label="Enter column title..."
                type="text"
                size="small"
                variant="outlined"
                autoFocus
                value={newColumnTitle}
                onChange={(e) => setNewColumnTitle(e.target.value)}
                sx={{
                  "& label": {
                    color: "white",
                    fontSize: "14px",
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
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Button
                  onClick={addNewColum}
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
                  Add column
                </Button>
                <InputAdornment position="end">
                  <CloseIcon
                    fontSize="small"
                    sx={{
                      color: "white",
                      cursor: "pointer",
                      "&:hover": { bgcolor: "rgba(246, 245, 245, 0.3)" },
                    }}
                    onClick={toggleShowInputColum}
                  />
                </InputAdornment>
              </Box>
            </Box>
          )}
        </Box>
      </SortableContext>
    </>
  )
}

export default ListColumns
