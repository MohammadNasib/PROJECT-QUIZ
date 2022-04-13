import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import '../styles/App.css';
import Layout from './Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Quiz from './pages/Quiz';
import Result from './pages/Result';
import Signup from './pages/Signup';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

function App() {
    return (
        <div className='App'>
            <Router>
                <AuthProvider>
                    <Layout>
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route
                                path='/signup'
                                element={
                                    <PublicRoute>
                                        <Signup />
                                    </PublicRoute>
                                }
                            />
                            <Route
                                path='/login'
                                element={
                                    <PublicRoute>
                                        <Login />
                                    </PublicRoute>
                                }
                            />
                            <Route path='/result/:id' element={<Result />} />

                            <Route
                                path='/quiz/:id'
                                element={
                                    <PrivateRoute>
                                        <Quiz />
                                    </PrivateRoute>
                                }
                            />
                        </Routes>
                    </Layout>
                </AuthProvider>
            </Router>
        </div>
    );
}

export default App;
