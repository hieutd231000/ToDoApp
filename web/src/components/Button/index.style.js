import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button';

export const ButtonStyle = styled(Button)`
    background-color: #207BC1;
    color: white;
    border-radius: 32px;
    padding: 8px 28px;
    font-size: 18px;
    &:hover {
        background-color: #085997;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        transform: translateY(-1px);
        transition: 0.2s ease;
    }
`