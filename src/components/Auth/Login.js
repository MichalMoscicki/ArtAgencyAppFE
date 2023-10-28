import React, {useState} from "react";
import {Typography, TextField, Button, List, Paper, Grid, ListItem} from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from "react-router-dom";
import {logIn} from "../../api/auth";

export const Login = ({addTokenToState}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorHidden, setErrorHidden] = useState(true);
    const paperStyle = {padding: 20, display:"box"};
    const navigate = useNavigate();

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const credentials = {
            "email": email,
            "password":password
        }
        const response = await logIn(credentials);
        if(response.token){
            addTokenToState(response.token)
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
                sx={{ minHeight: '100vh' }}
            >
                        <Paper elevation={10} style={paperStyle}>
                            <Typography variant={"h6"} color={"primary"} align={"center"} gutterBottom>
                                Witaj w artAgencyApp
                            </Typography>
                            <form noValidate autoComplete={"off"} onSubmit={handleSubmit}>
                                <List>
                                    <ListItem><TextField label={"email"} onChange={handleEmailChange}/></ListItem>
                                    <ListItem><TextField label={"hasło"} type={"password"} onChange={handlePasswordChange}/></ListItem>
                                    <ListItem><Button variant={"contained"} endIcon={<LoginIcon/>} type={"submit"} fullWidth>Zaloguj się</Button></ListItem>
                                </List>
                            </form>
                            <Typography paddingLeft={"15px"} color={"error"} hidden={errorHidden}>
                                 Odmowa autoryzacji!
                            </Typography>
                        </Paper>
            </Grid>
    )
}