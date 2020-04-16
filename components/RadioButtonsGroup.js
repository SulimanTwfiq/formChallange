import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap"

const RadioButtonsGroup = ({ legend = "", name = "", register, optionsArray }) => {
  return (
    <FormGroup tag="fieldset">
      {legend && <legend>{legend}</legend>}
      {optionsArray.map((option) => (
        <FormGroup key={option} check>
          <Label check>
            <Input type="radio" innerRef={register} name={name} value={option} />
            {option}
          </Label>
        </FormGroup>
      ))}
    </FormGroup>
  )
}

export default RadioButtonsGroup
