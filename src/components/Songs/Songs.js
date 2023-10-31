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
import {deleteSongById, getSongsSubsequentRequest} from "../../api/songs";
import ConfirmationPopUp from "../PopUp/ConfirmationPopUp";
import SongForm from "../../containers/Songs/SongForm";
import Instruments from "../../containers/Instruments/Instruments";

const Songs = ({
                   auth,
                   addSongsToState,
                   removeSongFromState,
                   addPagination,
                   songs,
                   pagination
               }) => {

    const [pageNo, setPageNo] = useState(0);
    const [sortDir, setSortDir] = useState("");
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [songToPass, setSongToPass] = useState(undefined);
    const [detailsOpen, setDetailsOpen] = useState(false);
    const [instrumentsOpen, setInstrumentOpen] = useState(false);

    const handlePagination = (e, p) => {
        setPageNo(p - 1);
    }
    const handleSelect = (e) => {
        if (e.target.value === "ASC") {
            setSortDir(SORT_DIR_ASC);
        } else {
            setSortDir(SORT_DIR_DESC);
        }
    }
    const toggleDelete = () => {
        setConfirmOpen(!confirmOpen);
    }
    const handleDelete = (song) => {
        setSongToPass(song)
        toggleDelete();
    }
    const removeSong = async () => {
        await deleteSongById(songToPass.id, auth);
        removeSongFromState(songToPass);
        toggleDelete();
    }
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
    const toggleInstruments = () => {
        setInstrumentOpen(!instrumentsOpen);
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
                    onClick={toggleInstruments}>Instrumenty</Button>
            <Dialog open={instrumentsOpen}>
                <Instruments toggle={toggleInstruments}/>
            </Dialog>
            <SongForm onClose={toggleDetails} open={detailsOpen} song={songToPass}/>
            <ConfirmationPopUp close={toggleDelete} confirm={removeSong} open={confirmOpen}/>
        </Grid>
    )
}

export default Songs;

