import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import { icons } from './iconsDescriptions';

import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import './searchCard.css';

const SearchCard = ({images, content, onCardClick, onFavClick, onShareClick, onImageClick }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [favoriteOn, setFavoriteOn] = useState(false);

  const maxSteps = images.length;
  const {header, list, text} = content;

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleFavorite = () => {
    setFavoriteOn(pr => !pr);
    onFavClick();
  };

  const handleShare = () => {
    console.log('Share');
    onShareClick();
  };

  return (
    <>
      <Paper className='searchcard'>
        <div className='searchcard__slider'>
          <SearchCard.Image images={images} activeStep={activeStep} onClick={onImageClick}/>
          <SearchCard.ImageStepper current={activeStep} steps={maxSteps} next={handleNext} back={handleBack} />
        </div>
        
        <div className='searchcard__content'>
          <div onClick={onCardClick}>
            <SearchCard.HeaderFooter primary={header} />
            
            <Typography variant="body2">
              {text}
            </Typography>
            
            <SearchCard.List items={list} />
          </div>

          <SearchCard.Actions actions={[
            {alabel: 'Favorite',
              icon: <FavoriteBorderIcon/>,
              activIcon: <FavoriteIcon color='secondary'/>,
              on: favoriteOn,
              handle: handleFavorite},
            {alabel: 'Share', icon: <ShareIcon/>, handle: handleShare}
          ]}/>
        </div>
      </Paper>
    </>
  );
};

SearchCard.Image = ({images, activeStep, onClick}) => {
  const slide = document.getElementsByClassName('searchcard__img')[0];
  const slideWidth = slide ? slide.offsetWidth/images.length : 0;
  const transformX = {transform: `translateX(${-slideWidth * activeStep}px)`};

  return (
    <div className="searchcard__img" style={transformX}>
      {
        images.map(image => (
          <img
            key={Math.random()}
            src={image.source}
            alt={image.source}
            onClick={() => onClick(activeStep)}
          />
        ))
      }
    </div>
  );
};

SearchCard.ImageStepper = ({current, steps, next, back}) => (
  <MobileStepper
    variant="dots"
    steps={steps}
    position="static"
    activeStep={current}
    className='searchcard__stepper'
    nextButton={
      <Button endIcon={<ArrowForwardIosIcon />} size="small" onClick={next} disabled={current === steps - 1}>
        Next
      </Button>
    }
    backButton={
      <Button startIcon={<ArrowBackIosIcon />} size="small" onClick={back} disabled={current === 0}>
        Back
      </Button>
    }
  />
);

SearchCard.HeaderFooter = ({primary}) => (
  <div className='searchcard__header-footer'>
    <Typography component="div" variant="body2" className='secondaryText'>
      {primary}
    </Typography>   
  </div>
);

SearchCard.Actions = ({actions}) => (
  <div className='searchcard__actions'>
    {
      actions && actions.map(item => (
        <IconButton
          key={item.alabel}
          aria-label={item.alabel}
          className='iconButtons'
          color='inherit'
          onClick={item.handle}
        >
          {item.on ? item.activIcon : item.icon}
        </IconButton>
      ))
    } 
  </div>
);

SearchCard.List = ({ items }) => (
  <List className='list'>
    {
      items && items.map(item => (
        <ListItem key={item.text} className='list__item'>
          <ListItemIcon className='list__icon'>
            {icons[item.icon] || ''}
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

SearchCard.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    source: PropTypes.string,
  })).isRequired,
  content: PropTypes.shape({
    header: PropTypes.string,
    list: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string,
      icon: PropTypes.node,
    })),
    text: PropTypes.string,
  }).isRequired,
  onCardClick: PropTypes.func.isRequired,
  onFavClick: PropTypes.func.isRequired,
  onShareClick: PropTypes.func.isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default SearchCard;