import React, { useContext, useState } from "react"
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap"
import { useForm } from "react-hook-form"
import RadioButtonsGroup from "./RadioButtonsGroup"
import TextField from "./TextField"
import VerificationInput from "./TextField/VerificationInput"
import { useRouter } from "next/router"
import { Context } from "./Context.js"
import database from "../utils/dummyData"
import { emailValidateRegex, phoneNumberValidateRegex } from "../utils/index"

const RegisterForm = () => {
  const { userInformationData, setUserInformationData } = useContext(Context)
  const { register, handleSubmit, getValues, errors, control, triggerValidation } = useForm()
  const [verificationInputsStatus, setVerificationInputsStatus] = useState({ Email: null, Mobile: null })
  const router = useRouter()

  const onSubmit = async (data) => {
    const isEmailVerified = checkVerification("emails", "Email")
    const isPhoneNumberVerified = checkVerification("phoneNumbers", "Mobile")
    if (isEmailVerified === false || isPhoneNumberVerified === false) {
      return
    }
    setUserInformationData(data)
    router.push("/UserInformation")
  }

  const checkVerification = (tableName, attributeName) => {
    const values = getValues()
    const value = values[attributeName]
    const isValueExistInDatabase = database[tableName].includes(value)
    const isVerified = isValueExistInDatabase ? false : true
    setVerificationInputsStatus((prevInputsStatus) => ({ ...prevInputsStatus, [attributeName]: isVerified }))
    return isVerified
  }
  const textInputs = [
    {
      name: "Email",
      type: "text",
      placeholder: "sulimantwfiq@gmail.com",
      register: register({
        required: true,
        pattern: {
          value: emailValidateRegex,
          message: "Email is not correct",
        },
      }),
      error: errors.Email,
      verification: {
        isVerified: verificationInputsStatus.Email,
        check: () => checkVerification("emails", "Email"),
      },
    },
    {
      name: "Mobile",
      type: "text",
      placeholder: "966544710774",
      register: register({
        required: true,
        pattern: {
          value: phoneNumberValidateRegex,
          message: "Not a valid 12-digit KSA phone number (must not include spaces or special characters)",
        },
      }),
      error: errors.Mobile,
      verification: {
        isVerified: verificationInputsStatus.Mobile,
        check: () => checkVerification("phoneNumbers", "Mobile"),
      },
    },
    { name: "Password", type: "password", register: register({ required: true }), error: errors.Password },
    { name: "Nickname", type: "text", placeholder: "suliman" },
    { name: "Name", type: "text", placeholder: "suliman twfiq" },
    { name: "Birth date", type: "text", type: "date" },
  ]

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {textInputs.map((input) =>
        input.verification ? (
          <VerificationInput
            key={input.name}
            verification={input.verification}
            placeholder={input.placeholder}
            error={input.error}
            name={input.name}
            type={input.type}
            triggerValidation={triggerValidation}
            register={input.register}
          />
        ) : (
          <TextField
            key={input.name}
            placeholder={input.placeholder}
            name={input.name}
            type={input.type}
            register={input.register || register}
            error={input.error}
          />
        )
      )}

      <RadioButtonsGroup register={register} name="gender" optionsArray={["male", "female"]} />
      <Button>Submit</Button>
    </Form>
  )
}

export default RegisterForm
