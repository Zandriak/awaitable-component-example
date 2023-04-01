import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material"
import { useRef } from "react"

type UserInfoInputDialogProps = {
    open: boolean,
    onConfirm: (value: string | undefined) => void,
    onCancel: (error: any) => void
}

const UserInfoInputDialog = (props: UserInfoInputDialogProps) => {
    const userName = useRef<string | undefined>(undefined)

    return (
        <Dialog open={props.open} onClose={props.onCancel}>
        <DialogTitle>Add User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add a new user.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="User Name"
            fullWidth
            variant="standard"
            onChange={(event) => userName.current = event.target.value}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onCancel}>Cancel</Button>
          <Button onClick={() => props.onConfirm(userName.current)}>Add</Button>
        </DialogActions>
      </Dialog>
    )
}

export default UserInfoInputDialog