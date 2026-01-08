import {
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom';
import Home from './pages/Home';
import Posts from './pages/Posts';
import { ShoppingCart } from './pages/ShoppingCart';
import RelayExample from './pages/RelayExample';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/posts" element={<Posts />} />
                <Route path="/shopping-cart" element={<ShoppingCart />} />
                <Route path="/relay-example" element={<RelayExample />} />
            </Routes>
        </Router>
    );
};

export default App;
