import { styled } from '@mui/material/styles'

export const ButtonStyle = styled('button')`
    background-color: white;
    color: black;
    border: 2px solid #085997;
    border-radius: 32px;
    padding: 8px 28px;
    font-size: 18px;
    cursor: pointer;
    transition: 0.5s ease;
    box-shadow: inset 0px 0px 0px 0px #085997, inset 0px 0px 0px 0px #EE2C49;
    &:hover {
        color: white;
        background-color: #085997;
        box-shadow: inset 6px 5px 27px 22px #085997, inset 1px 0px 0px 0px #085997, rgba(0, 0, 0, 0.35) 0px 5px 15px;
        transform: translateY(-2px);
    }
`