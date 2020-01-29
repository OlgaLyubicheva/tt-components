import React, {useState, useEffect} from 'react';
import SearchCard from './components/searchCard/SearchCard';

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('./api/cards.json')
      .then(response => response.json())
      .then(source => setData(source));
  }, []);

  return (
    <>
      {
        data.length !==0 
          ? (<div>
            {
              data.map(card => (
                <div style={{marginBottom: '10px'}} key={Math.random()}>
                  <SearchCard
                    images={card.images}
                    content={card.content}
                    onCardClick={() => {console.log('card is cliked');}} //або зробити саме тіло картки як тег "a"
                    onFavClick={() => {console.log('Faver is added');}} //щоб додати картку в список
                    onShareClick={() => {console.log('share is cliked');}} //щоб показати діалог для шеру
                    onImageClick={(index) => {console.log('index of foto:', index);}}
                  />
                </div>
              ))
            }
          </div>)
          : null
      }
    </>
  );
};

export default App;