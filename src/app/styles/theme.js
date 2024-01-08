'use client'
import { createTheme } from '@mui/material/styles'
import {
  primary100,
  primary200,
  primary500,
  primary600,
  primary800,
  primary900,
  purple800,
  purple500,
  tertiary600,
  tertiary800,
  tertiary900,
  white,
  opacityWhite,
  lightGrey,
  outlineGrey,
  modalOverlay,
  error,
  errorSecondary,
  orange,
  darkGrey,
  black,
  opacityBlack,
  alertSuccess,
} from './colours'

export default createTheme({
  palette: {
    primary: {
      main: primary900,
      light: primary100,
      p200: primary200,
      p500: primary500,
      p600: primary600,
      p800: primary800,
    },
    secondary: {
      main: purple800,
      p500: purple500,
    },
    error: {
      main: error
    },
    custom: {
      white,
      opacityWhite,
      lightGrey,
      outlineGrey,
      modalOverlay,
      error,
      orange,
      darkGrey,
      errorSecondary,
      black,
      opacityBlack,
      alertSuccess,
      tertiary900,
      tertiary800,
      tertiary600,
    }
  },
  components: {
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          position: 'absolute',
          marginTop: '3.75rem'
        }
      }
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          '&.MuiAlert-filled': {
            borderRadius: '0.75rem'
          },
          '&.MuiAlert-filledError': {
            backgroundColor: errorSecondary,
            color: white
          },
        }
      }
    },
    MuiSnackbar: {
      styleOverrides: {
        root: {
          '&.MuiSnackbar-anchorOriginTopCenter': {
            top: '3.75rem'
          }
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiSelect-select': {
            color: opacityWhite
          }
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: opacityWhite,
          '&.MuiInputLabel-shrink': {
            color: lightGrey
          },
          '&.MuiInputLabel-shrink.Mui-error': {
            color: error
          }
        }
      }
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          '&.MuiInputAdornment-positionStart .MuiTypography-root': {
            color: opacityWhite
          }
        }
      }
    },
    MuiList: {
      styleOverrides: {
        root: {
          boxShadow: '0rem 0.5rem 0.625rem rgba(0, 0, 0, 0.14), 0rem 0.1875rem 0.875rem rgba(0, 0, 0, 0.12), 0rem 0.3125rem 0.3125rem rgba(0, 0, 0, 0.2)',
          padding: '0rem',
          borderRadius: '0.25rem'
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          height: '100%',
          "& .MuiSvgIcon-root": {
            color: opacityWhite
          },
          "textarea": {
            color: opacityWhite
          },
          "input": {
            WebkitTextFillColor: `${opacityWhite} !important`,
            WebkitBackgroundClip: 'text !important',
            backgroundClip: 'text !important',
            color: opacityWhite,
            padding: '16.5px 14px',
          },
          "&.MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: outlineGrey
          },
          "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: outlineGrey
          },
          "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: outlineGrey,
          },
          "&.MuiOutlinedInput-root.Mui-error": {
            'fieldset, &:hover fieldset, .MuiOutlinedInput-notchedOutline': {
              borderColor: error
            }
          }
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          "&.MuiChip-root": {
            color: white,
            backgroundColor: outlineGrey,
            '&:hover': {
              backgroundColor: primary900
            },
          }
        }
      }
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          "&:hover": {
            filter: 'brightness(85%)',
          },
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          textTransform: 'none',
          height: '2.25rem',
          "&.MuiButton-containedPrimary.Mui-disabled": {
            color: 'white',
            opacity: 0.7,
          },
          "&:hover": {
            boxShadow: 'none',
            filter: 'brightness(85%)',
            transition: '0.3s',
          },
          "&.Mui-disabled:hover": {
            filter: 'unset',
            color: 'rgba(0, 0, 0, 0.26)',
          }
        }
      }
    }
  }
})