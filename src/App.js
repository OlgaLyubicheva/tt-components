import React from 'react';
import SearchCard from './components/SearchCard';

import TodayIcon from '@material-ui/icons/Today';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PeopleIcon from '@material-ui/icons/People';

const images = [{source: 'img/Rectangle987.jpg'}, {source: 'img/photo2.jpg'}, {source: 'img/photo3.jpg'}];

const App = () => {
  return (
    <>
      <SearchCard
        images={images}
        content={{
          header: 'Group: up to 10 people',
          list: [
            {text: '1:15 PM, Sunday, January 26', icon: <TodayIcon />},
            {text: 'Tarasa Shevchenka str, 99', icon: <LocationOnIcon />},
            {text: '5 people joined', icon: <PeopleIcon />},
          ],
          text: 'A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring whi',
        }}
        onCardClick={() => {console.log('card is cliked');}} //або зробити саме тіло картки як тег "a"
        onFavClick={() => {console.log('Faver is added');}} //щоб додати картку в список
        onShareClick={() => {console.log('share is cliked');}} //щоб показати діалог для шеру
        onImageClick={(index) => {console.log('index of foto:', index);}}
      />
    </>
  );
};

export default App;