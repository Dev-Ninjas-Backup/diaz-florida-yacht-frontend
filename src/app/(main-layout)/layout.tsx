import Navbar from "@/components/shared/main/Navbar/Navbar"
import { ReactNode } from "react"

const MainLayout = ({children}:{children:ReactNode}) => {
  return (<>
   <Navbar />
   <div>{children}</div></>
   
  )
}

export default MainLayout