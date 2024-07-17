/* eslint-disable react/prop-types */
import Box from "@mui/material/Box";
import Column from "./Column/Column";
import { Button } from "@mui/material";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import { horizontalListSortingStrategy, SortableContext } from "@dnd-kit/sortable";

const ListColumns = ({ columns }) => {
  return (
    <SortableContext items={columns?.map((c) => c._id)} strategy={horizontalListSortingStrategy}>
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
          return <Column key={column._id} column={column} />;
        })}

        {/* Box add new column */}
        <Box
          sx={{
            mx: 2,
            minWidth: "200px",
            maxWidth: "200px",
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
      </Box>
    </SortableContext>
  );
};

export default ListColumns;
