import { CircularProgress } from '@mui/material'
import styled from 'styled-components'

export const Image = styled.img`
    object-fit: cover;
    height: 100%;
    width: 100%;
    border-radius: 0.25rem;
`

export const IconWrapper = styled.div`
    height: 1.5rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

export const Preview = styled.div`
    color: ${({ theme }) => theme.palette.custom.white};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1rem;
    box-sizing: border-box;
    position: relative;
    width: 4.875rem;
    border-radius: 0.25rem;
    height: 3.5rem;
    border: 0.0625rem solid ${({ theme }) => theme.palette.custom.outlineGrey};
`

export const LoadingIcon = styled(CircularProgress)`
    position: absolute;
    width: 1.5rem !important;
    height: 1.5rem !important;
    background-color: ${({ theme }) => theme.palette.custom.tertiary900}
`