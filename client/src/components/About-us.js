import React, { useState, useEffect } from 'react';
import './AboutUs.css';
import AppBar from './AppBar';
import axios from 'axios';

const AboutUs = () => {
  const [aboutContent, setAboutContent] = useState('');

  useEffect(() => {
    fetchAboutContent();
  }, []);

  async function fetchAboutContent() {
    try {
      const response = await axios.get('http://localhost:1000/api/about');
      setAboutContent(response.data.content);
      console.log("'About content:', response.data.content");
    } catch (error) {
      console.error('Error fetching about content:', error);
    }
  }

  return (
    <>
      <AppBar username={'yassine ibork'} />

      <div className='about-us-container'>
        <h1 className='about-us-heading'>About Our Accounting Firm</h1>
        <div
          className='about-us-text'
          dangerouslySetInnerHTML={{ __html: aboutContent }}
        ></div>
      </div>
    </>
  );
};

export default AboutUs;
