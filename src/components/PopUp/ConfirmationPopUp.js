import React from "react"
import {Button, ButtonGroup, Grid, Typography} from "@mui/material";

const ConfirmationPopUp = ({confirm, close}) => {

    return (

        <Grid padding={3} >
            <Typography>Czy na pewno?</Typography>
            <ButtonGroup>
                <Button onClick={confirm}>Tak</Button>
                <Button onClick={close}>Zamknij</Button>
            </ButtonGroup>
        </Grid>

    )
}

export default ConfirmationPopUp