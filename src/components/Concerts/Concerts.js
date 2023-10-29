import React, {useState} from "react";
import {deleteMusicianById, getMusiciansInitialRequest, getMusiciansSubsequentRequest} from "../../api/musicians";
import {SORT_BY_LASTNAME, SORT_DIR_ASC, SORT_DIR_DESC} from "../../appConstans/appConstans";
import {
    Button,
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
import Instruments from "../../containers/Instruments/Instruments";
import MusicianForm from "../../containers/Musicians/MusicianForm";
import ConcertForm from "../../containers/Concerts/ConcertForm";

const Concerts = ({concerts, auth, pagination, addConcertsToState, removeConcertFromState, addMusiciansToState, addSongsToState, addPagination}) => {
    // const [instrumentsOpen, setInstrumentsOpen] = useState(false);
    const [formOpen, setFormOpen] = useState(false);
    // const [pageNo, setPageNo] = useState(0);
    // const [sortDir, setSortDir] = useState("");
    // const [updateFormOpen, setUpdateFormOpen] = useState(false);
    // const [musicianToUpdate, setMusicianToUpdate] = useState();
    //
    // const toggleInstruments = () => {
    //     setInstrumentsOpen(!instrumentsOpen);
    // }
    const toggleForm = () => {
        setFormOpen(!formOpen);
    }
    // const handleDelete = async (musician) => {
    //     const response = await deleteMusicianById(musician.id, auth);
    //     removeMusician(musician)
    // }
    // const handlePagination = (e, p) => {
    //     setPageNo(p - 1);
    // }
    // const handleSelect = (e) => {
    //     if (e.target.value === "ASC") {
    //         setSortDir(SORT_DIR_ASC)
    //     } else {
    //         setSortDir(SORT_DIR_DESC)
    //     }
    // }
    // const toggleUpdate = (musician) => {
    //     setUpdateFormOpen(!updateFormOpen)
    //     setMusicianToUpdate(musician)
    // }
    //
    // useEffect(() => {
    //     const fetchInitialData = async () => {
    //         const responseMusicians = await getMusiciansInitialRequest(auth);
    //         await addMusiciansToState(responseMusicians.content);
    //
    //         await addPagination({
    //             pageNo: responseMusicians.pageNo,
    //             pageSize: responseMusicians.pageSize,
    //             totalElements: responseMusicians.totalElements,
    //             totalPages: responseMusicians.totalPages,
    //             last: responseMusicians.last
    //         })
    //     }
    //     if (musicians.length === 0) {
    //         fetchInitialData()
    //     }
    // }, []);

    // useEffect(() => {
    //     const fetchSubsequentData = async () => {
    //         let response = await getMusiciansSubsequentRequest(pageNo, SORT_BY_LASTNAME, sortDir, auth);
    //         await addMusiciansToState(response.content);
    //         await addPagination({
    //             pageNo: response.pageNo,
    //             pageSize: response.pageSize,
    //             totalElements: response.totalElements,
    //             totalPages: response.totalPages,
    //             last: response.last
    //         })
    //     }
    //     fetchSubsequentData()
    // }, [sortDir, pageNo]);

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
                    Koncerty
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
                            // onChange={handleSelect}
                        >
                            <MenuItem value={"ASC"}>Rosnąco po nazwisku</MenuItem>
                            <MenuItem value={"DESC"}>Malejąco po nazwisku</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Pagination
                    // count={pagination.totalPages}
                    //         onChange={handlePagination}
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
                            <TableCell>
                                Nazwa
                            </TableCell>
                            <TableCell>
                                Data
                            </TableCell>
                            <TableCell>
                                Lokalizacja
                            </TableCell>
                            <TableCell>
                                Organizator
                            </TableCell>
                            <TableCell>

                            </TableCell>
                        </TableRow>
                    </TableHead>
                    {/*<TableBody fullWidth>*/}
                    {/*    {musicians.map((el, index) => {*/}
                    {/*        if (index <= 5) {*/}
                    {/*            return (*/}
                    {/*                <TableRow key={index}>*/}
                    {/*                    <TableCell>*/}
                    {/*                        {el.lastName}*/}
                    {/*                    </TableCell>*/}
                    {/*                    <TableCell>*/}
                    {/*                        {el.firstName}*/}
                    {/*                    </TableCell>*/}
                    {/*                    <TableCell>*/}
                    {/*                        {el.email}*/}
                    {/*                    </TableCell>*/}
                    {/*                    <TableCell>*/}
                    {/*                        {el.phone}*/}
                    {/*                    </TableCell>*/}
                    {/*                    <TableCell>*/}
                    {/*                        {el.notes}*/}
                    {/*                    </TableCell>*/}
                    {/*                    <TableCell>*/}
                    {/*                        {el.instruments[0].name}*/}
                    {/*                    </TableCell>*/}
                    {/*                    <TableCell>*/}
                    {/*                        <Button*/}
                    {/*                            variant={"outlined"}*/}
                    {/*                            // onClick={() => toggleUpdate(el)}*/}
                    {/*                        >*/}
                    {/*                            Edytuj*/}
                    {/*                        </Button>*/}
                    {/*                    </TableCell>*/}
                    {/*                    <TableCell>*/}
                    {/*                        <Button*/}
                    {/*                            variant={"outlined"}*/}
                    {/*                            // onClick={() => handleDelete(el)}*/}
                    {/*                        >*/}
                    {/*                            Usuń*/}
                    {/*                        </Button>*/}
                    {/*                    </TableCell>*/}
                    {/*                </TableRow>*/}
                    {/*            );*/}
                    {/*        }*/}
                    {/*        return null;*/}
                    {/*    })}*/}
                    {/*</TableBody>*/}
                </Table>
            </TableContainer>
            <Button variant={"outlined"} color={"secondary"} style={{justifyContent: "flex-start"}}
                    onClick={toggleForm}>Dodaj koncert</Button>
            {/*<Button variant={"outlined"} color={"secondary"} style={{justifyContent: "flex-start"}}*/}
            {/*        onClick={toggleInstruments}>Instrumenty</Button>*/}
            {/*<Dialog open={instrumentsOpen}>*/}
            {/*    <Instruments toggle={toggleInstruments}/>*/}
            {/*</Dialog>*/}
            <ConcertForm open={formOpen} toggle={toggleForm}/>
        </Grid>
    )

}

export default Concerts
