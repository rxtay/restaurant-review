import {createTheme} from '@mui/material/styles'

export const Theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
          main: "#202020",
        },
        secondary: {
            main: "#343434"
        },
        light: {
            main:"#FFFFFF",
        },
        grey: {
            main: "#4D4D4D"
        }
    },
    typography: {
        fontFamily: "Poppins"
    },
    shape: {
        borderRadius: 0,
    }
    
});