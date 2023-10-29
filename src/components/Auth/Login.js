import React, {useState} from "react";
import {Typography, TextField, Button, List, Paper, Grid, ListItem} from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import {useNavigate} from "react-router-dom";
import {logIn} from "../../api/auth";
import {getConcertsInitialRequest} from "../../api/concerts";
import {getContactsInitialRequest} from "../../api/contacts";
import {getInstrumentsInitialRequest} from "../../api/instruments";
import {getMusiciansInitialRequest} from "../../api/musicians";
import {getTasksInitialRequest} from "../../api/tasks";

export const Login = ({
                          addTokenToState,
                          addConcertsToState,
                          addConcertsPaginationToState,
                          addContactsToState,
                          addContactsPaginationToState,
                          addInstrumentsToState,
                          addMusiciansToState,
                          addMusiciansPaginationToState,
                          addSongsToState,
                          addSongsPagination,
                          addTasksToState,
                          addTaskPagination
                      }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorHidden, setErrorHidden] = useState(true);
    const paperStyle = {padding: 20, display: "box"};
    const navigate = useNavigate();

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }
    const fetchInitialData = async (token) => {

        try {
            const responseConcerts = await getConcertsInitialRequest(token);
            await addConcertsToState(responseConcerts.content);
            await addConcertsPaginationToState({
                pageNo: responseConcerts.pageNo,
                pageSize: responseConcerts.pageSize,
                totalElements: responseConcerts.totalElements,
                totalPages: responseConcerts.totalPages,
                last: responseConcerts.last
            });
        } catch (e) {
            console.log("Unable to fetch concerts");
            console.log(e);
        }

        try {
            const responseContacts = await getContactsInitialRequest(token);
            await addContactsToState(responseContacts.content);
            await addContactsPaginationToState({
                pageNo: responseContacts.pageNo,
                pageSize: responseContacts.pageSize,
                totalElements: responseContacts.totalElements,
                totalPages: responseContacts.totalPages,
                last: responseContacts.last
            });
        } catch (e) {
            console.log("Unable to fetch concerts");
            console.log(e);
        }

        try {
            await addInstrumentsToState(await getInstrumentsInitialRequest(token));
        } catch (e) {
            console.log("Unable to fetch instruments");
            console.log(e);
        }

        try {
            const responseMusicians = await getMusiciansInitialRequest(token);
            await addMusiciansToState(responseMusicians.content);
            await addMusiciansPaginationToState({
                pageNo: responseMusicians.pageNo,
                pageSize: responseMusicians.pageSize,
                totalElements: responseMusicians.totalElements,
                totalPages: responseMusicians.totalPages,
                last: responseMusicians.last
            });
        } catch (e) {
            console.log("Unable to fetch instruments");
            console.log(e);
        }

        try {
            const responseSongs = await getMusiciansInitialRequest(token);
            await addSongsToState(responseSongs.content);
            await addSongsPagination({
                pageNo: responseSongs.pageNo,
                pageSize: responseSongs.pageSize,
                totalElements: responseSongs.totalElements,
                totalPages: responseSongs.totalPages,
                last: responseSongs.last
            });
        } catch (e) {
            console.log("Unable to fetch songs");
            console.log(e);
        }

        try {
            const responseTasks = await getTasksInitialRequest(token);
            await addTasksToState(responseTasks.content);
            await addTaskPagination({
                pageNo: responseTasks.pageNo,
                pageSize: responseTasks.pageSize,
                totalElements: responseTasks.totalElements,
                totalPages: responseTasks.totalPages,
                last: responseTasks.last
            });
        } catch (e) {
            console.log("Unable to fetch instruments");
            console.log(e);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const credentials = {
            "email": email,
            "password": password
        }
        const response = await logIn(credentials);
        if (response.token) {
            const token = "Bearer ".concat(response.token);
            addTokenToState(token);
            await fetchInitialData(token);
            navigate("/")
        } else {
            setErrorHidden(!errorHidden)
        }
    };

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{minHeight: '100vh'}}
        >
            <Paper elevation={10} style={paperStyle}>
                <Typography variant={"h6"} color={"primary"} align={"center"} gutterBottom>
                    Witaj w artAgencyApp
                </Typography>
                <form noValidate autoComplete={"off"} onSubmit={handleSubmit}>
                    <List>
                        <ListItem><TextField label={"email"} onChange={handleEmailChange}/></ListItem>
                        <ListItem><TextField label={"hasło"} type={"password"}
                                             onChange={handlePasswordChange}/></ListItem>
                        <ListItem><Button variant={"contained"} endIcon={<LoginIcon/>} type={"submit"} fullWidth>Zaloguj
                            się</Button></ListItem>
                    </List>
                </form>
                <Typography paddingLeft={"15px"} color={"error"} hidden={errorHidden}>
                    Odmowa autoryzacji!
                </Typography>
            </Paper>
        </Grid>
    )
}