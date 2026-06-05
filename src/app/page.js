


import Add from "./Component/Add";
import { ToastContainer } from 'react-toastify';

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen">


      <Add />
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}
