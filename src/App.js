import React from 'react';
import SearchCard from './components/SearchCard';

import TodayIcon from '@material-ui/icons/Today';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PeopleIcon from '@material-ui/icons/People';

const images = [{source: 'img/Rectangle987.jpg'}, {source: 'img/Rectangle987.jpg'}, {source: 'img/Rectangle987.jpg'}];
const App = () => {
  return (
    <>
      <SearchCard
        images={images}
        header='Group: up to 10 people'
        list={[
          {text: '1:15 PM, Sunday, January 26', icon: <TodayIcon />},
          {text: 'Tarasa Shevchenka str, 99', icon: <LocationOnIcon />},
          {text: '5 people joined', icon: <PeopleIcon />},
        ]}
        text='A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring whi'/>
    </>
  );
};

export default App;