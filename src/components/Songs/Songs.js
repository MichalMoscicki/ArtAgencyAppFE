import React, {useEffect, useState} from "react";
import {
    Button, ButtonGroup,
    Container, Dialog,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Pagination,
    Select, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow,
    Typography
} from "@mui/material";
import {SORT_BY_TITLE, SORT_DIR_ASC, SORT_DIR_DESC} from "../../appConstans/appConstans"
import {getInstrumentsInitialRequest} from "../../api/instruments";
import {deleteSongById, getSongsInitialRequest, getSongsSubsequentRequest} from "../../api/songs";
import ConfirmationPopUp from "../PopUp/ConfirmationPopUp";
import SongForm from "../../containers/Songs/SongForm";


const Songs = ({auth, addSongsToState, addInstrumentsToState, removeSongFromState, addPagination, instruments, songs, pagination}) => {

    useEffect(() => {
        const fetchInitialData = async () => {
            const responseMusicians = await getSongsInitialRequest(auth);
            await addSongsToState(responseMusicians.content);

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
        if (instruments.length === 0 || songs.length === 0) {
            fetchInitialData()
        }
    }, []);

    const [pageNo, setPageNo] = useState(0);
    const [sortDir, setSortDir] = useState("")

    const handlePagination = (e, p) => {
        setPageNo(p - 1);
    }
    const handleSelect = (e) => {
        if(e.target.value === "ASC"){
            setSortDir(SORT_DIR_ASC);
        } else {
            setSortDir(SORT_DIR_DESC);
        }
    }

    useEffect(() => {
            const fetchSubsequentData = async () => {
                let response = await getSongsSubsequentRequest(pageNo, SORT_BY_TITLE, sortDir, auth);
                await addSongsToState(response.content);
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

    const [confirmOpen, setConfirmOpen] = useState(false);
    const toggleDelete = () => {
        setConfirmOpen(!confirmOpen);
    }
    const[songToPass, setSongToPass] = useState(undefined);
    const handleDelete = (song) => {
        setSongToPass(song)
        toggleDelete();
    }
    const removeSong = async () => {
        await deleteSongById(songToPass.id, auth);
        removeSongFromState(songToPass);
        toggleDelete();
    }

    const [detailsOpen, setDetailsOpen] = useState(false);
    const toggleDetails = () => {
        setDetailsOpen(!detailsOpen);
    }
    const handleDetails = (song) => {
        setSongToPass(song);
        toggleDetails();
    }
    const handleAdd = () => {
        setSongToPass(undefined)
        toggleDetails()
    }

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            paddingTop={"5%"}
            paddingLeft={"10%"}
            paddingRight={"5%"}
        >
            <Container sx={{display: 'inline-flex', justifyContent: "space-between"}}>
                <Typography variant={"h4"} color={"black"} gutterBottom>
                    Utwory
                </Typography>
                <Grid full sx={{
                    width: 200
                }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Sortuj</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Sortuj"
                            onChange={handleSelect}
                        >
                            <MenuItem value={"ASC"}>Rosnąco po tytule</MenuItem>
                            <MenuItem value={"DESC"}>Malejąco po tytule</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Pagination
                    count={pagination.totalPages}
                            onChange={handlePagination}
                />
            </Container>
            <TableContainer>
                <Table
                    sx={{
                        tableLayout: "auto",
                        width: "100%",
                        height: "100%"
                    }}
                >
                    <TableHead>
                        <TableRow
                            sx={{
                                backgroundColor: "lightGrey",
                            }}
                        >
                            <TableCell
                                sx={{
                                    width: "35%"
                                }}
                            >
                                Tytuł
                            </TableCell>
                            <TableCell>
                                Opis
                            </TableCell>
                            <TableCell
                                sx={{
                                    width: "20%"
                                }}
                            />
                        </TableRow>
                    </TableHead>
                    <TableBody fullWidth>
                        {songs.map((el, index) => {
                            if (index <= 5) {
                                return (
                                    <TableRow key={index}>
                                        <TableCell>
                                            {el.title}
                                        </TableCell>
                                        <TableCell>
                                            {el.description}
                                        </TableCell>
                                        <TableCell>
                                            <ButtonGroup>
                                                <Button
                                                    variant={"outlined"}
                                                    onClick={() => handleDetails(el)}
                                                >
                                                    Szczegóły
                                                </Button>
                                                <Button
                                                    variant={"outlined"}
                                                    onClick={() => handleDelete(el)}
                                                >
                                                    Usuń
                                                </Button>
                                            </ButtonGroup>
                                        </TableCell>
                                    </TableRow>
                                );
                            }
                            return null;
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button variant={"outlined"} color={"secondary"} style={{justifyContent: "flex-start"}}
                onClick={handleAdd}
            >Dodaj utwór</Button>
            <Button variant={"outlined"} color={"secondary"} style={{justifyContent: "flex-start"}}
                // onClick={toggleInstruments}
            >Instrumenty</Button>
            {/*<Dialog open={instrumentsOpen}>*/}
            {/*    <Instruments toggle={toggleInstruments}/>*/}
            {/*</Dialog>*/}
            {/*<Dialog open={addFormOpen}>*/}
            {/*    <MusicianForm toggle={toggleForm}/>*/}
            {/*</Dialog>*/}
            <SongForm onClose={toggleDetails} open={detailsOpen} song={songToPass}/>
            <Dialog open={confirmOpen}>
                <ConfirmationPopUp close={toggleDelete} confirm={removeSong}/>
            </Dialog>
        </Grid>
    )
}


export default Songs;

