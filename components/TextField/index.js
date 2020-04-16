import { Button, Form, FormGroup, Label, Input, FormText, FormFeedback, Badge } from "reactstrap"
import { InputGroup, InputGroupAddon, InputGroupText } from "reactstrap"
import VerificationInput from "./VerificationInput"
import ErrorMessageForm from "./ErrorMessageForm"

const TextField = ({ placeholder = "", name = "", type = "text", register, error }) => {
  return (
    <FormGroup>
      <Label for={name}>{name}</Label>
      <Input type={type} id={name} name={name} innerRef={register} placeholder={placeholder} invalid={Boolean(error)} />
      {error && <ErrorMessageForm error={error} />}
    </FormGroup>
  )
}

export default TextField
