import {useEffect, useRef, useState} from 'react';
import DarkModeSwitcher from './DarkModeSwitcher';
import {Link, useNavigate} from 'react-router-dom';
import {conditionalOperators} from '../helpers/Constant';
import {useQueryParam, StringParam} from 'use-query-params';

const Header = (props) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useQueryParam('searchTerm', StringParam);
  const [query, setQuery] = useState();
  const searchHandler = (e) => {
    setQuery(e.target.value);
  };
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const trigger = useRef(null);
  const dropdown = useRef(null);

  useEffect(() => {
    if (searchTerm) {
      setQuery(searchTerm);
    }
  }, [searchTerm]);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({target}) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    // set the search term when page is loaded from the query parameters
    if (searchTerm) {
      setSearchTerm(searchTerm);
    }
    const keyHandler = ({keyCode}) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!(window.location.pathname === '/projects')) {
      navigate(`/projects?searchTerm=${query}`);
    } else {
      setSearchTerm(query);
    }
  };

  return (
    <header className='sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none'>
      <div className='flex flex-grow items-center justify-between py-4 px-4 shadow-2 md:px-6 2xl:px-11 space-x-4'>
        <div className='flex items-center gap-2 sm:gap-4 lg:hidden'>
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-controls='sidebar'
            aria-expanded={props.sidebarOpen}
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className='z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden'
          >
            <span className='relative block h-5.5 w-5.5 cursor-pointer'>
              <span className='du-block absolute right-0 h-full w-full'>
                <span
                  className={`relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!w-full delay-300'
                  }`}
                ></span>
                <span
                  className={`relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && 'delay-400 !w-full'
                  }`}
                ></span>
                <span
                  className={`relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!w-full delay-500'
                  }`}
                ></span>
              </span>
              <span className='absolute right-0 h-full w-full rotate-45'>
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!h-0 !delay-[0]'
                  }`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!h-0 !delay-200'
                  }`}
                ></span>
              </span>
            </span>
          </button>
          {/* <!-- Hamburger Toggle BTN --> */}

          <Link className='block flex-shrink-0 lg:hidden' to='/'>
            <div className='text-xl text-black ml-2 font-bold dark:text-white'>
              GitBoard.
            </div>
          </Link>
        </div>

        <form
          className='hidden sm:flex justify-between w-full'
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className='flex items-center relative grow align-middle '>
            <button className='absolute top-1/2 left-0 -translate-y-1/2'>
              <svg
                className='fill-body hover:fill-primary dark:fill-bodydark dark:hover:fill-primary'
                width='20'
                height='20'
                viewBox='0 0 20 20'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z'
                  fill=''
                />
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z'
                  fill=''
                />
              </svg>
            </button>

            <input
              type='text'
              placeholder='language:python+stars:<=10&sort:stars or user:aashay28'
              className='w-full bg-transparent pr-4 pl-9 focus:outline-none relative'
              value={query || ''}
              onChange={(e) => searchHandler(e)}
              ref={trigger}
              onClick={() => setDropdownOpen(!dropdownOpen)}
              required
            />
          </div>

          <div
            ref={dropdown}
            onFocus={() => setDropdownOpen(true)}
            onBlur={() => setDropdownOpen(false)}
            className={`absolute mx-7 mt-5 flex w-36 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${
              dropdownOpen === true ? 'block' : 'hidden'
            }`}
          >
            <ul className='flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark'>
              {conditionalOperators?.map((con, i) => (
                <li key={i}>
                  <div
                    className='flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base'
                    onClick={() => {
                      setSearchTerm(searchTerm.concat(con.value));
                      trigger.current.focus();
                    }}
                  >
                    {con?.label}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className='flex items-center gap-3 2xsm:gap-7'>
            <ul className='flex items-center gap-2 2xsm:gap-4'>
              <button
                type='submit'
                className='group relative inline-block overflow-hidden rounded  bg-gray  px-5 py-3 text-sm font-medium text-primary hover:animate-pulse focus:outline-none focus:ring active:bg-primary active:text-white'
              >
                <span className='ease absolute left-0 top-0 h-0 w-0 border-t-2 border-primary transition-all duration-200 group-hover:w-full'></span>
                <span className='ease absolute right-0 top-0 h-0 w-0 border-r-2 border-primary transition-all duration-200 group-hover:h-full'></span>
                <span className='ease absolute bottom-0 right-0 h-0 w-0 border-b-2 border-primary transition-all duration-200 group-hover:w-full'></span>
                <span className='ease absolute bottom-0 left-0 h-0 w-0 border-l-2 border-primary transition-all duration-200 group-hover:h-full'></span>
                Search
              </button>
            </ul>
          </div>
        </form>
        {/* <!-- Dark Mode Toggler --> */}
        <DarkModeSwitcher />
        {/* <!-- Dark Mode Toggler --> */}
      </div>
    </header>
  );
};

export default Header;
