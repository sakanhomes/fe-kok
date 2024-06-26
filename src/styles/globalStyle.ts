// globalStyles.js
import { mediaQuery } from '@/utils/mediaQuery'
import { rgba } from 'emotion-rgba'
import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
html {
  width: 100%;
}

body {
  width: 100%;
  padding-right: 0px !important;
  font-family: 'Poppins';
}

p, h1, h2, h3, h4, h5, h6 {
  margin: 0;
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

div {
  line-height: 1;
}

br {
  line-height: 1.5;
}

a {
  color: inherit;
}

img {
  display: block;
  width: 100%;
}

*, *::before, *::after {
  box-sizing: border-box;
}

input,
button,
select,
label {
  outline: none;
  -webkit-tap-highlight-color: transparent;
}

label {
  cursor: pointer;
}

::-webkit-scrollbar-track {
	box-shadow: inset 0 0 6px ${({ theme }) => rgba(theme.palette.primary100, 0.3)};
	background-color: ${({ theme }) => theme.palette.secondary300};
  border-radius: 10px;
}

::-webkit-scrollbar {
  width: 5px;
  height: 5px;
	background-color: ${({ theme }) => theme.palette.accent300};
}

::-webkit-scrollbar-thumb {
	background-color: ${({ theme }) => rgba(theme.palette.accent300, 0.8)};
  border-radius: 10px;
	border: none;
}


  .Toastify__toast {
    padding: 24px 35px;
    border-radius: 19px;
    margin-bottom: 0;
    @media screen and (${mediaQuery('MD')}) {
      padding: 10px;
      border-radius: 10px;
    }
  }
  .Toastify__toast--error{
    background-color: ${({ theme }) => `${theme.palette.danger100}61`};
    color: ${({ theme }) => theme.palette.secondary100};
    font-weight: 400;
    font-size: 14px;
    line-height: 23px;
    & svg {
      stroke: ${({ theme }) => theme.palette.secondary100} !important;
    }
  }
  .Toastify__toast--success{
    background-color: ${({ theme }) => `${theme.palette.success100}40`};
    color: ${({ theme }) => theme.palette.secondary100};
    font-weight: 400;
    font-size: 14px;
    line-height: 23px;
    & svg {
      stroke: ${({ theme }) => theme.palette.secondary100} !important;
    }
  }
  .Toastify__toast-container--top-right {
    top: 5rem;
    right: 2rem;
    width: 322px;
    padding: 0;
    display: grid;
    gap: 16px;
    @media screen and (${mediaQuery('MD')}) {
      width: calc(100% - 40px);
      margin: 0 20px;
      gap: 10px;
    }
    & svg {
      position: absolute;
      top: 13px;
      right: 15px;
    }
  }
`
