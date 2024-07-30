"use client";
import {
  Box,
  Stack,
  Typography,
  Button,
  Modal,
  TextField,
} from "@mui/material";
import { firestore } from "@/firebase";
import {
  collection,
  getDocs,
  query,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  display: "flex",
  flexDirection: "column",
  gap: 3,
  p: 4,
};

export default function Home() {
  const [pantry, setPantry] = useState([]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [itemName, setItemName] = useState("");

  const updatePantry = async () => {
    const snapshot = query(collection(firestore, "Pantry"));
    const docs = await getDocs(snapshot);
    const pantryList = [];
    docs.forEach((doc) => {
      pantryList.push(doc.id);
    });
    console.log(pantryList);
    setPantry(pantryList);
  };

  useEffect(() => {
    updatePantry();
  }, []);

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, "Pantry"), item);
    await setDoc(docRef, {});
    updatePantry();
  };

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, "Pantry"), item);
    deleteDoc(docRef).then(() => {
      updatePantry();
    });
  };
  return (
    <Box
      width="100vw"
      height="100vh"
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
      gap={2}
    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add item
          </Typography>
          <Stack width="100%" direction={"row"} spacing={2}>
            <TextField
              id="outlined-basic"
              label="Item"
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <Button
              variant="outlined"
              onClick={() => {
                addItem(itemName);
                handleClose();
                setItemName("");
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>

      <Button variant="contained" onClick={handleOpen}>
        Add
      </Button>

      <Box border={"1px solid #333"}>
        <Box
          width="800px"
          height="100px"
          bgcolor={"#ADD8E6"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography variant={"h2"} color={"#333"} textAlign={"center"}>
            Pantry
          </Typography>
        </Box>
        <Stack width="800px" height="200px" spacing={2} overflow={"auto"}>
          {pantry.map((i) => (
            <Box
              key={i}
              width="100%"
              height="100px"
              display={"flex"}
              justifyContent={"space-between"}
              padding={2}
              alignItems={"center"}
              bgcolor={"#f0f0f0f0"}
            >
              <Typography variant={"h4"} color={"#333"} textAlign={"center"}>
                {i.charAt(0).toUpperCase() + i.slice(1)}
              </Typography>

              <Button variant="contained" onClick={() => removeItem(i)}>
                Delete
              </Button>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
