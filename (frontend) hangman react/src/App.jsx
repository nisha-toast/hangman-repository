import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import './App.css'
import { Routes, Route } from 'react-router';
import { LandingPage } from './pages/LandingPage'
import { HangmanGame } from './pages/HangmanGame';
import { RootLayout } from './pages/Root';

//https://example.com/products --> /products is the path


function App() {

  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<LandingPage />}></Route>
        <Route path="/game" element={<HangmanGame />}> </Route>
      </Route>
    </Routes>
  );
};


export default App
// const router = createBrowserRouter([
//   {path: '/', 
//     element: <RootLayout />, 
//       children:[
//       {path: '/', element: <LandingPage />},
//       {path: '/game', element: <HangmanGame />}
//   ]},
// ]);

// function App() {
//   return (
//     <RouterProvider router={router} />
//   )
// }

// export default App

// <Routes>
// <Route path="/" element={<RootLayout />}>
//   <Route index element={<LandingPage />}></Route>
//   <Route path="/game" element={<HangmanGame />}> </Route>
// </Route>
// </Routes>