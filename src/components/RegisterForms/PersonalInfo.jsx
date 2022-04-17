import Button from '@mui/material/Button'
import { TextField, FormControlLabel, RadioGroup, Radio, FormGroup, FormLabel, ButtonGroup} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export const PersonalInfo = ({onChange, onSubmit, user}) => {
    return (
        <form onSubmit={(e) => onSubmit(e, 'next')}>
            <TextField
            required
            variant="filled"
            color="light"
            label="First Name"
            size="small"
            name="first"
            value={user.first}
            onChange={onChange}
            inputProps={{
                inputMode: 'text',  
            }}
            />

            <TextField
            required
            variant="filled"
            color="light"
            label="Last Name"
            value={user.last}
            size="small"
            name="last"
            onChange={onChange}
            type="text"
            />

            <TextField
            required
            variant="filled"
            color="light"
            label="Mobile Number"
            value={user.number}
            size="small"
            name="number"
            onChange={onChange}
            type="text"
            inputProps={{
                pattern: "^[89]+[0-9]{7}$"
            }}
            />

            <TextField
            required
            variant="filled"
            color="light"
            label="Address"
            size="small"
            value={user.address}
            name="address"
            onChange={onChange}
            type="text"
            />
            
            <FormGroup>
                <FormLabel className="gender-label" component="legend">Gender</FormLabel>
                <RadioGroup row
                    defaultValue="male"
                    name="gender"
                    onChange={onChange}
                    value={user.gender}
                >
                <FormControlLabel 
                value="male" 
                control={<Radio color="light"/>} 
                label="Male"/>

                <FormControlLabel 
                value="female" 
                control={<Radio color="light" />} 
                label="Female"/>
                    
                </RadioGroup>
            </FormGroup>

            <ButtonGroup>
                <Button
                size="large"
                variant="contained"
                type="submit"
                color="secondary"
                endIcon={<NavigateNextIcon/>}
                >
                    Next 
                </Button>
            </ButtonGroup>
        </form>
    )
}