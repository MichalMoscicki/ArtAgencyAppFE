import React, {useEffect, useState} from "react";
import {
    Button,
    ButtonGroup,
    Dialog,
    Grid,
    Input,
    InputLabel,
    List,
    ListItem,
    MenuItem,
    Select,
    TextField, Typography
} from "@mui/material";
import {addSong, updateSong} from "../../api/songs";
import {blankCheck, isObject} from "../../appUtils/appUtils";
import {addPart, deletePartById} from "../../api/songParts";

const SongForm = ({onClose, open, song, updateSongInState, addSongToState, auth, instruments}) => {

    const songPresent = typeof song !== "undefined";
    const [title, setTitle] = useState("");
    const [textAuthors, setTextAuthors] = useState("");
    const [composers, setComposers] = useState("");
    const [description, setDescription] = useState("");
    const [parts, setParts] = useState([]);
    const [partForm, setPartForm] = useState(false);
    const [instrument, setInstrument] = useState("");
    const [file, setFile] = useState("");
    const [loadDisabled, setLoadDisabled] = useState(true);
    const [saveDisabled, setSaveDisabled] = useState(true);

    const handleTitle = (e) => {
        setTitle(e.target.value)
    }
    const handleAuthors = (e) => {
        setTextAuthors(e.target.value)
    }
    const handleComposers = (e) => {
        setComposers(e.target.value)
    }
    const handleDescription = (e) => {
        setDescription(e.target.value)
    }
    const handleSave = async () => {
        const songOutput = {
            id: (songPresent ? song.id : null),
            title: title,
            description: description,
            composers: composers,
            textAuthors: textAuthors
        }

        if (songPresent) {
            const response = await updateSong(songOutput, auth);
            updateSongInState(response);
        } else {
            const response = await addSong(songOutput, auth);
            addSongToState(response);
        }
        onClose();
    }
    const togglePartForm = () => {
        setPartForm(!partForm)
        setInstrument("");
        setFile("")
    }
    const handleInstrument = (e) => {
        setInstrument(e.target.value)
    }
    const handleFile = (e) => {
        setFile(e.target.files[0])
    }
    const handleSubmit = async () => {

        const response = await addPart(song.id, file, instrument, auth);
        //fetch subsequent data or change BE -> POST should return partDTO
        setParts([...parts, response])
        updateSongInState({...song, parts:[...parts, response]});
        togglePartForm();
    }
    const handleDeleteSong = (el) => {
        deletePartById(song.id, el.id, auth);
        const filteredParts = parts.filter((part) => part.id !== el.id );
        setParts([...filteredParts]);
        updateSongInState({...song, parts:[...filteredParts]});
    }

    useEffect(() => {
            setLoadDisabled(!isObject(instrument) || !(file instanceof File))
    }, [file, instrument])
    useEffect(() => {
        setTitle(songPresent ? song.title : "");
        setTextAuthors(songPresent ? song.textAuthors : "");
        setComposers(songPresent ? song.composers : "");
        setDescription(songPresent ? song.description : "");
        setParts(songPresent ? song.parts : [])
    }, [song])
    useEffect(() => {
        setSaveDisabled(blankCheck(title))
    }, [title]);

    return (
        <Dialog open={open}
                fullWidth
                PaperProps={{
                    style: {
                        minHeight: '50%',
                        maxHeight: '90%'
                    }
                }}
        >
            <Grid>
                <List>
                    <ListItem> <TextField label={"Tytuł"} fullWidth onChange={handleTitle} value={title}/> </ListItem>
                    <ListItem> <TextField label={"Autorzy tekstu"} fullWidth onChange={handleAuthors}
                                          value={textAuthors}/> </ListItem>
                    <ListItem> <TextField label={"Kompozytorzy"} fullWidth onChange={handleComposers}
                                          value={composers}/> </ListItem>
                    <ListItem> <TextField label={"Opis"} fullWidth onChange={handleDescription} value={description}/>
                    </ListItem>
                    <ListItem> <Button variant={"outlined"} fullWidth color={"secondary"}
                                       onClick={handleSave} disabled={saveDisabled}>Zapisz</Button></ListItem>
                </List>

            </Grid>

            {songPresent &&
            <Grid>
                    <List>
                    <ListItem> Lista partii: </ListItem>
                    { songPresent &&
                        parts.map((el, index) => {
                        return (
                            <ListItem key={index} sx={{justifyContent: "space-between"}}>
                                <Typography>{el.instrumentName}</Typography>
                                <ButtonGroup>
                                   <a href={el.url}><Button>Pobierz</Button></a>
                                    <Button onClick={()=> handleDeleteSong(el)}>Usuń</Button>
                                </ButtonGroup>
                                </ListItem>
                        )
                    })}
                </List>
                <Button variant={"outlined"} fullWidth color={"secondary"} onClick={togglePartForm}>Dodaj partię</Button>
            </Grid>
            }
            <Grid>
                <Button variant={"contained"} fullWidth color={"secondary"} onClick={onClose}>Zamknij</Button>
            </Grid>
            <Dialog open={partForm} PaperProps={{
                sx: {
                    padding: "1%"
                }
            }}>
                <Typography variant={"h6"}>Dodaj partię</Typography>

                <Grid>
                    <InputLabel id="select-instrument">Instrument</InputLabel>
                    <Select
                        labelId="select-instrument"
                        label="Instrument"
                        fullWidth
                        onChange={handleInstrument}
                    >
                        {instruments.map((el, index) => (
                            <MenuItem value={el} key={index}>{el.name}</MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Input type={"file"} sx={{padding: "3%"}} onChange={handleFile}/>
                <ButtonGroup fullWidth>
                    <Button onClick={handleSubmit} disabled={loadDisabled}>Dodaj</Button>
                    <Button onClick={togglePartForm}>Zamknij</Button>
                </ButtonGroup>
            </Dialog>
        </Dialog>
    )
}
export default SongForm