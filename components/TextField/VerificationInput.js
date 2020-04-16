import { Button, Form, FormGroup, Label, Input, FormText, FormFeedback, Badge, Row, Col } from "reactstrap"
import { InputGroup, InputGroupAddon, InputGroupText } from "reactstrap"
import ErrorMessageForm from "./ErrorMessageForm"
const VerificationInput = ({ verification, triggerValidation, error, name, register, type, placeholder }) => {
  return (
    verification && (
      <FormGroup>
        <Row>
          <Col xs="7">
            <Label for={name}>{name}</Label>
          </Col>
          <Col xs="2">
            <Button
              size="sm"
              color="primary"
              onClick={async () => {
                const result = await triggerValidation(name)
                if (result === false) {
                  return
                }

                verification.check()
              }}
            >
              verify
            </Button>
          </Col>
        </Row>

        <InputGroup>
          <Input type={type} id={name} name={name} innerRef={register} placeholder={placeholder} invalid={Boolean(error)} />
          {!error && verification.isVerified !== null && (
            <InputGroupAddon addonType="append">
              <InputGroupText>
                <VerificationBadge isVerified={verification.isVerified} />
              </InputGroupText>
            </InputGroupAddon>
          )}
          {error && <ErrorMessageForm error={error} />}
        </InputGroup>
      </FormGroup>
    )
  )
}

const VerificationBadge = ({ isVerified }) => {
  if (isVerified === true) {
    return <Badge color="success">verified</Badge>
  } else {
    return <Badge color="danger">already exist</Badge>
  }
}
export default VerificationInput
