import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';
import Dashboard from './pages/Dashboard';
import Clients from './pages/Clients';
import CreateInvoice from './pages/CreateInvoice';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';


// Protected Route Wrapper
const ProtectedRoute = () => {
  const { user } = useAuth();
  return user ? <Outlet /> : <Navigate to="/login" />;
};

// Layout with Navbar
const Layout = () => (
  <div className="min-h-screen bg-gray-50">
    <Navbar />
    <div className="container mx-auto p-4">
      <Outlet />
    </div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route>
            <Route element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/invoices/new" element={<CreateInvoice />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;