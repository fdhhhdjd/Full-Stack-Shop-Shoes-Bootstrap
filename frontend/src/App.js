import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import RoutesDataUser from "./v1/router/index";
import {
  Loading_Pages_Users,
  ScrollTop,
} from "./v1/user_ui/imports/General_Global_Import";
import { Header, NotFound } from "./v1/user_ui/imports/Page_Layout_Main_Import";
function App() {
  return (
    <React.Fragment>
      <Suspense fallback={<Loading_Pages_Users />}>
        <ToastContainer position="top-center" />
        <ScrollTop />
        <Header />
        <Routes>
          {/* User */}
          {RoutesDataUser.map((item, key) => {
            return (
              <React.Fragment key={key}>
                {item.private === null ? (
                  <Route path={`/${item.path}`} element={item.main} />
                ) : (
                  <Route element={item.private}>
                    <Route path={`/${item.path}`} element={item.main} />
                  </Route>
                )}
              </React.Fragment>
            );
          })}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </React.Fragment>
  );
}

export default App;
