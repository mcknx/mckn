import React from 'react'
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa'
import { FaRegThumbsUp, FaRegComment, FaRegShareSquare } from 'react-icons/fa'

export default function App() {
  return (
    <div className="bg-slate-100 h-screen flex items-center justify-center">
      <div className="card-background bg-white h-[500px] w-[400px] rounded-2xl shadow-lg flex flex-col items-center relative">
        <img
          className="card-img mt-10 h-32 rounded-full bg-blue-500 p-1 z-10"
          src="https://picsum.photos/200"
          alt="Random Image from Picsum"
        />
        <div className="card-img-bg bg-blue-500 h-[130px] w-full absolute rounded-t-2xl z-0" />

        {/* texts */}
        <div>
          <h1 className="text-3xl mt-5 font-semibold">CodingLab</h1>
          <p className="text-lg font-semibold">YouTuber & Blogger</p>
        </div>

        {/* icons */}
        <div className="mt-5 flex justify-center space-x-4">
          <a
            href="https://www.facebook.com"
            className="bg-blue-600 rounded-full w-10 h-10 flex items-center justify-center"
          >
            <FaFacebookF className="text-white" />
          </a>
          <a
            href="https://www.twitter.com"
            className="bg-blue-400 rounded-full w-10 h-10 flex items-center justify-center"
          >
            <FaTwitter className="text-white" />
          </a>
          <a
            href="https://www.instagram.com"
            className="bg-pink-600 rounded-full w-10 h-10 flex items-center justify-center"
          >
            <FaInstagram className="text-white" />
          </a>
          <a
            href="https://www.youtube.com"
            className="bg-red-600 rounded-full w-10 h-10 flex items-center justify-center"
          >
            <FaYoutube className="text-white" />
          </a>
        </div>

        {/* buttons */}
        <div className="flex space-x-5 mt-10">
          <button className="rounded-3xl px-7 py-2 bg-blue-500 text-white">
            Subscribe
          </button>
          <button className="rounded-3xl px-7 py-2 bg-blue-500 text-white">
            Message
          </button>
        </div>

        {/* social media action buttons */}
        <div className="mt-10 flex justify-center space-x-10 ">
          <div className="flex items-center space-x-2">
            <FaRegThumbsUp className="w-4 h-4" />
            <span>60k</span>
          </div>

          <div className="flex items-center space-x-2">
            <FaRegComment className="w-4 h-4" />
            <span>20k</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaRegShareSquare className="w-4 h-4" />
            <span>12k</span>
          </div>
        </div>
      </div>
    </div>
  )
}
