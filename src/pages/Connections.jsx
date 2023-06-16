import DefaultLayout from '../layout/DefaultLayout';
import FollowersCard from '../components/FollowersCard';
import FollowingCard from '../components/FollowingCard';
// import CardThree from '../components/CardThree';
// import CardTwo from '../components/CardTwo';

import ChatCard from '../components/ChatCard';

// import TableOne from '../components/TableOne';
import { useContext, useEffect, useState } from 'react';
import ContextRepository from '../context/ContextRepository';
import Breadcrumb from '../components/Breadcrumb';

import { fetchApi } from '../helpers/fetchApi';
import NotFollowingBack from '../components/NotFollowingBack';
import IamNotFollowingBack from '../components/IamNotFollowingBack';

const Connections = () => {
  const { userDetail } = useContext(ContextRepository);
  const [followersList, setFollowersList] = useState();
  const [followingList, setFollowingList] = useState();

  const getFollowDetails = async () => {
    if (userDetail) {
      setFollowersList(
        await fetchApi(`users/${userDetail.login}/followers?per_page=1000`)
      );
      setFollowingList(
        await fetchApi(`users/${userDetail.login}/following?per_page=1000`)
      );
    }
  };
  useEffect(() => {
    getFollowDetails();
  }, [userDetail]);

  const noFollowBack = followingList?.filter(
    (following) =>
      !followersList?.some((followers) => followers.login === following.login)
  );

  const iAmNotFollowingBack = followersList?.filter(
    (followers) =>
      !followingList?.some((following) => following.login === followers.login)
  );

  return (
    <DefaultLayout>
      <Breadcrumb pageName='Connections' />
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5'>
        <FollowersCard followers={userDetail?.followers || 0} />
        <FollowingCard following={userDetail?.following || 0} />
        <NotFollowingBack notFollowingBack={noFollowBack?.length || 0} />
        <IamNotFollowingBack
          iAmNotFollowingBack={iAmNotFollowingBack?.length || 0}
        />
        {/* <CardTwo />
        <CardThree /> */}
      </div>

      <div className='mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5'>
        <div className='col-span-12 xl:col-span-6'>
          <ChatCard title='Followers' follow={followersList} />
        </div>
        <div className='col-span-12 xl:col-span-6'>
          <ChatCard title='Following' follow={followingList} />
        </div>
        <div className='col-span-12 xl:col-span-6'>
          <ChatCard title='Not Following Back' follow={noFollowBack} />
        </div>
        <div className='col-span-12 xl:col-span-6'>
          <ChatCard title='Not Following' follow={iAmNotFollowingBack} />
        </div>
        {/* <div className='col-span-12 xl:col-span-8'>
          <TableOne followersList={followersList} />
        </div> */}
      </div>
    </DefaultLayout>
  );
};

export default Connections;
