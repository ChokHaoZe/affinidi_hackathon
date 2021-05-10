import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { generateShareCredentialURL } from '../utils/apiService';

const CredentialTable = ({ credentials }) => {
  const [vcData, setVCData] = useState([]);

  useEffect(() => {
    const removeProp = (obj, propToDelete) => {
      for (let property in obj) {
        if (obj.hasOwnProperty(property)) {
          if (property === propToDelete) {
            delete obj[property];
          } else if (typeof obj[property] == 'object') {
            removeProp(obj[property], propToDelete);
          }
        }
      }
      return obj;
    };

    const initialiseVCData = (vcData) => {
      let processedVCData = [];
      for (let vc in vcData) {
        processedVCData[vc] = vcData[vc].credential.credentialSubject.data;
        processedVCData[vc] = removeProp(processedVCData[vc], '@type');
      }
      return processedVCData;
    };

    setVCData(initialiseVCData(credentials));
  }, [credentials]);

  const extractProductNameFromIDDocument = (cred) => {
    if (cred.hasIDDocument) {
      return JSON.parse(cred.hasIDDocument.hasIDDocument.idClass).productName;
    } else {
      return null;
    }
  };

  const generateAndCopyCredentialURL = async (credential) => {
    try {
      const claimId = credential.credential.id;
      const result = await generateShareCredentialURL(claimId);
      navigator.clipboard.writeText(result.sharingUrl);
    } catch (error) {
      console.log(error);
    }
  };

  const generateAndCopyShareURL = async (credential) => {
    try {
      const claimId = credential.credential.id;
      const result = await generateShareCredentialURL(claimId);
      navigator.clipboard.writeText(
        `http://localhost:3002/verify?id=${result.sharingUrl}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Table bordered>
        <thead className='thead-light'>
          <tr>
            <th>Index</th>
            <th>Company Name</th>
            <th>VC Type</th>
            <th>Product</th>
            <th>Share</th>
          </tr>
        </thead>
        <tbody>
          {vcData.map((cred, index) => {
            return (
              <tr key={index + 1}>
                <th scope='row'>{index + 1}</th>
                <td>{cred.givenName || cred.name}</td>
                <td>
                  {cred.hasIDDocument
                    ? cred.hasIDDocument.hasIDDocument.documentType
                    : 'ID Document'}
                </td>
                <td>{extractProductNameFromIDDocument(cred) || ''}</td>
                <td>
                  <Button
                    style={{ margin: '5px' }}
                    onClick={() =>
                      generateAndCopyCredentialURL(credentials[index])
                    }
                  >
                    Copy credential ID
                  </Button>
                  <Button
                    style={{ margin: '5px' }}
                    onClick={() => generateAndCopyShareURL(credentials[index])}
                  >
                    Copy shareable link
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default CredentialTable;
