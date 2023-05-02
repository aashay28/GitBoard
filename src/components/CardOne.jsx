import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';
const CardOne = ({ repository }) => {
  const navigate = useNavigate();
  const handleProfile = (user) => {
    navigate(`/profile/${user}`);
  };
  return (
    <div className='rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark'>
      <div
        className='flex  items-center justify-start'
        onClick={() => handleProfile(repository.owner.login)}
      >
        <img
          className='rounded-full h-11.5 w-11.5'
          src={repository.owner.avatar_url}
        />
        <h4 className='text-title-sm font-bold text-black dark:text-white px-2'>
          {repository.name}
        </h4>
      </div>

      <div className='mt-4 flex items-end justify-between'>
        <div>
          <span className='text-sm font-medium'>Last Updated</span>
        </div>

        <span className='flex items-center gap-1 text-sm font-medium text-meta-3'>
          {moment(repository.updated_at).format('MMM Do YY')}
          <svg
            className='fill-meta-3'
            width='10'
            height='11'
            viewBox='0 0 10 11'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M4.35716 2.47737L0.908974 5.82987L5.0443e-07 4.94612L5 0.0848689L10 4.94612L9.09103 5.82987L5.64284 2.47737L5.64284 10.0849L4.35716 10.0849L4.35716 2.47737Z'
              fill=''
            />
          </svg>
        </span>
      </div>

      <div className='mt-4 flex items-end justify-between'>
        <div>
          <span className='text-sm font-medium'>Open issues</span>
        </div>
        <span className='flex items-center gap-1 text-sm font-medium text-meta-1'>
          {repository.open_issues}
        </span>
      </div>

      <div className='mt-4 flex items-end justify-between'>
        <div>
          <span className='text-sm font-medium'>Watchers</span>
        </div>
        <span className='flex items-center gap-1 text-sm font-medium text-meta-5'>
          {repository.watchers}
        </span>
      </div>

      <div className='mt-4 flex items-end justify-between gap-2'>
        <Link
          target='_blank'
          to={repository.html_url}
          className='inline-flex items-center justify-center rounded-md border border-primary p-2 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 '
        >
          View
        </Link>
        <Link
          target='_blank'
          to={repository.homepage}
          className='inline-flex items-center justify-center rounded-md border border-primary p-2 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 '
        >
          Preview
        </Link>
      </div>
    </div>
  );
};

export default CardOne;
