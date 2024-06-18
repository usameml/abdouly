import React from 'react';
import { Container, Box, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CustomAppBar from './CustomAppBar';

// Import staff photos
import staff1 from '../assets/staff1.jpeg';
import staff2 from '../assets/staff1.jpeg';
import staff3 from '../assets/staff1.jpeg';

const staffMembers = [
  {
    photo: staff1,
    name: 'John Doe',
    position: 'CEO',
    bio: 'John has over 20 years of experience in the agricultural and steel industry, leading the company to new heights.'
  },
  {
    photo: staff2,
    name: 'Jane Smith',
    position: 'CFO',
    bio: 'Jane is a financial expert with a strong background in managing company finances and ensuring fiscal responsibility.'
  },
  {
    photo: staff3,
    name: 'Mike Johnson',
    position: 'CTO',
    bio: 'Mike is a tech enthusiast who has spearheaded numerous projects, driving innovation within the company.'
  }
];

const About = () => {
  const { t } = useTranslation();

  return (
    <>
      <CustomAppBar />
      <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
        <Box textAlign="center" mb={4}>
          <Typography variant="h3" gutterBottom>
            {t('About Our Company')}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Our company mainly specializes in commercializing and selling agricultural and steel products. It has a long-standing reputation and a positive public image for its high-quality products and value-added services throughout the past 3 decades. We operate on the basis of customer-oriented approach principles; meaning that our main priority is identifying and meeting customer needs and requirements to achieve desired results and win-win situations for our prospective customers as well as ourselves.
          </Typography>
        </Box>
        <Box textAlign="center" mb={4}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1077.7837917804047!2d-15.9816249949441!3d18.079448167885097!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sar!2s!4v1718658289549!5m2!1sar!2s"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </Box>
        <Box mb={4}>
          <Typography variant="h4" gutterBottom textAlign="center">
            {t('Our Team')}
          </Typography>
          <Grid container spacing={4}>
            {staffMembers.map((staff, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardMedia
                    component="img"
                    alt={staff.name}
                    height="300"
                    image={staff.photo}
                  />
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {staff.name}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      {staff.position}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {staff.bio}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default About;
