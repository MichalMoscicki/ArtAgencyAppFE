import React, {useState} from "react";
import {Button, Dialog, Grid, List, ListItem, Typography} from "@mui/material";
import Instruments from "../../containers/Musicians/Instruments";
import AddMusicianForm from "../../containers/Musicians/AddMusicianForm";



const Musicians = () => {

    const [instrumentsOpen, setInstrumentsOpen] = useState(false);
    const toggleInstruments = () => {
        setInstrumentsOpen(!instrumentsOpen);
    }

    const [addFormOpen, setAddFormOpen] = useState(false);
    const toggleForm = () => {
        setAddFormOpen(!addFormOpen)
    }

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            paddingTop={"5%"}
            paddingLeft={"10%"}
            paddingRight={"10%"}
            sx={{minHeight: '100vh'}}
        >
            <Typography variant={"h4"} color={"black"} gutterBottom>
                Muzycy
            </Typography>
            <List>
                <ListItem>1Janek</ListItem>
                <ListItem>2Karol</ListItem>
                <ListItem>3Amnd</ListItem>
                <ListItem>4Janek</ListItem>
                <ListItem>5Janek</ListItem>
                <ListItem>6Janek</ListItem>
                <ListItem>7Janek</ListItem>
                <ListItem>8Janek</ListItem>
                <ListItem>9Janek</ListItem>
                <ListItem>10Janek</ListItem>
            </List>
            <Button variant={"outlined"} color={"secondary"}  style={{justifyContent: "flex-start"}}
                    onClick={toggleForm}>Dodaj muzyka</Button>
            <Button variant={"outlined"} color={"secondary"}  style={{justifyContent: "flex-start"}}
                    onClick={toggleInstruments}>Instrumenty</Button>
            <Dialog open={instrumentsOpen}>
                <Instruments toggle={toggleInstruments}/>
            </Dialog>
            <Dialog open={addFormOpen}>
              <AddMusicianForm toggle={toggleForm}/>
            </Dialog>
        </Grid>
    )
}

export default Musicians