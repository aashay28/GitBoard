import DefaultLayout from '../layout/DefaultLayout';
import FollowersCard from '../components/FollowersCard';
import FollowingCard from '../components/FollowingCard';
// import CardThree from '../components/CardThree';
// import CardTwo from '../components/CardTwo';

import ChatCard from '../components/ChatCard';

import TableOne from '../components/TableOne';
import { useContext } from 'react';
import ContextRepository from '../context/ContextRepository';
import Breadcrumb from '../components/Breadcrumb';

const Connections = () => {
  const { userDetail } = useContext(ContextRepository);

  return (
    <DefaultLayout>
      <Breadcrumb pageName='Connections' />
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5'>
        <FollowersCard followers={userDetail?.followers} />
        <FollowingCard following={userDetail?.following} />
        {/* <CardTwo />
        <CardThree /> */}
      </div>

      <div className='mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5'>
        <div className='col-span-12 xl:col-span-8'>
          <TableOne />
        </div>
        <ChatCard />
      </div>
    </DefaultLayout>
  );
};

export default Connections;
