import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router'
import { loadStripe } from '@stripe/stripe-js';

import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';


const stripePromise = loadStripe('pk_test_51JwibcH6x7Wh9dbfsFshNJ1cGFsEN7nCwIn4KALNAZLP4PdY5mUy7wQx6wkYKPAu7Enut6w6EyJZns63q7v8QZUo00AdSNRL13')
const Payment = () => {
    const {appointmentId}=useParams()
     const [appointment, setAppointment] = useState({});
    useEffect(() => {
        fetch(`http://localhost:5000/appointments/${appointmentId}`)
            .then(res => res.json())
            .then(data => setAppointment(data));
    }, [appointmentId]);
    return (
        <div>
        <h2>Please Pay for: {appointment.patientName} for {appointment.serviceName}</h2>
        <h4>Pay: ${appointment.price}</h4>
        {appointment?.price && <Elements stripe={stripePromise}>
            <CheckoutForm
                appointment={appointment}
            />
        </Elements>}
    </div>
    );
};

export default Payment;