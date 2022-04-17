import Button from '@mui/material/Button'
import { TextField } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import SendIcon from '@mui/icons-material/Send';

export const Password = ({onChange, onSubmit, prev, user, confirmPassword}) => {
    return (
        <form onSubmit={ (e)=> onSubmit(e, 'submit')}>
            <TextField
            required
            variant="filled"
            color="light"
            label="Confirm Password"
            size="small"
            name="confirmPassword"
            value={confirmPassword}
            onChange={onChange}
            type="password"
            />

            <TextField
            required
            variant="filled"
            color="light"
            label="Password"
            size="small"
            name="password"
            value={user.password}
            onChange={onChange}
            type="password"
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
                endIcon={<SendIcon />}
                >
                    Register 
                </Button>
            </div>
        </form>      
    )
}