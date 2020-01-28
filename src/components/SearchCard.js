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

import TodayIcon from '@material-ui/icons/Today';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PeopleIcon from '@material-ui/icons/People';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';

const images = [{source: 'img/Rectangle987.jpg'}, {source: 'img/Rectangle987.jpg'}, {source: 'img/Rectangle987.jpg'}];

const SearchCard = () => {
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  return (
    <>
      <Paper className='searchcard'>
        <div className='searchcard__img'>
          <SearchCard.Image index={activeStep}/>
          <SearchCard.ImageStepper current={activeStep} steps={maxSteps} next={handleNext} back={handleBack} />
        </div>
        
        <div className='searchcard__content'>
          <SearchCard.HeaderFooter primary='Group: up to 10 people' actions={[{alabel: '', icon: <FavoriteBorderIcon/>, activIcon: <FavoriteIcon />}]}/>
          
          <Typography variant="body2" paragraph>
            A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring whi
          </Typography>
          
          <SearchCard.List items={[
            {text: '1:15 PM, Sunday, January 26', icon: <TodayIcon />},
            {text: 'Tarasa Shevchenka str, 99', icon: <LocationOnIcon />},
            {text: '5 people joined', icon: <PeopleIcon />},
          ]} />

          <SearchCard.HeaderFooter actions={[{alabel: '', icon: <ShareIcon/>}]}/>
        </div>
      </Paper>
    </>
  );
};

SearchCard.Image = ({index}) => (
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
          <IconButton aria-label={item.alabel} size="small" color='inherit'>
            {item.icon}
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