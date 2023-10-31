import React, {useState} from "react";
import {Button, Grid, List, ListItem, Paper, TextField, Typography} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import {register} from "../../api/auth";
import {useNavigate} from "react-router-dom";

const Register = () => {
    const paperStyle = {padding: 20, display: "box"};
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }
    const handleSubmit = () => {
        register({email: email, password: password});
        navigate("/login");
    }

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
                    Zarejestruj się!
                </Typography>
                <form noValidate autoComplete={"off"} onSubmit={handleSubmit}>
                    <List>
                        <ListItem><TextField label={"email"} onChange={handleEmailChange} fullWidth/></ListItem>
                        <ListItem><TextField label={"hasło"} type={"password"}
                                             onChange={handlePasswordChange} fullWidth/></ListItem>
                        <ListItem><Button variant={"contained"} endIcon={<LoginIcon/>} type={"submit"} fullWidth>
                            Zarejestruj się!
                        </Button></ListItem>
                    </List>
                </form>
                <Typography paddingLeft={"15px"} color={"error"}>
                    Pierwszy zarejestrowany użytkownik będzie miał uprawnienia admina. Pozostali - usera.
                </Typography>
            </Paper>
        </Grid>
    )
}

export default Register