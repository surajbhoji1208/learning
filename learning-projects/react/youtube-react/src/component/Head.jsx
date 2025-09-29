import React from 'react'
import { useDispatch } from 'react-redux';
import { toggleMenu } from '../utils/AppSlice';

const Head = () => {
    const dispatch = useDispatch()
    const handelToggleMenu = ()=>{
        dispatch(toggleMenu())
    }
  return (
    <header className="flex items-center justify-between px-4 py-2 bg-white shadow-md sticky top-0 z-50">
      
      {/* Left: Menu button + YouTube logo */}
      <div className="flex items-center space-x-4">
        {/* Menu button */}
        <button className="p-2 rounded-full hover:bg-gray-200" onClick={handelToggleMenu}>
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        {/* YouTube logo */}
        <div className="flex items-center space-x-1 cursor-pointer">
          {/* Red play icon */}
          <svg
            className="w-7 h-7 text-red-600"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M10 15l5.19-3L10 9v6z" />
            <path
              fillRule="evenodd"
              d="M21.8 12c0-1.98-.16-3.6-.4-4.89-.23-1.18-1.07-2.12-2.21-2.57C17.43 4.1 15.5 4 12 4s-5.43.1-7.19.54c-1.14.45-1.98 1.39-2.21 2.57-.24 1.29-.4 2.91-.4 4.89 0 1.98.16 3.6.4 4.89.23 1.18 1.07 2.12 2.21 2.57C6.57 19.9 8.5 20 12 20s5.43-.1 7.19-.54c1.14-.45 1.98-1.39 2.21-2.57.24-1.29.4-2.91.4-4.89zM12 18c-2.12 0-3.89-.17-5.02-.5-.55-.17-.81-.49-.86-.76-.09-.61 0-1.93 0-1.93l-.01-.11c-.01-.54-.01-1.08 0-1.62v-.43c0-.36.05-.67.15-.89.11-.26.37-.46.79-.6 1.14-.4 2.88-.6 5.05-.6 2.14 0 3.9.19 5.04.59.36.14.6.34.75.61.12.2.2.54.22 1.07v.17c0 .49-.08 1.03-.22 1.54-.18.68-.58 1.23-1.22 1.56-.82.45-2.03.67-3.6.67z"
              clipRule="evenodd"
            />
          </svg>
          <span className="font-bold text-xl text-gray-900 select-none">YouTube</span>
        </div>
      </div>

      {/* Center: Search Bar */}
      <div className="flex items-center flex-grow max-w-xl mx-4">
        <input
          type="text"
          placeholder="Search"
          className="flex-grow border border-gray-300 rounded-l-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
        />
        <button className="bg-gray-100 hover:bg-gray-200 rounded-r-full px-4 py-2">
          <svg
            className="w-5 h-5 text-gray-700"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
      </div>

      {/* Right: Create, Notification, User */}
      <div className="flex items-center space-x-4">
        {/* Create button */}
        <button className="p-2 rounded-full hover:bg-gray-200" title="Create">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </button>

        {/* Notification bell */}
        <button className="p-2 rounded-full hover:bg-gray-200" title="Notifications">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        </button>

        {/* User profile (placeholder circle) */}
        <button className="w-8 h-8 rounded-full overflow-hidden bg-gray-300 hover:ring-2 hover:ring-red-600 focus:outline-none">
          <img
            src="https://avatars.dicebear.com/api/initials/JS.svg"
            alt="User Profile"
            className="w-full h-full object-cover"
          />
        </button>
      </div>
    </header>
  );
}

export default Head