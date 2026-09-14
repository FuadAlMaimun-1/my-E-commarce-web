
import { Link } from 'react-router-dom';
import { House, ShoppingCart  } from 'lucide-react';


const Nav = () => {
  return (
    <div>
      <header className='sticky top-0 bg-gray-950/95 backdrop:backdrop-blur-md text-white shadow-2xl shadow-gray-950/70 border-b border-orange-900'>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to={'/'}>
          <div className='flex items-center space-x-3'>
              <House className='w-8 h-8 text-orange-400 drop-shadow-lg' />
              <h1 className='   text-4xl font-extrabold tracking-widest uppercase'>DEVICE <span className='text-orange-400'>STORE</span>
              </h1>
          </div>
          </Link>
          <nav className='flex items-center space-x-6'>
            <Link to={'/cart'} className='relative p-3 bg-amber-500/10 hove:bg-orange-500/20 transition:duration-200 border rounded-xl border-orange-400/50 cursor-pointer'>
            <ShoppingCart className='w-6 h-6 text-orange-400' />
            </Link>
          </nav>
        </div>
      </header>
    </div>
  )
}

export default Nav