import { Route, Routes } from "react-router-dom";
import { useStore } from "./store";


import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectRoute from "./components/ProtectRoute";

import AuthForm from "./pages/AuthForm";
import Landing from "./pages/Landing";
import PostForm from "./pages/PostForm";
import Profile from "./pages/Profile";

function App() {
  const { state } = useStore()!;


  return (
    <>
      {state.loading && (
        <div className="loading-overlay d-flex justify-content-center align-items-center">
          <h2>Loading...</h2>
        </div>
      )}

      <Header />

      <main className="flex-fill">
        <Routes>
          <Route path="/" element={<Landing />} />


          <Route path="/signup" element={(
            <ProtectRoute>
              <AuthForm isLogin={false} />
            </ProtectRoute>
          )} />
          <Route path="/login" element={(
            <ProtectRoute>
              <AuthForm isLogin={true} />
            </ProtectRoute>
          )} />

          <Route path="/post/add" element={(
            <ProtectRoute>
              <PostForm />
            </ProtectRoute>
          )} />    

          <Route path="/profile/:username" element={(
            <ProtectRoute>
              <Profile />
            </ProtectRoute>
          )} />
        </Routes>
      </main>

      <Footer />
    </>
  )
}

export default App
