import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'

export const HomeStyle = styled(Box)`
    width: 100%;
    height: calc(100vh - 100px);
    border-top: 1px solid #ccc;

    .MuiTabs-root {
        width: 200px;

        .MuiButtonBase-root {
            font-size: 16px;
            font-weight: bold;
            height: 80px;
        }
    }

    .TabPanel {
        width: 100%;
    }
`