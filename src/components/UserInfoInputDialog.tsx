import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material"
import { useCallback, useRef } from "react"

type UserInfoInputDialogProps = {
    open: boolean,
    onConfirm: (value: string | undefined) => void,
    onCancel: (error: any) => void
}

const UserInfoInputDialog = (props: UserInfoInputDialogProps) => {
    const userName = useRef<string | undefined>(undefined)

    const handleConfirmClicked = useCallback(() => {
      const selectedUserName = userName.current
      userName.current = undefined
      return props.onConfirm(selectedUserName)
    }, [props])

    const handleCancelClicked = useCallback(() => {
      userName.current = undefined
      return props.onCancel('No user was added.')
    }, [props])

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
          <Button onClick={handleCancelClicked}>Cancel</Button>
          <Button onClick={handleConfirmClicked}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    )
}

export default UserInfoInputDialog