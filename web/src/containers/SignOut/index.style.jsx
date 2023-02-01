import { styled } from '@mui/material/styles'

export const SignOutStyle = styled('button')`
  border: 2px solid #ccc;
  border-radius: 8px;
  float: right;
  margin: 20px;
  height: 36px;
  width: 112px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
  .Bottom {
    p {
      cursor: pointer;
      color: black;
      font-size: 20px;
      text-align: center;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
`
