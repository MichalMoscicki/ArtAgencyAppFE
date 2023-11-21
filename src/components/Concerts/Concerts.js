import React, {useEffect, useState} from "react";
import {SORT_BY_DATE, SORT_DIR_ASC, SORT_DIR_DESC} from "../../appConstans/appConstans";
import {
    Button, ButtonGroup,
    Container,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Pagination,
    Select, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow,
    Typography
} from "@mui/material";
import ConcertForm from "../../containers/Concerts/ConcertForm";
import ConfirmationPopUp from "../PopUp/ConfirmationPopUp";
import {deleteConcertById, getConcertSubsequentRequest} from "../../api/concerts";
const Concerts = ({concerts, auth, pagination, addConcertsToState, removeConcertFromState, addPagination}) => {
    const [formOpen, setFormOpen] = useState(false);
    const [popupOpen, setPopupOpen] = useState(false);
    const [concertToPass, setConcertToPass] = useState(undefined);
    const [pageNo, setPageNo] = useState(0);
    const [sortDir, setSortDir] = useState("");

    const toggleForm = () => {
        setFormOpen(!formOpen);
    }
    const togglePopup = () => {
        setPopupOpen(!popupOpen);
    }
    const handleAdd = () => {
        setConcertToPass(undefined);
        toggleForm();
    }
    const handleDelete = (concert) => {
        setConcertToPass(concert);
        togglePopup();
    }
    const handleUpdate = (concert) => {
        setConcertToPass(concert);
        toggleForm();
    }
    const removeConcert = async () => {
        await deleteConcertById(concertToPass.id, auth);
        removeConcertFromState(concertToPass);
        togglePopup();
    }

    const handlePagination = (e, p) => {
        setPageNo(p - 1);
    }
    const handleSelect = (e) => {
        if (e.target.value === "ASC") {
            setSortDir(SORT_DIR_ASC)
        } else {
            setSortDir(SORT_DIR_DESC)
        }
    }

    useEffect(() => {
        const fetchSubsequentData = async () => {
            let response = await getConcertSubsequentRequest(pageNo, SORT_BY_DATE, sortDir, auth);
            await addConcertsToState(response.content);
            await addPagination({
                pageNo: response.pageNo,
                pageSize: response.pageSize,
                totalElements: response.totalElements,
                totalPages: response.totalPages,
                last: response.last
            })
        }
        fetchSubsequentData()
    }, [sortDir, pageNo]);

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
                            onChange={handleSelect}
                        >
                            <MenuItem value={"ASC"}>od najstarszych</MenuItem>
                            <MenuItem value={"DESC"}>od najnowszych</MenuItem>
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
                            <TableCell>
                                Nazwa
                            </TableCell>
                            <TableCell>
                                Data
                            </TableCell>
                            <TableCell>
                                Lokalizacja
                            </TableCell>
                            <TableCell sx={{width: "15%"}}>

                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody fullWidth>
                        {concerts.map((el, index) => {
                            if (index <= 5) {
                                return (
                                    <TableRow key={index}>
                                        <TableCell>
                                            {el.title}
                                        </TableCell>
                                        <TableCell>
                                            {el.date}
                                        </TableCell>
                                        <TableCell>
                                            {el.address}
                                        </TableCell>
                                        <TableCell>
                                            <ButtonGroup>
                                                <Button
                                                    variant={"outlined"}
                                                    onClick={()=> handleUpdate(el)}
                                                >
                                                    Edytuj
                                                </Button>
                                                <Button
                                                    variant={"outlined"}
                                                    onClick={()=> handleDelete(el)}
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
                    onClick={handleAdd}>Dodaj koncert</Button>
            <ConcertForm open={formOpen} toggle={toggleForm} concert={concertToPass}/>
            <ConfirmationPopUp confirm={removeConcert} close={togglePopup} open={popupOpen}/>
        </Grid>
    )
}

export default Concerts
