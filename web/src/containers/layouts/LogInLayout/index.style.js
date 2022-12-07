import { styled } from '@mui/material/styles'
import Logo from '../../../assets/images/Logo.AyIh1VuDa'

export const LogInLayoutStyle = styled('div')`
    width: 100%;
    height: 100vh;
    background-repeat: no-repeat;
    background-size: cover;
    background: linear-gradient(to right, rgba(0, 168, 255, 0.5), rgba(185, 0, 255, 0.5));
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    isolation: isolate;

    &:after {
        content: "";
        background-position: 50% 0;
        opacity: 0.5;
        position: absolute;
        inset: 0;
        z-index: -1;
    }
    .LogInBox {
        padding: 20px 32px;
        margin: 40px;
        background-color: white;
        border-radius: 32px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;

        .Logo {
           background-image: url(${Logo});
           background-repeat: no-repeat;
           background-size: cover;
           width: 160px;
           height: 120px;
        }

        .Title {
            font-size: 20px;
            font-weight: bold;
            margin-top: 8px;
        }

        .Content {
            width: 100%;
        }
    }
`