import { styled } from '@mui/material/styles'

export const MusicStyle= styled('div')`
    height: 80vh;
    .Header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 30px;
    }

    .MuiGrid-root {
        .MuiGrid-item {
            display: flex;
            justify-content: center;
            .MusicCard {
                width: 80%;
                border: 1px solid #ccc;
                border-radius: 8px;
                &__Header {
                    display: flex;
                    justify-content: space-around;
                    .MuiSvgIcon-root {
                        cursor: pointer;
                        padding: 6px;
                    }
                }
                &__Content {
                    height: 160px;
                    border-top: 1px solid #ccc;
                    iframe {
                        width: 100%;
                        height: 100%;
                    }
                }
                &__Footer {
                    border-top: 1px solid #ccc;
                    text-align: center;
                    padding: 6px;
                }
            }
        }
    }
`