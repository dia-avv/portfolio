import { Routes, Route } from "react-router-dom";
import Cover from "./components/Cover";
import Grid from "./components/Grid";
import AboutMe from "./pages/AboutMe";
import SudokuGame from "./pages/SudokuGame";
import Footer from "./components/Footer";
import MyWork from "./pages/MyWork";
import Layout from "./components/Layout";

export default function App() {
  return (
    <Layout>
      <div className="relative w-full min-h-screen overflow-x-hidden flex flex-col">
        {/* Main content */}
        <div className="flex-1">
          <Routes>
            {/* Home (Cover + Grid together) */}
            <Route
              path="/"
              element={
                <>
                  <Cover />
                  <Grid />
                </>
              }
            />

            {/* Other pages */}
            <Route path="/aboutme" element={<AboutMe />} />
            <Route path="/mywork" element={<MyWork />} />
            <Route path="/sudoku" element={<SudokuGame />} />
          </Routes>
        </div>

        {/* Footer stays on all pages */}
        <Footer />
      </div>
    </Layout>
  );
}
