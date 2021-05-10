import React, { useState } from 'react';
import { useHistory, RouteComponentProps } from 'react-router-dom';
import {Button,FormFile,FormGroup,FormLabel,FormControl} from 'react-bootstrap';
import ApiService from 'utils/apiService';
import { routes } from 'constants/routes';
import firebase from 'utils/firebase/firebase';
import {drivingLicenseVCData} from 'utils/vc-data-examples/drivinglicense';
import { sendEmail } from 'utils/templates/email';

interface IProps {
  children?: React.ReactNode,
  location?: any
}

interface ICert {
  certifyingOrganization: string,
  certifyingRequirements: string,
  status: string,
  grade: string,
  expiryDate: string
}

const defaultCertificationInfo: ICert = {
  certifyingOrganization: '',
  certifyingRequirements: '',
  status: '',
  grade: '',
  expiryDate: ''
}

const ApplicationInfoPage: React.FC<IProps & RouteComponentProps> = (props: IProps): React.ReactElement => {
  const [VCschemaData] = useState<any>(JSON.stringify(drivingLicenseVCData));

  const { username, payload, applicationID, docID, approved } = props.location.state.state;
  const { givenName, holderDid, idClass, address} = payload;
  const {  uen, email, dateOfIncorporation, companyType, principalBusinessActivity, productName } = JSON.parse(idClass);

  const [ certificationInfo, setCertificationInfo ] = useState<any>(defaultCertificationInfo);

  const history = useHistory();

  const isJson = (str: string) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
  }

  /**
   * Function for signing an unsigned VC.
  * */
  const approveVC = async () => {
    try {
      if (isJson(VCschemaData)){
        const example = {...JSON.parse(VCschemaData)}
        const extendedIDClass = {
          ...JSON.parse(idClass),
          certifyingOrganization: certificationInfo.certifyingOrganization,
          certifyingRequirements: certificationInfo.certifyingRequirements,
          status: certificationInfo.status,
          grade: certificationInfo.grade,
          expiryDate: certificationInfo.expiryDate
        }
        
        example.data.givenName = givenName;
        example.data.email = email;
        example.data.address = address;
        example.data.hasIDDocument.hasIDDocument.issueDate = new Date();
        example.data.hasIDDocument.hasIDDocument.idClass = JSON.stringify(extendedIDClass);
        example.holderDid = holderDid || '';
        
        // Build unsigned VC
        const {unsignedVC} = await ApiService.issueUnsignedVC(example);

        // Sign the VC
        const {signedCredential} = await ApiService.signVC({
          unsignedCredential: unsignedVC
        })

        // Store the VC
        const {credentialIds} = await ApiService.storeSignedVCs({ data: [signedCredential]})
        
        // Share the credentials
        const claimID: string = credentialIds[0];
        const {qrCode, sharingUrl} = await ApiService.shareCredentials(claimID)
        sendEmail(qrCode, sharingUrl, email)

        const db = firebase.firestore();
        // Store the information under Approved Table
        db.collection('application-approved').add({ username, payload, applicationID, approved: true });
        // Delete the information under the Pending Approval Table
        db.collection('application-waiting-approval').doc(docID).delete();

        alert('Application has been approved and have alerted the applicant.');
        history.push(routes.ISSUER);
      }
    } catch (error) {
      ApiService.alertWithBrowserConsole(error.message);
    }
  }

  return (
    <div className='tutorial'>
      <div className='tutorial__step'>
        <h3><strong>Application ID:</strong> {applicationID}</h3>
        <p><strong>Given Name:</strong> {givenName}</p>
        <p><strong>Unique Entity Number:</strong> {uen}</p>
        <p><strong>Date of Incorporation:</strong> {dateOfIncorporation}</p>
        <p><strong>Company Type:</strong> {companyType}</p>
        <p><strong>Principal Business Activity:</strong> {principalBusinessActivity}</p>
        <p><strong>Product Name:</strong> {productName}</p>

        <FormGroup controlId='certifyingOrganization'>
          <FormLabel className='label' style={{ margin: '10px 0 0 0' }}>
            Certifying Organization:
          </FormLabel>
          <FormControl
            name='certifyingOrganization'
            type='text'
            value={certificationInfo.certifyingOrganization}
            onChange={(e) => setCertificationInfo({...certificationInfo, [e.target.name]: e.target.value})}
          />
        </FormGroup>

        <FormGroup controlId='certifyingRequirements'>
          <FormLabel className='label' style={{ margin: '10px 0 0 0' }}>
            Certifying Requirements:
          </FormLabel>
          <FormControl
            name='certifyingRequirements'
            type='text'
            value={certificationInfo.certifyingRequirements}
            onChange={(e) => setCertificationInfo({...certificationInfo, [e.target.name]: e.target.value})}
          />
        </FormGroup>

        <FormGroup controlId='status'>
          <FormLabel className='label' style={{ margin: '10px 0 0 0' }}>
            Status:
          </FormLabel>
          <FormControl
            name='status'
            type='text'
            value={certificationInfo.status}
            onChange={(e) => setCertificationInfo({...certificationInfo, [e.target.name]: e.target.value})}
          />
        </FormGroup>

        <FormGroup controlId='grade'>
          <FormLabel className='label' style={{ margin: '10px 0 0 0' }}>
            Grade:
          </FormLabel>
          <FormControl
            name='grade'
            type='text'
            value={certificationInfo.grade}
            onChange={(e) => setCertificationInfo({...certificationInfo, [e.target.name]: e.target.value})}
          />
        </FormGroup>

        <FormGroup controlId='expiryDate'>
          <FormLabel className='label' style={{ margin: '10px 0 0 0' }}>
            Expiry Date:
          </FormLabel>
          <FormControl
            name='expiryDate'
            type='text'
            value={certificationInfo.expiryDate}
            onChange={(e) => setCertificationInfo({...certificationInfo, [e.target.name]: e.target.value})}
          />
        </FormGroup>

        <div style={{ margin: '30px 0' }}>
          <p>
            <strong>Upload</strong> Proof of Quality Assurance Certification
          </p>
          <FormFile id='formcheck-api-regular'>
            <FormFile.Label>Proof of Quality Assurance Certification</FormFile.Label>
            <FormFile.Input />
          </FormFile>
        </div>

        { !approved ? (
          <>
           <Button style={{display: 'block', margin: '10px 0 0 0'}} onClick={approveVC}>Approve</Button>
           <Button style={{display: 'block', margin: '10px 0 0 0'}} disabled>Reject</Button>
          </>
          ) : null}
       
      </div>
    </div>
  )
}

export default ApplicationInfoPage;