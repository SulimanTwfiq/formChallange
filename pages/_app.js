import { useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { Context } from "../components/Context"
export default function MyApp({ Component, pageProps }) {
  const [userInformationData, setUserInformationData] = useState()
  return (
    <Context.Provider value={{ userInformationData, setUserInformationData }}>
      <Component {...pageProps} />
    </Context.Provider>
  )
}
