import Button from '@mui/material/Button'
import { TextField, ButtonGroup} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export const Username = ({onChange, onSubmit, prev, user}) => {
    return (
        <form onSubmit={ (e)=> onSubmit(e, 'next')}>
            <TextField
            required
            variant="filled"
            color="light"
            label="Username"
            size="small"
            name="username"
            value={user.username}
            onChange={onChange}
            inputProps={{
                inputMode: 'text',  
            }}
            />
            <div style={{display:'flex'}}>
                <Button
                size="large"
                variant="contained"
                onClick={prev}
                color="secondary"
                startIcon={<ArrowBackIosNewIcon/>}
                >
                    Back 
                </Button>

                <Button
                size="large"
                variant="contained"
                type="submit"
                color="secondary"
                endIcon={<NavigateNextIcon/>}
                >
                    Next 
                </Button>
            </div>
        </form>      
    )
}