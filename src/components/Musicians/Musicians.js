import React, {useEffect, useState} from "react";
import {
    Button, Container,
    Dialog, FormControl,
    Grid, InputLabel, MenuItem, Pagination, Select,
    Table,
    TableBody, TableCell,
    TableContainer, TableHead,
    TableRow,
    Typography
} from "@mui/material";
import Instruments from "../../containers/Musicians/Instruments";
import MusicianForm from "../../containers/Musicians/MusicianForm";
import {getInstrumentsInitialRequest} from "../../api/instruments";
import {deleteMusicianById, getMusiciansInitialRequest, getMusiciansSubsequentRequest} from "../../api/musicians";
import {SORT_BY_LASTNAME} from "../../appConstans/appConstans";

const Musicians = ({
                       musicians,
                       instruments,
                       auth,
                       addInstrumentsToState,
                       addMusiciansToState,
                       pagination,
                       addPagination,
                       removeMusician
                   }) => {

    useEffect(() => {
        const fetchInitialData = async () => {
            const responseMusicians = await getMusiciansInitialRequest(auth);
            await addMusiciansToState(responseMusicians.content);

            let responseInstruments = await getInstrumentsInitialRequest(auth);
            await addInstrumentsToState(responseInstruments);

            await addPagination({
                pageNo: responseMusicians.pageNo,
                pageSize: responseMusicians.pageSize,
                totalElements: responseMusicians.totalElements,
                totalPages: responseMusicians.totalPages,
                last: responseMusicians.last
            })
        }
        if (instruments.length === 0 || musicians.length === 0) {
            fetchInitialData()
        }
    }, []);


    const [instrumentsOpen, setInstrumentsOpen] = useState(false);
    const toggleInstruments = () => {
        setInstrumentsOpen(!instrumentsOpen);
    }

    const [addFormOpen, setAddFormOpen] = useState(false);
    const toggleForm = () => {
        setAddFormOpen(!addFormOpen)
    }

    const handleDelete = async (musician) => {
        const response = await deleteMusicianById(musician.id, auth);
        removeMusician(musician)
    }

    const [pageNo, setPageNo] = useState(0);
    const [sortDir, setSortDir] = useState("")

    const handlePagination = (e, p) => {
        setPageNo(p - 1);
    }

    const handleSelect = (e) => {
        if(e.target.value === "ASC"){
            setSortDir("&sortDir=ASC")
        } else {
            setSortDir("&sortDir=DESC")
        }
    }

    const [updateFormOpen, setUpdateFormOpen] = useState(false)
    const [musicianToUpdate, setMusicianToUpdate] = useState();
    const toggleUpdate = (musician) => {
        setUpdateFormOpen(!updateFormOpen)
        setMusicianToUpdate(musician)
    }

    useEffect(() => {
            const fetchSubsequentData = async () => {
                let response = await getMusiciansSubsequentRequest(pageNo, SORT_BY_LASTNAME, sortDir, auth);
                await addMusiciansToState(response.content);
                await addPagination({
                    pageNo: response.pageNo,
                    pageSize: response.pageSize,
                    totalElements: response.totalElements,
                    totalPages: response.totalPages,
                    last: response.last
                })
            }
            fetchSubsequentData()
        }, [sortDir, pageNo]
    )


    return (
        <Grid
            container
            spacing={0}
            direction="column"
            paddingTop={"5%"}
            paddingLeft={"10%"}
            paddingRight={"5%"}
            sx={{minHeight: '100vh'}}
        >
            <Container sx={{display: 'inline-flex', justifyContent: "space-between"}}>
                <Typography variant={"h4"} color={"black"} gutterBottom>
                    Muzycy
                </Typography>
                <Grid full sx={{
                    width:200
                }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Sortuj</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Sortuj"
                            onChange={handleSelect}
                        >
                            <MenuItem value={"ASC"}>Rosnąco po nazwisku</MenuItem>
                            <MenuItem value={"DESC"}>Malejąco po nazwisku</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Pagination count={pagination.totalPages}
                            onChange={handlePagination}
                />
            </Container>
            <TableContainer>
                <Table
                    sx={{
                        tableLayout: "auto",
                        width: "max-content",
                        height: "max-content"
                    }}
                >
                    <TableHead>
                        <TableRow
                            sx={{
                                backgroundColor: "lightGrey"
                            }}
                        >
                            <TableCell>
                                Nazwisko
                            </TableCell>
                            <TableCell>
                                Imię
                            </TableCell>
                            <TableCell>
                                Email
                            </TableCell>
                            <TableCell>
                                Notatki
                            </TableCell>
                            <TableCell>
                                Uwagi
                            </TableCell>
                            <TableCell>
                                Instrument
                            </TableCell>
                            <TableCell>

                            </TableCell>
                            <TableCell>

                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody fullWidth>
                        {musicians.map((el, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    {el.lastName}
                                </TableCell>
                                <TableCell>
                                    {el.firstName}
                                </TableCell>
                                <TableCell>
                                    {el.email}
                                </TableCell>
                                <TableCell>
                                    {el.phone}
                                </TableCell>
                                <TableCell>
                                    {el.notes}
                                </TableCell>
                                <TableCell>
                                    {el.instruments[0].name}
                                </TableCell>
                                <TableCell>
                                    <Button variant={"outlined"}
                                    onClick={() => toggleUpdate(el)}
                                    >Edytuj</Button>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant={"outlined"}
                                        onClick={() => handleDelete(el)}
                                    >
                                        Usuń
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button variant={"outlined"} color={"secondary"} style={{justifyContent: "flex-start"}}
                    onClick={toggleForm}>Dodaj muzyka</Button>
            <Button variant={"outlined"} color={"secondary"} style={{justifyContent: "flex-start"}}
                    onClick={toggleInstruments}>Instrumenty</Button>
            <Dialog open={instrumentsOpen}>
                <Instruments toggle={toggleInstruments}/>
            </Dialog>
            <Dialog open={addFormOpen}>
                <MusicianForm toggle={toggleForm}/>
            </Dialog>
            <Dialog open={updateFormOpen}>
                <MusicianForm toggle={toggleUpdate} musician={musicianToUpdate}/>
            </Dialog>
        </Grid>
    )
}

export default Musicians