import { useEffect, useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { conditionalOperators } from '../helpers/Constant';
import { useQueryParam, StringParam } from 'use-query-params';
const SearchBar = () => {
  const navigate = useNavigate();
  const [searchTermQueryParam, setSearchTermQueryParam] = useQueryParam(
    'searchTerm',
    StringParam
  );
  const [searchTerm, setSearchTerm] = useState();
  const searchHandler = (e) => {
    setSearchTerm(e.target.value);
  };
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const trigger = useRef(null);
  const dropdown = useRef(null);

  useEffect(() => {
    if (searchTermQueryParam) {
      setSearchTerm(searchTermQueryParam);
    }
  }, [searchTermQueryParam]);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
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
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!(window.location.pathname === '/projects')) {
      navigate(`/projects?searchTerm=${searchTerm}`);
    } else {
      setSearchTermQueryParam(searchTerm);
    }
  };
  return (
    <form
      className='flex justify-between w-full'
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
          value={searchTerm || ''}
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
        className={`absolute z-40 mx-7 mt-15 flex w-36 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${
          dropdownOpen === true ? 'block' : 'hidden'
        }`}
      >
        <ul className='flex flex-col  gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark'>
          {conditionalOperators?.map((con, i) => (
            <li key={i}>
              <div
                className='flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base'
                onClick={() => {
                  setSearchTermQueryParam(
                    searchTermQueryParam.concat(con.value)
                  );
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
  );
};

export default SearchBar;
