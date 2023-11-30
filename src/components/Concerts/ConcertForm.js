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
import DescriptionForm from "./DescriptionForm";
import dayjs from "dayjs";

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
    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);
    const [description, setDescription] = useState(null);
    const [address, setAddress] = useState("");
    const [concertMusicians, setConcertMusicians] = useState([]);
    const [concertSongs, setConcertSongs] = useState([]);
    const [buttonDisabled, setButtonDisabled] = useState(true);

    const handleTitle = (e) => {
        setTitle(e.target.value)
    }
    const handleStart = (e) => {
        let date = new Date();
        date.setFullYear(e.$y, e.$M, e.$D);
        date.setHours(e.$H);
        date.setMinutes(e.$m);
        date.setSeconds(e.$s);
        date.setMilliseconds(e.$ms)
        setStart(date)
    }
    const handleEnd = (e) => {
        let date = new Date();
        date.setFullYear(e.$y, e.$M, e.$D);
        date.setHours(e.$H);
        date.setMinutes(e.$m);
        date.setSeconds(e.$s);
        date.setMilliseconds(e.$ms)
        setEnd(date)
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
            start: start,
            end: end,
            description:description,
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
            setStart(null);
            setEnd(null);
            setDescription(null);
            setAddress("");
            setConcertMusicians([]);
            setConcertSongs([]);
        }
        restartState();
    }

    useEffect(() => {
        const checkButtons = () => {
            if (!blankCheck(title)
                && !blankCheck(address)
                && (start != null)
                && (end!=null)
            ) {
                setButtonDisabled(false)
            } else {
                setButtonDisabled(true)
            }
        }
        checkButtons()

    }, [title, start, end, address])
    useEffect(() => {
        setTitle(concertPresent ? concert.title : "");
        setStart(concertPresent ? concert.start : null);
        setEnd(concertPresent ? concert.end : null);
        setDescription(concertPresent ? concert.description : null);
        setAddress(concertPresent ? concert.address : "");
        setConcertMusicians(concertPresent ? concert.musicians : []);
        setConcertSongs(concertPresent ? concert.songs : []);
    }, [concert])

    return (
        <Dialog open={open} PaperProps={{
            style: {
                width: "100%",
                minWidth: "800px",
                padding: "2%"
            }
        }}>
            <Grid sx={{display: "flex"}}>
                <Grid sx={{display: "grid", width: "100%", paddingRight: "1%"}}>
                    <TextField label={"Nazwa"} onChange={handleTitle} value={title}/>
                    {concertPresent ?
                        <Typography>Start:
                            {start}
                        </Typography>
                        :
                        <DateTimePicker
                            label='Początek'
                            onChange={handleStart}
                            color={"secondary"}
                            renderInput={params => <TextField {...params} />}
                        />
                    }
                    {concertPresent ?
                        <Typography>Start:
                            {end}
                        </Typography>
                        :
                        <DateTimePicker
                            views={['year', 'month', 'day', 'hours', 'minutes', 'seconds']}
                            label='Koniec'
                            onChange={handleEnd}
                            color={"secondary"}
                            renderInput={params => <TextField {...params} />}
                        />
                    }
                    <TextField label={"Adres"} onChange={handleAddress} value={address}/>
                </Grid>
                <Grid sx={{width: "100%", paddingLeft: "1%"}}>
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
                <Grid sx={{width: "100%", paddingLeft: "1%"}}>

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
                {concertPresent ?
                    <Typography>
                        {description}
                    </Typography>
                    :
                    <DescriptionForm setDescription={setDescription}/>
                }
            </Grid>
            <Button onClick={handleSubmit} variant={"contained"} color={"secondary"}
                    disabled={buttonDisabled}>{concertPresent ? "Zapisz zmiany" : "Dodaj"}</Button>
            <Button onClick={toggle} variant={"contained"}>Zamknij</Button>
        </Dialog>
    )
}
export default ConcertForm