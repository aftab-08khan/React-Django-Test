import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Teachers from "./pages/Teachers";
import DashboardLayout from "./layouts/DashbaordLayout";
import Home from "./pages/Home";
import SingleDetails from "./pages/SingleDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />

          <Route path=":id" element={<SingleDetails />} />

          <Route path="teachers" element={<Teachers />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;