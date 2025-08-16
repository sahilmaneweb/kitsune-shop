import React from 'react';

function Fileui() {
  return (
    <div className='size-96 my-auto flex flex-col justify-center items-center cursor-pointer bg-red-200 hover:bg-red-300 transition-all border-2 border-red-600 rounded-md border-dashed'>
      <svg className="w-8 h-8 mb-4 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
        <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
      </svg>
      <p className="mb-2 text-sm text-center text-red-900"><span className="font-semibold">Click to upload Product Image</span> <br /> or drag and drop</p>
      <p className="text-xs mb-5 text-red-700">SVG, PNG or JPG (MAX. 800x400px)</p>
    </div>
  );
};

export default Fileui;