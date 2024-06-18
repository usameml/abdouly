import React from 'react';
import { Container, Box, Typography, Grid, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram } from '@mui/icons-material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CustomAppBar from './CustomAppBar';
import { useTranslation } from 'react-i18next';

// Import images from assets
import photo1 from '../assets/WhatsApp Image 2024-06-15 at 15.37.54_bc88961f.jpg';
import photo2 from '../assets/WhatsApp Image 2024-06-15 at 15.37.55_3ccdc832.jpg';
import photo3 from '../assets/WhatsApp Image 2024-06-15 at 15.37.55_691c0abf.jpg';
import photo4 from '../assets/WhatsApp Image 2024-06-15 at 15.37.55_b9626377.jpg';
import photo5 from '../assets/WhatsApp Image 2024-06-15 at 15.37.55_e02af4ad.jpg';
import photo6 from '../assets/WhatsApp Image 2024-06-15 at 15.37.56_01d2cea8.jpg';
import photo7 from '../assets/WhatsApp Image 2024-06-15 at 15.37.56_3c7913f3.jpg';
import photo8 from '../assets/WhatsApp Image 2024-06-15 at 15.37.56_335376c4.jpg';
import photo9 from '../assets/WhatsApp Image 2024-06-15 at 15.37.56_ad63d7a5.jpg';

const Home = () => {
  const { t } = useTranslation();

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const photos = [photo1, photo2, photo3, photo4, photo5, photo6, photo7, photo8, photo9];

  return (
    <>
      <CustomAppBar />
      <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
        <Box textAlign="center" mb={4}>
          <Typography variant="h3" gutterBottom>
            Ehle Abdouly
          </Typography>
          <Typography variant="h5" color="textSecondary">
            {t('Company Introduction')}
          </Typography>
        </Box>
        <Box mb={4}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" gutterBottom>
                {t('About Our Company')}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Our company mainly specializes in commercializing and selling agricultural and steel products. It has a long-standing reputation and a positive public image for its high-quality products and value-added services throughout the past 3 decades. We operate on the basis of customer-oriented approach principles; meaning that our main priority is identifying and meeting customer needs and requirements to achieve desired results and win-win situations for our prospective customers as well as ourselves.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Slider {...sliderSettings}>
                {photos.map((photo, index) => (
                  <div key={index}>
                    <img src={photo} alt={`Company Photo ${index + 1}`} style={{ width: '100%', borderRadius: '8px' }} />
                  </div>
                ))}
              </Slider>
            </Grid>
          </Grid>
        </Box>
        <Box textAlign="center" mb={4}>
          <Typography variant="h4" gutterBottom>
            {t('Follow Us')}
          </Typography>
          <Box display="flex" justifyContent="center">
            <IconButton href="https://www.facebook.com" target="_blank">
              <Facebook fontSize="large" />
            </IconButton>
            <IconButton href="https://www.twitter.com" target="_blank">
              <Twitter fontSize="large" />
            </IconButton>
            <IconButton href="https://www.instagram.com" target="_blank">
              <Instagram fontSize="large" />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Home;
