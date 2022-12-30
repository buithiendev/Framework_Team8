import { createTheme } from "@mui/material";
import { blue } from "@mui/material/colors";

export const theme = createTheme({
    palette: {
        primary: blue,
    },
    typography: {
        allVariants: {
          fontFamily: 'Poppins, sans-serif',
          textTransform: 'none',
          fontSize: 14,
        },
      },
    components: {
        MuiTableCell: {
            defaultProps: {
                sx: {
                    color: blue,
                }
            }
        }
    },
})