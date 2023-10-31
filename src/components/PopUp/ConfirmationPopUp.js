import React from "react"
import {Button, ButtonGroup, Dialog, Grid, Typography} from "@mui/material";

const ConfirmationPopUp = ({confirm, close, open}) => {
    return (
        <Dialog open={open}  PaperProps={{
            style: {
                padding: 1
            }
        }}>
            <Grid padding={3}>
                <Typography>Czy na pewno?</Typography>
                <ButtonGroup>
                    <Button onClick={confirm}>Tak</Button>
                    <Button onClick={close}>Zamknij</Button>
                </ButtonGroup>
            </Grid>
        </Dialog>
    )
}

export default ConfirmationPopUp