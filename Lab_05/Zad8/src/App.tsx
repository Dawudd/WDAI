import './App.css'
import LicznikLocalStorage from "./components/LicznikLocalStorage.tsx";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";

import Blog from "./pages/Blog.tsx";
import Dodaj from "./pages/Dodaj.tsx";

function App() {
    return (
        <>
            <div>
                <h1>8.1</h1>
                <LicznikLocalStorage />
            </div>
        {/*<BrowserRouter>*/}
        {/*    <h1>8.2</h1>*/}
        {/*    <div>*/}
        {/*        <nav>*/}
        {/*            <ul>*/}
        {/*                <li>*/}
        {/*                    <Link to="/blog">Blog</Link>*/}
        {/*                </li>*/}
        {/*                <li>*/}
        {/*                    <Link to="/dodaj">Dodaj post</Link>*/}
        {/*                </li>*/}
        {/*            </ul>*/}
        {/*        </nav>*/}
        {/*        <Routes>*/}
        {/*            <Route path="/blog" element={<Blog />}>*/}

        {/*            </Route>*/}
        {/*            <Route path="/dodaj" element={<Dodaj />}>*/}

        {/*            </Route>*/}
        {/*        </Routes>*/}
        {/*    </div>*/}

        {/*</BrowserRouter>*/}
        </>
    );
}

export default App
