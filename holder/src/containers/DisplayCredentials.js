import React from 'react';

const DisplayCredentials = ({ cred }) => {
  const { givenName } = cred.credentialSubject.data;
  const {
    documentType,
  } = cred.credentialSubject.data.hasIDDocument.hasIDDocument;
  const {
    certifyingOrganization,
    expiryDate,
    grade,
    status,
    productName,
  } = JSON.parse(
    cred.credentialSubject.data.hasIDDocument.hasIDDocument.idClass
  );

  return (
    <>
      <p>
        <strong>Given Name:</strong> {givenName}
      </p>
      <p>
        <strong>Document Type:</strong> {documentType}
      </p>
      <p>
        <strong>Product Name:</strong> {productName}
      </p>
      <p>
        <strong>Certifying Organisation:</strong> {certifyingOrganization}
      </p>
      <p>
        <strong>Status:</strong> {status}
      </p>
      <p>
        <strong>Grade:</strong> {grade}
      </p>
      <p>
        <strong>Expiry Date:</strong> {expiryDate}
      </p>
    </>
  );
};

export default DisplayCredentials;
