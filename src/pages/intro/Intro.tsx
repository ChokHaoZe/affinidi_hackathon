import React from 'react';
import 'pages/intro/Intro.scss'
import EntireFlow from 'assets/images/icons/entire-flow.png';
import {routes} from 'constants/routes';

/**
 * Stateless component responsible for rendering a simple SSI introduction screen.
 * */
const IntroPage = () => {
  return (
    <div className='intro page-form page-form--large'>
      <div className='intro__heading-block'>
        <h1 className='intro__heading'>
          Quality Assurance for Healthcare Products 
        </h1>
        <h5 className='intro__subheading'>A use case of VCs during times of world-wide pandemic</h5>
      </div>
      <div className='intro__text-block'>
        <h4>Scenario</h4>
        <p>The world has been unexpectedly struck by a pandemic and the global supply of masks is running dangerously low. Alex, a business man based in Shanghai who owns a mask manufacturing company in China, saw an opportunity to contribute to the humanitarian efforts of supplying healthcare resources for pandemic-stricken nations. On the business end, Alex also saw an opportunity to yield profits from the sale of masks and further establish a global presence to his company’s name. </p>
        <p>Alex thought of exporting supplies of masks to Singapore, but Singapore has always been extremely strict on the surveyance of the quality of its imported goods. Alex needed to find a way to get his mask approved by a trusted local entity in China so that Singapore could recognize his company and trust his products.</p>
        <p>On the other hand, Singapore is facing a major shortage of mask supplies as its larger partner healthcare companies in China, which Singapore had always depended on for its supply of masks, were grappling with the world-wide sudden surge in the demand for masks. Singapore did not mind turning to smaller mask manufacturers in China, such as Alex’s company, to procure masks from for its citizens. However, Singapore needed a way to verify the quality of the masks by the suppliers before importing them. Singapore needed to platform in which the suppliers listed have their products verified by a trusted entity so that import operations can commence immediately during dire times of a pandemic.</p>
        <h4>Roles in this scenario</h4>
        <p>There are 3 roles in SSI cycle: <strong>ISSUER</strong>, <strong>VERIFIER</strong>, and <strong>HOLDER</strong>. Each of them is explained in the example below.</p>
      </div>
      {/* <div className='intro__example'>
        <img className='flow-size' src={EntireFlow} alt='entire-flow'/>
      </div> */}
      <div className='intro__roles-description'>
        <div className='intro__roles-description-role'>
          <h3>Issuer</h3>
          <p>The Quality Assurance Agency of China is able to issue a digitised VC that has the approval information from its partner companies that they have engaged in to conduct checks on the products of the companies who requested for the VCs</p>
        </div>
        <div className='intro__roles-description-role'>
          <h3>Holder</h3>
          <p>Companies like Alex’s, which are able to provide immediate resources during times of pandemic or calamities, and would like a way of garnering trusts from their potential beneficiaries </p>
        </div>
        <div className='intro__roles-description-role'>
          <h3>Verifier</h3>
          <p>Can be a nation, a local distributor or an individual, who would like to be able to verify the VCs and not worry about the quality of the received products in times of emergencies. An example for this scenario would be the Temasek Foundation of Singapore</p>
        </div>
      </div>

      <p>Ready to try out the application? Get started <a href={routes.APPLICANT_LOGIN} rel='noreferrer'>here</a> by being the applicant first!</p>
      <p>For more information and well documented tutorials, please visit <a href='https://www.affinidi.com/api' target='_blank' rel='noreferrer'>https://www.affinidi.com/api</a>.</p>
    </div>
  )
}

export default IntroPage
