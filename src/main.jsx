import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import Dashboard from './components/pages/Dashboard/Dashboard.jsx';
import Home from './components/pages/Home/Home.jsx';
import NotFound from './components/shared/NotFound.jsx';
import MessageProvider from './context/MessageContext.jsx';
import DataProvider from './context/DataProvider.jsx';
import About from './components/pages/About/About.jsx';
import Qualification from './components/pages/Qualification/Qualification.jsx';
import Skill from './components/pages/Skills/Skill.jsx';
import Project from './components/pages/Projects/Project.jsx';
import Service from './components/pages/Service/Service.jsx';
import Achievement from './components/pages/Achievement/Achievement.jsx';
import Contact from './components/pages/Contact/Contact.jsx';
import ContactOther from './components/pages/Contact/ContactOther.jsx';
import NewsLetter from './components/pages/Contact/NewsLetter.jsx';
import Login from './components/auth/Login.jsx';
import UpdateDataProvider from './context/UpdateDataProvider.jsx';
import DeleteProvider from './context/DeleteProvider.jsx';
import PostDataProvider from './context/PostDataProvider.jsx';
import PublicRoute from './utils/PublicRoute.jsx';
import PrivateRoute from './utils/PrivateRoute.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, path: '/', element: <PrivateRoute><Dashboard /></PrivateRoute> },
      { path: '/home', element: <PrivateRoute><Home /></PrivateRoute> },
      { path: '/about', element: <PrivateRoute><About /></PrivateRoute> },
      { path: '/qualification', element: <PrivateRoute><Qualification /></PrivateRoute> },
      { path: '/skill', element: <PrivateRoute><Skill /></PrivateRoute> },
      { path: '/project', element: <PrivateRoute><Project /></PrivateRoute> },
      { path: '/service', element: <PrivateRoute><Service /></PrivateRoute> },
      { path: '/achievement', element: <PrivateRoute><Achievement /></PrivateRoute> },
      { path: '/contact', element: <PrivateRoute><Contact /></PrivateRoute> },
      { path: '/contact/other', element: <PrivateRoute><ContactOther /></PrivateRoute> },
      { path: '/newsletter', element: <PrivateRoute><NewsLetter /></PrivateRoute> },

      { path: '/admin/login', element: <PublicRoute><Login /></PublicRoute> },
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MessageProvider>
      <DataProvider>
        <PostDataProvider>
          <UpdateDataProvider>
            <DeleteProvider>
              <RouterProvider router={router}>
              </RouterProvider>
            </DeleteProvider>
          </UpdateDataProvider>
        </PostDataProvider>
      </DataProvider>
    </MessageProvider>
  </StrictMode>,
);
