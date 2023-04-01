import { Button, Typography } from '@mui/material';
import { useCallback, useMemo, useState } from 'react';
import './App.css';
import useAwaitableComponent from './components/useAwaitableComponent';
import UserInfoInputDialog from './components/UserInfoInputDialog';

function App() {
  const [status, execute, resolve, reject] = useAwaitableComponent<string | undefined>()
  const open = useMemo(() => status === 'awaiting', [status])
  const [userNames, setUserNames] = useState<string[]>([])

  const handleAddUserClicked = useCallback(async () => {
    await execute().then(userName => {
      if (userName){
        setUserNames([...userNames, userName])
      }
    }).catch(error => {})
  }, [open, userNames])

  return (
    <div>
      <div>
        Testing Refs
      </div>
      {
        userNames.map((userName, index) => (
          <Typography key={`${userName}-${index}`}>{userName}</Typography>
        ))
      }
      <Button onClick={handleAddUserClicked}>Add User</Button>

      <UserInfoInputDialog open={open} onConfirm={resolve} onCancel={reject}/>
    </div>
  );
}

export default App;
