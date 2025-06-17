
// // newsfrontend/src/components/Header.jsx
// const Header = ({ language, setLanguage }) => {
//   return (
//     <header className="bg-white">
//       {/* Country navigation */}
//       <div className="border-b border-gray-300">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-center space-x-8 py-2">
//             <span className="text-sm text-gray-700 hover:text-black cursor-pointer font-medium">Diaspora</span>
//             <span className="text-sm text-gray-700 hover:text-black cursor-pointer font-medium">Africa</span>
//             <span className="text-sm font-bold text-black cursor-pointer border-b-2 border-blue-600">Kenya</span>
//             <span className="text-sm text-gray-700 hover:text-black cursor-pointer font-medium">Uganda</span>
//             <span className="text-sm text-gray-700 hover:text-black cursor-pointer font-medium">Tanzania</span>
//           </div>
//         </div>
//       </div>

//       {/* Top navigation bar */}
//       <div className="border-b border-gray-300">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center py-2">
//             {/* Left side - Menu and ePaper */}
//             <div className="flex items-center space-x-4">
//               {/* Hamburger menu */}
//               <button className="p-1 hover:bg-gray-100 rounded">
//                 <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//                 </svg>
//               </button>
//               <span className="text-sm text-gray-700 font-medium">ePaper | Buriani</span>
//             </div>

//             {/* Center - Logo */}
//             <div className="flex-1 flex justify-center">
//               <img 
//                 src="https://nation.africa/resource/crblob/5006890/1a8f8a473903060ef417dad0ba7701ac/dn-logo-svg-data.svg" 
//                 alt="Daily Nation" 
//                 className="h-12"
//               />
//             </div>

//             {/* Right side - Search and User */}
//             <div className="flex items-center space-x-4">
//               <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded">
//                 <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                 </svg>
//                 <span className="text-sm font-medium text-gray-800">Search</span>
//               </div>
//               <span className="text-sm font-medium text-gray-800">Lewis Momanyi</span>
//               <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700">
//                 <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
//                 </svg>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main navigation */}
//       <div className="border-b border-gray-300">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between py-3">
            
//             {/* Language selection - integrated into the header */}
//             <div className="flex items-center space-x-2">
//               <button 
//                 onClick={() => setLanguage('original')}
//                 className={`px-3 py-1.5 text-sm rounded-md flex items-center font-medium ${
//                   language === 'original' 
//                  }`}
//               >
//                 <img 
//                   src="https://flagcdn.com/w20/ke.png" 
//                   alt="Kenya Flag" 
//                   className="h-4 w-auto mr-2"
//                 />
                
//               </button>
//               <button 
//                 onClick={() => setLanguage('so')}
//                 className={`px-3 py-1.5 text-sm rounded-md flex items-center font-medium ${
//                   language === 'so' 
//                  }`}
//               >
//                 <img 
//                   src="https://flagcdn.com/w20/so.png" 
//                   alt="Somalia Flag" 
//                   className="h-4 w-auto mr-2"
//                 />
                
//               </button>
//             </div>

//             {/* Navigation links */}
//             <nav className="flex space-x-6">
//               <a href="#" className="text-sm font-bold text-black hover:text-black hover:underline transition-all">NEWS</a>
//               <a href="#" className="text-sm font-bold text-black hover:text-black hover:underline transition-all">COUNTIES</a>
//               <a href="#" className="text-sm font-bold text-black hover:text-black hover:underline transition-all">BUSINESS</a>
//               <a href="#" className="text-sm font-bold text-black hover:text-black hover:underline transition-all">OPINION</a>
//               <a href="#" className="text-sm font-bold text-black hover:text-black hover:underline transition-all">SPORTS</a>
//               <a href="#" className="text-sm font-bold text-black hover:text-black hover:underline transition-all">LIFE & STYLE</a>
//               <a href="#" className="text-sm font-bold text-black hover:text-black hover:underline transition-all">HEALTH</a>
//               <a href="#" className="text-sm font-bold text-black hover:text-black hover:underline transition-all">PODCASTS</a>
//               <a href="#" className="text-sm font-bold text-black hover:text-black hover:underline transition-all">PHOTOS</a>
//               <a href="#" className="text-sm font-bold text-black hover:text-black hover:underline transition-all">NEWSLETTERS</a>
//               <a href="#" className="text-sm font-bold text-black hover:text-black hover:underline transition-all flex items-center">
//                 <span className="mr-1 text-blue-600">•••</span>
//                 More
//               </a>
//             </nav>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

// newsfrontend/src/components/Header.jsx
const Header = ({ language, setLanguage }) => {
  return (
    <header className="bg-white">
      {/* Country navigation */}
      <div className="border-b border-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-8 py-2">
            <span className="text-sm text-gray-700 hover:text-black cursor-pointer font-medium">Diaspora</span>
            <span className="text-sm text-gray-700 hover:text-black cursor-pointer font-medium">Africa</span>
            <span className="text-sm font-bold text-black cursor-pointer border-b-2 border-blue-600">Kenya</span>
            <span className="text-sm text-gray-700 hover:text-black cursor-pointer font-medium">Uganda</span>
            <span className="text-sm text-gray-700 hover:text-black cursor-pointer font-medium">Tanzania</span>
          </div>
        </div>
      </div>

      {/* Top navigation bar */}
      <div className="relative pb-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Left side - Menu and ePaper */}
            <div className="flex items-center space-x-4">
              {/* Hamburger menu */}
              <button className="p-1 hover:bg-gray-100 rounded">
                <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <span className="text-sm text-gray-700 font-medium">ePaper | Buriani</span>
            </div>

            {/* Center - Logo */}
            <div className="flex-1 flex justify-center">
              <img 
                src="https://nation.africa/resource/crblob/5006890/1a8f8a473903060ef417dad0ba7701ac/dn-logo-svg-data.svg" 
                alt="Daily Nation" 
                className="h-15"
              />
            </div>

            {/* Right side - Search and User */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded">
                <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="text-sm font-medium text-gray-800">Search</span>
              </div>
              <span className="text-sm font-medium text-gray-800">Lewis Momanyi</span>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        {/* Custom bottom borders */}
        <div className="absolute bottom-0 left-0 right-0">
             {/* First black border (2px) */}
             <div className="h-[1px] bg-black"></div> {/* h-0.5 = 2px */}
             <div className="h-1 bg-transparent"></div> {/* 3px gap */}

             {/* Second black border (2px) */}
             <div className="h-[1px] bg-black"></div>
             <div className="h-1 bg-transparent"></div> {/* 3px gap */}

             {/* Third black border (2px) */}
             <div className="h-[1px] bg-black"></div>
             <div className="h-1 bg-transparent"></div> {/* 3px gap */}

             {/* Sky blue border (3px) */}
             <div className="h-[2px] bg-sky-700"></div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="border-b border-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3">
            
            {/* Language selection - integrated into the header */}
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setLanguage('original')}
                className={`px-3 py-1.5 text-sm rounded-md flex items-center font-medium ${
                  language === 'original' 
                 }`}
              >
                <img 
                  src="https://flagcdn.com/w20/ke.png" 
                  alt="Kenya Flag" 
                  className="h-4 w-auto mr-2"
                />
                
              </button>
              <button 
                onClick={() => setLanguage('so')}
                className={`px-3 py-1.5 text-sm rounded-md flex items-center font-medium ${
                  language === 'so' 
                 }`}
              >
                <img 
                  src="https://flagcdn.com/w20/so.png" 
                  alt="Somalia Flag" 
                  className="h-4 w-auto mr-2"
                />
                
              </button>
            </div>

            {/* Navigation links */}
            <nav className="flex space-x-6">
              <a href="#" className="text-sm font-bold text-black hover:text-black hover:underline transition-all">NEWS</a>
              <a href="#" className="text-sm font-bold text-black hover:text-black hover:underline transition-all">COUNTIES</a>
              <a href="#" className="text-sm font-bold text-black hover:text-black hover:underline transition-all">BUSINESS</a>
              <a href="#" className="text-sm font-bold text-black hover:text-black hover:underline transition-all">OPINION</a>
              <a href="#" className="text-sm font-bold text-black hover:text-black hover:underline transition-all">SPORTS</a>
              <a href="#" className="text-sm font-bold text-black hover:text-black hover:underline transition-all">LIFE & STYLE</a>
              <a href="#" className="text-sm font-bold text-black hover:text-black hover:underline transition-all">HEALTH</a>
              <a href="#" className="text-sm font-bold text-black hover:text-black hover:underline transition-all">PODCASTS</a>
              <a href="#" className="text-sm font-bold text-black hover:text-black hover:underline transition-all">PHOTOS</a>
              <a href="#" className="text-sm font-bold text-black hover:text-black hover:underline transition-all">NEWSLETTERS</a>
              <a href="#" className="text-sm font-bold text-black hover:text-black hover:underline transition-all flex items-center">
                <span className="mr-1 text-blue-600">•••</span>
                More
              </a>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;