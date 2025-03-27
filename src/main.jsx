import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/header.jsx';
import Overview from './Components/Overview.jsx';
import CoinDetail from './Components/CoinDetail.jsx';

import "tailwindcss";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Overview  />} />
                <Route path="/:coinId" element={<CoinDetail />} /> {}
            </Routes>
        </Router>
    </React.StrictMode>,
);
