import { styled } from '@mui/material/styles'

export const CountdownStyle = styled('div')`
    height: 70vh;
    width: 100%;

    button {
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
    }
    .cancel {
        border: 2px solid red;
        box-shadow: inset 0px 0px 0px 0px red, inset 0px 0px 0px 0px #EE2C49;
        &:hover {
            background-color: red;
            box-shadow: inset 6px 5px 27px 22px red, inset 1px 0px 0px 0px red, rgba(0, 0, 0, 0.35) 0px 5px 15px;
        }
    }

    .BtnStop {
        color: white;
        background-color: #085997;
        box-shadow: inset 6px 5px 27px 22px #085997, inset 1px 0px 0px 0px #085997, rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }

    .Add {
        float: right;
    }
    .Content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        h2 {
            font-size: 36px;
        }

        h1 {
            font-size: 100px;
            margin: 20px 0;
        }

        .footer {
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-around;   
        }
    }

    .MuiBox-root {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .AddContent {
            margin: 40px 0;
            width: 80%;
            display: flex;
            justify-content: center;
            align-items: center;

            .MuiInputBase-root {
                width: 150px;
            }
            p {
                margin-right: 60px;
                margin-left: 8px;
            }
        }

        .footer {
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: center;
            button {
                margin: 40px;
            }
        }
    }
`