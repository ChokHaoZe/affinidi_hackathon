import React, { useState, useContext } from 'react';
import AppContext from 'context/app';
import {Button, FormControl, FormGroup, FormLabel, FormFile} from 'react-bootstrap';
import ApiService from 'utils/apiService';
import 'pages/application/Application.scss'
import firebase from 'utils/firebase/firebase';
import randomstring from 'randomstring';

interface IBaseVCData {
    givenName: string;
    familyName: string;
    address: string;
}
  
interface IExtendVCData {
  uen: string;
  email: string;
  dateOfIncorporation: string;
  companyType: string;
  principalBusinessActivity: string;
  productName: string
}

const defaultBaseVCData: IBaseVCData = {
  givenName: '',
  familyName: '',
  address: ''
}

const defaultExtendVCData: IExtendVCData = {
  uen: '',
  email: '',
  dateOfIncorporation: '',
  companyType: '',
  principalBusinessActivity: '',
  productName: ''
}

interface IPayload extends IBaseVCData{
  idClass: string;
  holderDid: string
}

const Application: React.FC = (): React.ReactElement => {
    const {appState} = useContext(AppContext);
    const [inputDID, setinputDID] = useState(appState.didToken || '')

    const [baseVCData, setBaseVCData] = useState<IBaseVCData>(defaultBaseVCData)
  
    const [extendVCData, setExtendVCData] = useState<IExtendVCData>(defaultExtendVCData)

    /**
     * Function for issuing an unsigned employment VC.
     * */
    const submitApplication = async () => {
        try {
          const { givenName, familyName, address } = baseVCData;

          // Generate a random Affinidi Driving License ID, which will double up as an application ID
          const applicationID: string = randomstring.generate(10);
          const vcToStringify = {...extendVCData, applicationID}
          
          const payload: IPayload = {
            givenName,
            familyName,
            address,
            idClass: JSON.stringify(vcToStringify),
            holderDid: inputDID || appState.didToken || '',
          }

          // Store unsignedVC into issuer's datsabase
          const db = firebase.firestore();
          db.collection('application-waiting-approval').add({username: appState.username, payload, applicationID, approved: false})

          alert('You have successfully submitted your application.');
        } catch (error) {
            ApiService.alertWithBrowserConsole(error.message);
        }
    }
    
    const resetToDefaults = () => {
      setinputDID(appState.didToken || '')

      setBaseVCData(defaultBaseVCData)
      setExtendVCData(defaultExtendVCData)
    }
    
    const updateBaseVC = (e: any) => {
      setBaseVCData({...baseVCData, [e.target.name]: e.target.value})
    }

    const updateExtendBaseVC = (e: any) => {
      setExtendVCData({...extendVCData, [e.target.name]: e.target.value})
    }

    return (
      <div className='tutorial'>
        <div className='tutorial__step'>
          <Button 
            style={{float: 'right'}}
            onClick={e => resetToDefaults()}
            >Clear all fields
          </Button>

          <p><strong>Step 1:</strong>Please fill in details of your company</p>
          <FormGroup controlId='email'>
            <FormLabel className='label' style={{margin: '10px 0 0 0'}}>Email Address:</FormLabel>
            <FormControl name='email' type='text' value={extendVCData.email} onChange={e => updateExtendBaseVC(e)}/>
          </FormGroup>

          <FormGroup controlId='givenName'>
            <FormLabel className='label' style={{margin: '10px 0 0 0'}}>Company Name:</FormLabel>
            <FormControl name='givenName' type='text' value={baseVCData.givenName} onChange={e => updateBaseVC(e)}/>
          </FormGroup>

          <FormGroup controlId='address'>
            <FormLabel style={{margin: '10px 0 0 0'}}>Address:</FormLabel>
            <FormControl name='address' type='text' value={baseVCData.address} onChange={e => updateBaseVC(e)}/>
          </FormGroup>

          <FormGroup controlId='uen'>
            <FormLabel style={{margin: '10px 0 0 0'}}>Unique Entity Number (UEN):</FormLabel>
            <FormControl name='uen' type='text' value={extendVCData.uen} onChange={e => updateExtendBaseVC(e)}/>
          </FormGroup>

          <FormGroup controlId='dateOfIncorporation'>
            <FormLabel style={{margin: '10px 0 0 0'}}>Date of Incorporation:</FormLabel>
            <FormControl name='dateOfIncorporation' type='text' value={extendVCData.dateOfIncorporation} onChange={e => updateExtendBaseVC(e)}/>
          </FormGroup>

          <FormGroup controlId='companyType'>
            <FormLabel style={{margin: '10px 0 0 0'}}>Company Type:</FormLabel>
            <FormControl name='companyType' type='text' value={extendVCData.companyType} onChange={e => updateExtendBaseVC(e)}/>
          </FormGroup>

          <FormGroup controlId='activity'>
            <FormLabel style={{margin: '10px 0 0 0'}}>Principal Business Activity:</FormLabel>
            <FormControl name='principalBusinessActivity' type='text' value={extendVCData.principalBusinessActivity} onChange={e => updateExtendBaseVC(e)}/>
          </FormGroup>
          
          <FormGroup controlId='productName'>
            <FormLabel style={{margin: '10px 0 0 0'}}>Product Name:</FormLabel>
            <FormControl name='productName' type='text' value={extendVCData.productName} onChange={e => updateExtendBaseVC(e)}/>
          </FormGroup>

          <Button 
            onClick={e => submitApplication()}
            >Submit
          </Button>
        </div>
      </div>
    )
}

export default Application;