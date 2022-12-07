import { styled } from '@mui/material/styles'

export const TodoListStyle = styled('div')`
    height: 100%;

    .MuiSvgIcon-root {
        cursor: pointer;
    }
    .Add {
        height: 60px;
        
        .MuiSvgIcon-root {
            font-size: 40px;
            float: right;
            margin-right: 40px;
        }
    }

    .TodoTable {
        height: 100%;

        .MuiTableRow-head {
            th {
                font-size: 20px;
                font-weight: bold;
            }
        }
    }
`