import React, { useContext, useState, useEffect } from "react"
import { ListGroup, ListGroupItem, Container, Row, Col, Badge, Alert } from "reactstrap"
import { useRouter } from "next/router"

import { Context } from "../components/Context"

const UserInformation = () => {
  const { userInformationData } = useContext(Context)
  const router = useRouter()
  const [youAreNotRegistredYet, setYouAreNotRegistredYet] = useState(null)

  useEffect(() => {
    if (!userInformationData) {
      setYouAreNotRegistredYet(true)
      const timer = setTimeout(() => {
        router.push("/")
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [])
  return (
    <>
      {youAreNotRegistredYet && <Alert color="danger">You dont have account , you will redirected to register page ... </Alert>}
      {userInformationData && (
        <ListGroup>
          {Object.entries(userInformationData).map(([key, value]) => (
            <ListGroupItem>
              <Row>
                <Col xs="6">{key}</Col>
                <Col xs="6">
                  {value} {["Mobile", "Email"].includes(key) && <Badge color="success">verified</Badge>}
                </Col>
              </Row>
            </ListGroupItem>
          ))}
        </ListGroup>
      )}
    </>
  )
}
export default UserInformation
