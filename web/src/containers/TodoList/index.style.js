import { Box } from '@mui/material';
import { styled } from '@mui/material/styles'

export const TodoListStyle = styled('div')`
    height: 100%;

    .MuiSvgIcon-root {
        cursor: pointer;
    }
    .Add {
        display: flex;
        height: 60px;
        float: right;
        
        .MuiSvgIcon-root {
            font-size: 40px;
            margin-right: 40px;
        }

        .MuiBadge-root {
            margin-right: 40px;
            vertical-align: top;
            .notice-icon {
                margin: 0;
            }
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
`;

export const StatusColor = styled('div')`
    padding: 4px;
    color: ${props => props.color} white;
    border-radius: 4px;
    background-color: ${props => props.bgColor};
`
export const DeleteModalStyle = styled(Box)`
    position: absolute;
    padding: 50px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400;
    background-color: white;
    border: 1px solid #000;
    border-radius: 12px;
    box-shadow: 24;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .title {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 20px;
    }
    .footer {
        width: 100%;
        display: flex;
        justify-content: space-around;
    }
`