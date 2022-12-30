import { createTheme } from "@mui/material";
import { blue, deepPurple, indigo, purple } from "@mui/material/colors";

export const theme = createTheme({
    palette: {
        primary: {
            main: indigo[900]
        },
    },
    typography: {
        allVariants: {
          fontFamily: 'Poppins, sans-serif',
          textTransform: 'none',
          fontSize: 14,
          fontWeight: 400,
        },
      },
    components: {
        MuiTableCell: {
            defaultProps: {
                sx: {
                    color: indigo[900],
                }
            }
        },
        MuiButton: {
            defaultProps: {
                sx: {
                    fontSize: 16,
                }
            }
        }
    },
})