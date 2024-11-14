import React, { useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Login from './components/Login';
import SignUp from './components/Signup';
import NavbarLoggedIn from './components/NavbarLoggedIn';
import Form from './components/form';

function App() {
  const [isLoginVisible, setIsLoginVisible] = React.useState(false);
  const [isSignUpVisible, setIsSignUpVisible] = React.useState(false);
  const [isAddPostVisible, setIsAddPostVisible] = React.useState(false);

  useEffect(() => {
    // Page initialization logic here
    console.log('Page initialized');
  }, []);

  const handleLoginClick = () => {
    setIsLoginVisible(true);
    setIsSignUpVisible(false);
  }

  const handleClose = () => {
    setIsLoginVisible(false);
    setIsSignUpVisible(false);
    setIsAddPostVisible(false);
  }

  const handleSignUpClick = () => {
    setIsSignUpVisible(true);
    setIsLoginVisible(false);
  }

  const handleAddPost = () => {
    setIsAddPostVisible(true);
  }

  return (
    <div className="w-full min-h-screen flex flex-col">
      <Navbar onLoginClick={handleLoginClick} onSignUpClick={handleSignUpClick}/>
      {isLoginVisible && <Login onClose={handleClose}/>}
      {isSignUpVisible && <SignUp onClose={handleClose}/>}
      {/* <NavbarLoggedIn onAddPostClick={handleAddPost}/>
      {isAddPostVisible && <Form onClose={handleClose}/>} */}
      <h1 className='text-black font-bold px-32 text-4xl mt-9'>Public Blogs.</h1>
      <main className="flex-grow flex justify-center items-center py-9">
        <div className='border border-black w-10/12 flex flex-col gap-3 justify-center items-center rounded-xl py-10'>
            <div className='bg-pink-500 text-white w-11/12 p-5  h-40 flex justify-center items-center text-xxl font-bold rounded-lg'>Blog 1</div>
            <div className='bg-pink-500 text-white w-11/12 p-5 h-40 flex justify-center items-center text-xxl font-bold rounded-lg'>Blog 2</div>
            <div className='bg-pink-500 text-white w-11/12 p-5 h-40 flex justify-center items-center text-xxl font-bold rounded-lg'>Blog 3</div>
            <div className='bg-pink-500 text-white w-11/12 p-5 h-40 flex justify-center items-center text-xxl font-bold rounded-lg'>Blog 4</div>
            <div className='bg-pink-500 text-white w-11/12 p-5 h-40 flex justify-center items-center text-xxl font-bold rounded-lg'>...</div>
        </div>
      </main>
    </div>
  );
}

export default App;