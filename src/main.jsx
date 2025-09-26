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

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, path: '/', element: <Dashboard /> },
      { path: '/home', element: <Home /> },
      { path: '/about', element: <About /> },
      { path: '/qualification', element: <Qualification /> },
      { path: '/skill', element: <Skill /> },
      { path: '/project', element: <Project /> },
      { path: '/service', element: <Service /> },
      { path: '/achievement', element: <Achievement /> },
      { path: '/contact', element: <Contact /> },
      { path: '/contact/other', element: <ContactOther /> },
      { path: '/newsletter', element: <NewsLetter /> },


      { path: '/admin/login', element: <Login /> },
    ]
  }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MessageProvider>
      <DataProvider>
        <UpdateDataProvider>
          <RouterProvider router={router}>
          </RouterProvider>
        </UpdateDataProvider>
      </DataProvider>
    </MessageProvider>
  </StrictMode>,
);
