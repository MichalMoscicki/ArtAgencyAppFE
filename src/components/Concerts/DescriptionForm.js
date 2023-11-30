import React, {useEffect, useState} from "react";
import {Grid, TextField} from "@mui/material";

const DescriptionForm = ({setDescription}) => {
    const setsPlaceholder = "Ilość setów";
    const departurePlaceholder = "Wyjazd";
    const passengersPlaceholder = "Kto z kim jedzie";
    const soundcheckPlaceholder = "Próba dźwięku";
    const concertPlaceholder = "Godzina występu";
    const schedulePlaceholder = "Plan imprezy";
    const soundSystemPlaceholder = "Nagłośnienie";
    const parkingPlaceholder = "Miejsca parkingowe";
    const dressCodePlaceholder = "Ubiór";
    const contactPhonesPlaceholder = "Telefony kontaktowe";
    const othersPlaceHolder = "Pozostałe";


    const [setsCount, setSetsCount] = useState(setsPlaceholder + ";\n");
    const [departure, setDeparture] = useState(departurePlaceholder + ";\n");
    const [passengers, setPassengers] = useState(passengersPlaceholder + ";\n");
    const [soundcheck, setSoundcheck] = useState(soundcheckPlaceholder + ";\n");
    const [concert, setConcert] = useState(concertPlaceholder + ";\n");
    const [eventSchedule, setEventSchedule] = useState(schedulePlaceholder + ";\n");
    const [soundSystem, setSoundSystem] = useState(soundSystemPlaceholder + ";\n");
    const [parkingPlaces, setParkingPlaces] = useState(parkingPlaceholder + ";\n");
    const [dressCode, setDressCode] = useState(dressCodePlaceholder + ";\n");
    const [contactPhones, setContactPhones] = useState(contactPhonesPlaceholder + ";\n");
    const [others, setOthers] = useState(othersPlaceHolder + ";\n");

    useEffect(() => {
        const updateDescription = () => {
            setDescription(
                setsCount + departure + passengers + soundcheck +
                concert + eventSchedule + soundSystem + parkingPlaces +
                dressCode + contactPhones + others)
        }
        updateDescription();
    }, [setsCount, departure, passengers, soundcheck, concert, eventSchedule,
        soundSystem, parkingPlaces, dressCode, contactPhones, others])

    const handleSets = (e) => {
        setSetsCount(setsPlaceholder + ": \n" + e.target.value + "\n\n")
    }
    const handleDeparture = (e) => {
        setDeparture(departurePlaceholder + ": \n" + e.target.value + "\n\n")
    }
    const handlePassengers = (e) => {
        setPassengers(passengersPlaceholder + ": \n" + e.target.value + "\n\n")
    }
    const handleSoundcheck = (e) => {
        setSoundcheck(soundcheckPlaceholder + ": \n" + e.target.value + "\n\n")
    }
    const handleConcert = (e) => {
        setConcert(concertPlaceholder + ": \n" + e.target.value + "\n\n")
    }
    const handleEventSchedule = (e) => {
        setEventSchedule(schedulePlaceholder + ": \n" + e.target.value + "\n\n")
    }
    const handleSoundSystem = (e) => {
        setSoundSystem(soundSystemPlaceholder + ": \n" + e.target.value + "\n\n")
    }
    const handleParkingPlaces = (e) => {
        setParkingPlaces(parkingPlaceholder + ": \n" + e.target.value + "\n\n")
    }
    const handleDressCode = (e) => {
        setDressCode(dressCodePlaceholder +": \n" + e.target.value + "\n\n")
    }
    const handleContactPhones = (e) => {
        setContactPhones(contactPhonesPlaceholder + ": \n" + e.target.value + "\n\n")
    }
    const handleOthers = (e) => {
        setOthers(othersPlaceHolder + ": \n" + e.target.value + "\n\n")
    }

    return (
        <Grid>
            <TextField label={setsPlaceholder} onChange={handleSets}></TextField>
            <TextField label={departurePlaceholder} onChange={handleDeparture}></TextField>
            <TextField label={passengersPlaceholder} onChange={handlePassengers}></TextField>
            <TextField label={soundcheckPlaceholder} onChange={handleSoundcheck}></TextField>
            <TextField label={concertPlaceholder} onChange={handleConcert}></TextField>
            <TextField label={schedulePlaceholder} onChange={handleEventSchedule}></TextField>
            <TextField label={soundSystemPlaceholder} onChange={handleSoundSystem}></TextField>
            <TextField label={parkingPlaceholder} onChange={handleParkingPlaces}></TextField>
            <TextField label={dressCodePlaceholder} onChange={handleDressCode}></TextField>
            <TextField label={contactPhonesPlaceholder} onChange={handleContactPhones}></TextField>
            <TextField label={othersPlaceHolder} onChange={handleOthers}></TextField>
        </Grid>
    )
}

export default DescriptionForm