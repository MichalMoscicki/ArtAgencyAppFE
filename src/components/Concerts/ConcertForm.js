import React, {useEffect, useState} from "react"
import {blankCheck} from "../../appUtils/appUtils";
import {
    Button,
    Dialog,
    Grid,
    InputLabel,
    List,
    ListItem,
    MenuItem,
    Select,
    TextField, Typography
} from "@mui/material";
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';
import {addConcert, updateConcert} from "../../api/concerts";

const ConcertForm = ({
                         toggle,
                         open,
                         concert,
                         musicians,
                         songs,
                         auth,
                         addSingleConcertToState,
                         updateConcertInState
                     }) => {

    const concertPresent = typeof concert !== "undefined";
    const [title, setTitle] = useState("");
    const [date, setDate] = useState(null);
    const [address, setAddress] = useState("");
    const [concertMusicians, setConcertMusicians] = useState([]);
    const [concertSongs, setConcertSongs] = useState([]);
    const [buttonDisabled, setButtonDisabled] = useState(true);

    const handleTitle = (e) => {
        setTitle(e.target.value)
    }
    const handleDate = (e) => {
        setDate(new Date(e.$y, e.$M, e.$D))
    }
    const handleAddress = (e) => {
        setAddress(e.target.value)
    }
    const handleMusicians = (e) => {
        setConcertMusicians([...concertMusicians, e.target.value])
    }
    const deleteMusician = (id) => {
        const filteredMusicians = concertMusicians.filter((musician) => musician.id !== id);
        setConcertMusicians([...filteredMusicians]);
    }
    const handleSongs = (e) => {
        setConcertSongs([...concertSongs, e.target.value])
    }
    const deleteSong = (id) => {
        const filteredSongs = concertSongs.filter((song) => song.id !== id);
        setConcertSongs([...filteredSongs]);
    }
    const handleSubmit = async () => {
        const concertOutput = {
            id: (concertPresent ? concert.id : null),
            title: title,
            date: date,
            address: address,
            musicians: concertMusicians,
            songs: concertSongs
        }
        try {
            if (concertPresent) {
                const concert = await updateConcert(concertOutput, auth);
                await updateConcertInState(concert);
            } else {
                const response = await addConcert(concertOutput, auth);
                await addSingleConcertToState(response);
            }
        } catch (Error) {
            console.log("Nie można dodać koncertu: " + Error.value)
        }
        toggle();
        const restartState = () => {
            setTitle("");
            setDate(null);
            setAddress("");
            setConcertMusicians([]);
            setConcertSongs([]);
        }
        restartState();
    }

    useEffect(() => {
        const checkButtons = () => {
            if (!blankCheck(title) &&
                (date !== null)
            ) {
                setButtonDisabled(false)
            } else {
                setButtonDisabled(true)
            }
        }
        checkButtons()

    }, [title, date])
    useEffect(() => {
        setTitle(concertPresent ? concert.title : "");
        setDate(concertPresent ? concert.date : null);
        setAddress(concertPresent ? concert.address : "");
        setConcertMusicians(concertPresent ? concert.musicians : []);
        setConcertSongs(concertPresent ? concert.songs : []);
    }, [concert])

    return (
        <Dialog open={open} PaperProps={{
            style: {
                width: "100%",
                padding: "2%"

            }
        }}>
            <Grid sx={{display: "flex"}}>
                <Grid sx={{display: "grid", width: "50%", paddingRight: "1%"}}>
                    <TextField label={"Nazwa"} onChange={handleTitle} value={title}/>
                    {concertPresent ?
                        <Typography>Data:
                            {date}
                        </Typography>
                        :
                        <DateTimePicker
                            label='Data koncertu'
                            onChange={handleDate}
                            color={"secondary"}
                            renderInput={params => <TextField {...params} />}
                        />
                    }
                    <TextField label={"Adres"} onChange={handleAddress} value={address}/>
                    <InputLabel id="select-musicians">Dodaj muzyka</InputLabel>
                    <Select
                        labelId="select-musicians"
                        label="Muzycy"
                        fullWidth
                        onChange={handleMusicians}
                    >
                        {musicians.map((el, index) => (
                            <MenuItem value={el}
                                      key={index}>{el.firstName} {el.lastName} {el.instruments[0].name}</MenuItem>
                        ))}
                    </Select>
                    <Typography variant={"h6"}>Muzycy:</Typography>
                    <List>
                        {concertMusicians.map((el, index) => (
                            <ListItem
                                key={index}><Typography>{el.firstName} {el.lastName} {el.instruments[0].name}</Typography><Button
                                onClick={() => deleteMusician(el.id)}>Usuń</Button></ListItem>
                        ))}
                    </List>
                </Grid>
                <Grid sx={{width: "50%", paddingLeft: "1%"}}>

                    <InputLabel id="select-songs">Dodaj piosenkę</InputLabel>
                    <Select
                        labelId="select-songs"
                        label="Dodaj piosenkę"
                        fullWidth
                        onChange={handleSongs}
                    >
                        {songs.map((el, index) => (
                            <MenuItem value={el}
                                      key={index}>{el.title}</MenuItem>
                        ))}
                    </Select>
                    <Typography variant={"h6"}>Piosenki</Typography>
                    <List>
                        {concertSongs.map((el, index) => (
                            <ListItem
                                key={index}><Typography>{el.title}</Typography><Button
                                onClick={() => deleteSong(el.id)}>Usuń</Button></ListItem>
                        ))}
                    </List>
                </Grid>
            </Grid>
            <Button onClick={handleSubmit} variant={"contained"} color={"secondary"}
                    disabled={buttonDisabled}>{concertPresent ? "Zapisz zmiany" : "Dodaj"}</Button>
            <Button onClick={toggle} variant={"contained"}>Zamknij</Button>
        </Dialog>
    )
}
export default ConcertForm