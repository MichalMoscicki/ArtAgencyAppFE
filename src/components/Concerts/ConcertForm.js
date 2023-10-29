import React, {useState} from "react"
import {addMusician, updateMusician} from "../../api/musicians";
import {blankCheck, emailCheck, phoneCheck} from "../../appUtils/appUtils";
import {
    Button,
    ButtonGroup,
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
import {addConcert} from "../../api/concerts";

const ConcertForm = ({toggle, open, concert, contacts, musicians, songs, auth, addSingleConcertToState}) => {
    const concertPresent = typeof concert !== "undefined";

    const [title, setTitle] = useState(concertPresent ? concert.title : "");
    const [date, setDate] = useState(concertPresent ? concert.date : "");
    const [address, setAddress] = useState(concertPresent ? concert.address : "");
    const [organizer, setOrganizer] = useState(concertPresent ? concert.organizer : null);
    const [concertMusicians, setConcertMusicians] = useState(concertPresent ? concert.musicians : []);
    const [concertSongs, setConcertSongs] = useState(concertPresent ? concert.songs : [])

    const handleTitle = (e) => {
        setTitle(e.target.value)
    }
    const handleAddress = (e) => {
        setAddress(e.target.value)
    }
    const handleOrganizer = (e) => {
        setOrganizer(e.target.value)
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
            id: (concertPresent? concert.id : null),
            title: title,
            date: date.$d,
            address: address,
            organizer: organizer,
            concertMusicians: concertMusicians,
            concertSongs: concertSongs
        }
        try {

            if(concertPresent){
                // const response = await updateMusician(musicianOutput, auth);
                // await updateMusicianInState(response)
            } else{
                const response = await addConcert(concertOutput, auth);
                console.log(response)
                // const response = await addMusician(musicianOutput, auth);
                // await addMusicianToState(response)
            }
        } catch (Error) {
            console.log("Nie można dodać koncertu: " + Error.value)
        }
        toggle();
    }
    //
    // useEffect(() => {
    //     const checkButtons = () => {
    //         if (!blankCheck(firstName) &&
    //             !blankCheck(lastName) &&
    //             emailCheck(email) &&
    //             phoneCheck(phone) &&
    //             (instrumentList.length !== 0)
    //         ) {
    //             setButtonDisabled(false)
    //         } else {
    //             setButtonDisabled(true)
    //         }
    //     }
    //     checkButtons()
    //
    // }, [firstName, lastName, email, phone, instrumentList])

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
                    <DateTimePicker
                        label='Data koncertu'
                        value={date}
                        onChange={newValue => {
                            setDate(newValue)
                        }}
                        color={"secondary"}
                        renderInput={params => <TextField {...params} />}
                    />
                    <TextField label={"Adres"} onChange={handleAddress} value={address}/>
                    <InputLabel id="select-organizer">Organizator</InputLabel>
                    <Select
                        labelId="select-organizer"
                        label="Organizator"
                        fullWidth
                        onChange={handleOrganizer}
                    >
                        {contacts.map((el, index) => (
                            <MenuItem value={el} key={index}>{el.title}</MenuItem>
                        ))}
                    </Select>
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
            <Button onClick={handleSubmit} variant={"contained"} color={"secondary"}>Dodaj</Button>
            <Button onClick={toggle} variant={"contained"}>Zamknij</Button>
        </Dialog>
    )
}
export default ConcertForm