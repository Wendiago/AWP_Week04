import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PhotoDetailPage from "@/pages/PhotoDetailPage/PhotoDetailPage";
import PhotosPage from "@/pages/PhotosPage/PhotosPage";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/photos" />} />
          <Route path="/photos" element={<PhotosPage />}></Route>
          <Route path="/photos/:id" element={<PhotoDetailPage />}></Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
