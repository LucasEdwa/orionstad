import { Outlet } from "react-router";
import {Navbar} from "../components/navbar";
import { Footer } from "../components/footer";
export const Layout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}