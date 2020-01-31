import React , { useEffect } from 'react';
import dynamic from 'next/dynamic';
import anime from 'animejs';

import { useSelector } from '../lib/useRedux';

import Layout from '../components/Layout';
import Form from '../components/Form';
import SocialNetworks from '../components/ui/SocialNetworks';

import '../scss/contact.scss';

const SteeringText = dynamic(() => import('../components/ui/SteeringText'), {ssr: false});

const Contact = () => {

    const device = useSelector(({device}) => device);

    useEffect(
        () => {
            const canvas = document.querySelector('.animation-wrapper')
            const title = document.querySelector('h1')
            const form = document.querySelector('.form');
            const socialnetworks = document.querySelector('.social-networks');

            anime({
                targets: [canvas, title, form, socialnetworks],
                translateY: 0,
                opacity: 1,              
                delay: anime.stagger(200)
              });
        } , []
    )

    return (
        <Layout page="contact">
            {
                <div className="animation-wrapper">
                     <SteeringText text="contact"/>
                </div>
            }
            <div className="form-wrapper">
                <h1>
                    Interested in working together ? <br/>Feel free to contact me for any project or collaboration.
                </h1>
                <Form/>
                <SocialNetworks/>
            </div>
        </Layout>
    )
}

export default Contact;