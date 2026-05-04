import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Groups from "./pages/Groups";
import GroupForm from "./components/GroupForm";
import SmsBox from "./components/SmsBox";
import GroupDetails from "./components/GroupDetails";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/groups" element={<Groups />} />
      <Route path="/groupform" element={<GroupForm />} />
      {/* <Route path="/memberlist" element={< />} /> */}
      <Route path="/SmsBox" element={<SmsBox/>} />
      <Route path="/groups/:id" element={<GroupDetails />} />
      <Route path="/groups/:id/sms" element={<SmsBox />} />
    </Routes>
  </BrowserRouter>
);