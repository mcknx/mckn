import logo from 'assets/images/logo.webp'

function Navbar() {
  return (
    <nav className="p-3 my-auto lg:mx-auto max-w-3xl bg-gray-100 rounded-2xl border-4 border-gray-700 sm:p-9 md:p-16 mt-2 mx-2 lg:mt-6 print:border-0 page print:max-w-letter print:max-h-letter print:mx-0 print:my-o xsm:p-8 print:bg-white md:max-w-letter md:h-5 lg:h-5 flex justify-between items-center">
      <a href="#home" className="logo">
        <img src={logo} alt="Logo" className="h-28 w-auto cover" />
      </a>
      <div className="navigation space-x-16 text-xl">
        <a href="/" className="hover:text-gray-700">
          Home
        </a>
        <a href="projects" className="hover:text-gray-700">
          Portfolio Projects
        </a>
      </div>
    </nav>
  )
}

export default Navbar
