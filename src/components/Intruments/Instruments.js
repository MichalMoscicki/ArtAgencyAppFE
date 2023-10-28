import React, {useEffect, useState} from "react";
import {
    Button,
    Container,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TextField
} from "@mui/material";
import {addInstrument, getInstrumentsInitialRequest, deleteInstrumentById} from "../../api/instruments";
import {blankCheck} from "../../appUtils/appUtils";

const Instruments = ({
                         toggle,
                         instruments,
                         auth,
                         addInstrumentsToState,
                         addInstrumentToState,
                         removeInstrument
                     }) => {

    const [instrumentName, setInstrumentName] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!blankCheck(instrumentName)) {
            try {
                const instrument = {name: instrumentName};
                const response = await addInstrument(instrument, auth);
                await addInstrumentToState(response);
                setInstrumentName("");
            } catch (Error) {
                console.log("Nie można dodać intrumentu: " + Error.value)
            }
        }
    }
    const handleNameChange = (e) => {
        setInstrumentName(e.target.value)
    }
    const handleDelete = async (instrument) => {
        await deleteInstrumentById(instrument.id, auth)
        removeInstrument(instrument);
    }

    useEffect(() => {
        const fetchInitialData = async () => {
            let responseInstruments = await getInstrumentsInitialRequest(auth);
            await addInstrumentsToState(responseInstruments);

        }
        if (instruments.length === 0) {
            fetchInitialData()
        }
    }, []);

    return (
        <Container sx={{paddingBottom: 2, paddingTop: 2}}>
            <TableContainer
                sx={{
                    padding: 1,
                    width: 400,
                    height: 200,
                    margin: 'auto',
                    "&::-webkit-scrollbar": {
                    width: 20
                },
                    "&::-webkit-scrollbar-track": {
                        backgroundColor: "lightgrey"
                    },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "grey",
                        borderRadius: 2
                    }
                }}
            >
                <Table
                    sx={{
                        tableLayout: "auto",
                        width: "max-content",
                        height: "max-content"
                    }}
                >
                    <TableBody fullWidth>
                        {instruments.map((el, index) => (
                            <TableRow key={index} >
                                <TableCell>
                                    {el.name}
                                </TableCell>
                                <TableCell>-------------------------------</TableCell>
                                <TableCell>
                                    <Button onClick={() => handleDelete(el)}>Usuń</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <form onSubmit={handleSubmit}>
                <Grid container sx={{justifyContent: 'space-between', paddingBottom: 2, paddingTop: 2}}>
                    <Grid item>
                        <TextField label={"Wpisz nazwę instrumentu"} size={"small"} onChange={handleNameChange} value={instrumentName}/>
                    </Grid>
                    <Grid item alignItems="stretch" style={{display: "flex"}}>
                        <Button variant={"outlined"} type={"submit"}>Dodaj instrument</Button>
                    </Grid>
                </Grid>
            </form>
            <Button onClick={toggle} variant={"outlined"} fullWidth>
                Zamknij
            </Button>
        </Container>
    )
}

export default Instruments;