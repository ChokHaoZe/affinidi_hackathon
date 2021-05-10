import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap'
import ApiService from '../../utils/apiService';

interface IProps {
  children?: React.ReactNode;
  location: any
}
const VerifiedResult: React.FC<IProps> = ({ location }) => {
  const [valid, setValid] = useState<boolean>(false);
  const [cred, setCred] = useState<any>();
  const [cert, setCert] = useState<any>();

  const history = useHistory()
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const url = params.get('id')
    if (!url) return history.push('/')

    const verifyCreds = async (url: string) => {
      const result = await fetch(`${url}`)
      const obj = await result.json()
      console.log(obj)
      setCred(obj)
      const data = {
        verifiableCredentials: obj
      }
      const result2 = await ApiService.verifyCredential(data)
      if (result2.isValid){
        setValid(true)

        setCert(JSON.parse(obj.credentialSubject.data.hasIDDocument.hasIDDocument.idClass))
        console.log(cert)
      }
    }
    verifyCreds(url)
  }, [])

  return (
  <Card style={{ width: '18rem', margin: '0 auto' }}>
    <Card.Body>
      <Card.Title>Results</Card.Title>
      <p>This credential is <strong>{ valid ? 'VALID' : 'NOT VALID'}</strong></p>
      <Card.Text>
        {cred && <div>
          <p> <strong>Company Name:</strong> {cred.credentialSubject.data.givenName}</p>
          <p> <strong>Credential Type:</strong> {cred.credentialSubject.data.hasIDDocument.hasIDDocument.documentType}</p>
          { cert && <div>
            <p> <strong>Certifying Organisation:</strong> {cert.certifyingOrganization}</p>
            <p> <strong>Product Name:</strong> {cert.productName}</p>
            <p> <strong>Status:</strong> {cert.status}</p>
            <p> <strong>Grade:</strong> {cert.grade}</p>
            <p> <strong>Expiry Date:</strong> {cert.expiryDate}</p>
          </div>}
        </div>}
      </Card.Text>
      <Button variant="primary" onClick={() => history.push('/')}>Verify other URL</Button>
    </Card.Body>
  </Card>
  )
}

export default VerifiedResult;