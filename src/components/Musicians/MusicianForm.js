import React, {useEffect, useState} from "react";
import {Button, ButtonGroup, Grid, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {blankCheck, emailCheck, phoneCheck} from "../../appUtils/appUtils";
import {addMusician, updateMusician} from "../../api/musicians";
//todo - dodawanie listy instrumentów zamiast pojedynczego!
const MusicianForm = ({toggle, instruments, auth, addMusicianToState, musician, updateMusicianInState}) => {

    const musicianPresent = typeof musician !== "undefined";

    const [firstName, setFirstName] = useState(musicianPresent? musician.firstName : "");
    const [lastName, setLastName] = useState(musicianPresent? musician.lastName : "");
    const [email, setEmail] = useState(musicianPresent? musician.email : "");
    const [phone, setPhone] = useState(musicianPresent? musician.phone : "");
    const [notes, setNotes] = useState(musicianPresent? musician.notes : "");
    const [instrumentList, setInstrumentList] = useState(musicianPresent? musician.instruments : []);

    const handleFirstName = (e) => {
        setFirstName(e.target.value)
    }
    const handleLastName = (e) => {
        setLastName(e.target.value)
    }
    const handleEmail = (e) => {
        setEmail(e.target.value)
    }
    const handlePhone = (e) => {
        setPhone(e.target.value)
    }
    const handleNotes = (e) => {
        setNotes(e.target.value)
    }
    const handleInstruments = (e) => {
        setInstrumentList([e.target.value])
    }

    const handleSubmit = async () => {
        const musicianOutput = {
            id: musician.id,
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            notes: notes,
            instruments: instrumentList
        }
        try {

            if(musicianPresent){
                const response = await updateMusician(musicianOutput, auth);
                await updateMusicianInState(response)
            } else{
                const response = await addMusician(musicianOutput, auth);
                await addMusicianToState(response)
            }
        } catch (Error) {
            console.log("Nie można dodać muzyka: " + Error.value)
        }
        toggle();
    }

    const [buttonDisabled, setButtonDisabled] = useState(true);

    useEffect(() => {
        const checkButtons = () => {
            if (!blankCheck(firstName) &&
                !blankCheck(lastName) &&
                emailCheck(email) &&
                phoneCheck(phone) &&
                (instrumentList.length !== 0)
            ) {
                setButtonDisabled(false)
            } else {
                setButtonDisabled(true)
            }
        }
        checkButtons()

    }, [firstName, lastName, email, phone, instrumentList])


    return (
        <Grid sx={{padding: 2, display: "block"}} alignItems="center">
            <Grid>
                <TextField label={"Imię"} onChange={handleFirstName} value={firstName}/>
            </Grid>
            <Grid>
                <TextField label={"Nazwisko"} onChange={handleLastName} value={lastName}/>
            </Grid>
            <Grid>
                <TextField label={"Email"} onChange={handleEmail} value={email}/>
            </Grid>
            <Grid>
                <TextField label={"Telefon"} onChange={handlePhone} value={phone}/>
            </Grid>
            <Grid>
                <TextField label={"Notatki"} onChange={handleNotes} value={notes}/>
            </Grid>
            <Grid>
                <InputLabel id="select-instrument">Instrumenty</InputLabel>
                <Select
                    labelId="select-instrument"
                    label="Instrumenty"
                    fullWidth
                    onChange={handleInstruments}
                >
                    {instruments.map((el, index) => (
                        <MenuItem value={el} key={index}>{el.name}</MenuItem>
                    ))}
                </Select>
            </Grid>
            <Grid>
                <ButtonGroup alignItems="center" fullWidth>
                    <Button onClick={handleSubmit} disabled={buttonDisabled}>Dodaj</Button>
                    <Button onClick={toggle}>Zamknij</Button>
                </ButtonGroup>
            </Grid>
        </Grid>
    )
}

export default MusicianForm;