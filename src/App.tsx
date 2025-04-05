import Header from "@/components/header";
import Tab from "@/components/tab";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Tab />
      <Outlet />
    </>
  );
}

export default App;
