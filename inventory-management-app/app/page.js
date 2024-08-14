"use client";

import { useState, useEffect } from "react";
import {
    Container,
    TextField,
    Button,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Typography,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { db } from "../firebase";
import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
} from "firebase/firestore";

export default function Home() {
    const [item, setItem] = useState("");
    const [items, setItems] = useState([]);
    const itemsCollection = collection(db, "inventory");

    useEffect(() => {
        const fetchItems = async () => {
            const itemsSnapshot = await getDocs(itemsCollection);
            const itemsList = itemsSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setItems(itemsList);
        };

        fetchItems();
    }, []);

    const addItem = async () => {
        if (item) {
            const docRef = await addDoc(itemsCollection, { name: item });
            setItems([...items, { id: docRef.id, name: item }]);
            setItem("");
        }
    };

    const deleteItem = async (id) => {
        const docRef = doc(db, "inventory", id);
        await deleteDoc(docRef);
        setItems(items.filter((item) => item.id !== id));
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h2" style={{ textAlign: "center" }}>
                Pantry Tracker
            </Typography>
            <TextField
                label="Enter item"
                value={item}
                onChange={(e) => {
                    setItem(e.target.value);
                }}
                fullWidth
                margin="normal"
            />
            <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={addItem}
            >
                Add Item
            </Button>
            <List>
                {items.map(({ id, name }) => (
                    <ListItem key={id}>
                        <ListItemText primary={name} />
                        <IconButton edge="end" onClick={() => deleteItem(id)}>
                            <Delete />
                        </IconButton>
                    </ListItem>
                ))}
            </List>
        </Container>
    );
}
