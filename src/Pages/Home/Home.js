import React from 'react';
import AppointmentBanner from '../AppointmentBanner/AppointmentBanner';
import Banner from '../Banner/Banner';
import Services from '../Services/Services';
import Header from '../Shared/Header/Header';

const Home = () => {
    return (
        <div>

            <Header></Header>
            <Banner></Banner>
            <Services></Services>
            <AppointmentBanner></AppointmentBanner>
        </div>
    );
};

export default Home;