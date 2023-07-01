import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import { StockOverviewPage } from "./pages/StockOverviewPage";
import { StockDetailPage } from "./pages/StockDetailPage";


function App() {
  return (
    <main className="container"> 
      {/* <WatchListContextProvider> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element=
            {<StockOverviewPage />} />
          
          <Route path="/detail/:symbol" element={
            <StockDetailPage />} />
        </Routes>
        </BrowserRouter>
      
    </main>
  );
}


export default App;
{/* <h2>some text</h2> */}
