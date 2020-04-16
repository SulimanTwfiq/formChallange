import { FormFeedback } from "reactstrap"

const ErrorMessage = ({ error }) => {
  let { type, message = "" } = error
  if (!message) {
    switch (type) {
      case "required":
        message = "please fill input"
        break

      default:
        break
    }
  }
  return <FormFeedback>{message}</FormFeedback>
}

export default ErrorMessage
