import React, { useState } from 'react';

//import 'typeface-roboto';
import Carousel from 'react-images';
import Paper from '@material-ui/core/Paper';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';

import '../styles.css';

//const images = [{source: 'img/Rectangle987.jpg'}, {source: 'img/Rectangle987.jpg'}, {source: 'img/Rectangle987.jpg'}];

const SearchCard = ({images, header, footer, list, text}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [favoriteOn, setFavoriteOn] = useState(false);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleFavorite = () => {
    setFavoriteOn(pr => !pr);
  };

  const handleShare = () => {
    console.log('Share');
  };

  return (
    <>
      <Paper className='searchcard'>
        <div className='searchcard__img'>
          <SearchCard.Image index={activeStep} images={images} />
          <SearchCard.ImageStepper current={activeStep} steps={maxSteps} next={handleNext} back={handleBack} />
        </div>
        
        <div className='searchcard__content'>
          <SearchCard.HeaderFooter
            primary={header}
            actions={[
              {alabel: '',
                icon: <FavoriteBorderIcon/>,
                activIcon: <FavoriteIcon color='secondary'/>,
                on: favoriteOn,
                handle: handleFavorite}
            ]}
          />
          
          <Typography variant="body2" paragraph>
            {text}
          </Typography>
          
          <SearchCard.List items={list} />

          <SearchCard.HeaderFooter actions={[
            {alabel: '', icon: <ShareIcon/>, handle: handleShare}
          ]}/>
        </div>
      </Paper>
    </>
  );
};

SearchCard.Image = ({index, images}) => (
  <div>
    {/* <Carousel
      views={images}
      currentIndex={activeStep}
      //components={}    
    /> */}

    <img
      src={images[index].source}
      alt={images[index].source}
    />
  </div>
);

SearchCard.ImageStepper = ({current, steps, next, back}) => (
  <MobileStepper
    variant="dots"
    steps={steps}
    position="static"
    activeStep={current}
    className='searchcard__stepper'
    nextButton={
      <Button size="small" onClick={next} disabled={current === steps - 1}>
        Next
      </Button>
    }
    backButton={
      <Button size="small" onClick={back} disabled={current === 0}>
        Back
      </Button>
    }
  />
);

SearchCard.HeaderFooter = ({primary, actions}) => (
  <div className='searchcard__header-footer'>
    <Typography component="span" variant="body2" className='secondaryText'>
      {primary}
    </Typography>

    <div>
      {
        actions && actions.map(item => (
          <IconButton
            aria-label={item.alabel}
            size="small"
            color='inherit'
            onClick={item.handle}
          >
            {item.on ? item.activIcon : item.icon}
          </IconButton>
        ))
      } 
    </div>   
  </div>
);

SearchCard.List = ({ items }) => (
  <List className='list'>
    {
      items && items.map(item => (
        <ListItem key={item.text} className='list__item'>
          <ListItemIcon className='list__icon'>
            {item.icon || ''}
          </ListItemIcon>
          <ListItemText primary={
            <Typography
              component="span"
              variant="body2"
            >
              {item.text || ''}
            </Typography>
          } />
        </ListItem>
      ))
    }
  </List>
);

export default SearchCard;