import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React from 'react'

export default function CardDeleteDialog({ isDialogOpen, onDelete, onChangeDialog }) {
    return (
        <Dialog
            open={isDialogOpen}
            onClose={onChangeDialog}
            aria-labelledby='alert-sialog-title'
            aria-describedby='alert-dialog-description'
            maxWidth="xs">
            <DialogTitle />
            <DialogContent>
                <DialogContentText id="alert-dialog-descirption">
                    this opereation will completely delete the business card and all its data from the database and it will not be possible to retrieve the card afterwards
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onChangeDialog}>Cancel</Button>
                <Button onClick={onDelete}>Delete card</Button>
            </DialogActions>
        </Dialog>
    )
}
