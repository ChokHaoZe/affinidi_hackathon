import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

const SearchBar = () => {
  const history = useHistory();
  const [credId, setCredId] = useState<string>('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    history.push(`/verify?id=${credId}`)
  }

  return (
  <Form onSubmit={handleSubmit} style={{ width: '30vw', margin: '0 auto' }}>
    <Form.Group controlId="formBasicEmail">
      <Form.Label>Please enter the Credential URL to verify</Form.Label>
      <Form.Control type="text" placeholder="Enter Credential" value={credId} onChange={(e:any) => setCredId(e.target.value)}/>
    </Form.Group>
    <Button variant="primary" type="submit">
      Submit
    </Button>
  </Form>
  )
}

export default SearchBar;