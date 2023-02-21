import { useToggle } from 'react-use'
import MuiTextField from '@mui/material/TextField'
import MuiInputAdornment from '@mui/material/InputAdornment'
import MuiIconButton from '@mui/material/IconButton'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import { TextFieldProps } from '@mui/material'

export const TextInput: React.FC<TextFieldProps> = ({ error, ...props }) => {
  const [isPasswordVisible, handleChangePasswordVisability] = useToggle(false)

  let endAdornmentElement = null

  if (props.type === 'password') {
    endAdornmentElement = (
      <MuiInputAdornment position="end">
        <MuiIconButton onClick={handleChangePasswordVisability}>
          {isPasswordVisible ? <RemoveRedEyeIcon /> : <RemoveRedEyeIcon />}
        </MuiIconButton>
      </MuiInputAdornment>
    )
  }

  const fieldId = props.id || `input-${props.name}`

  return (
    <MuiTextField
      id={fieldId}
      InputProps={{
        endAdornment: endAdornmentElement,
        ...props.InputProps,
      }}
      {...props}
      type={isPasswordVisible ? 'text' : props.type}
      error={error}
    />
  )
}
