"use client";

import { useEffect, useState } from 'react';

import NavBar from '../../components/NavBar';

const txtEncodedJSONID = "encodedJSONTextArea"
const txtDecodedJSONID = "decodedJSONTextArea"

export default function Login() {
  const [ encodedJSON, setEncodedJSON ] = useState('');
  const [ decodedJSON, setDecodedJSON ] = useState('');

  const encodeJSON = () => {
    setEncodedJSON(JSON.stringify(decodedJSON))
  };

  const decodeJSON = () => {
    setDecodedJSON(JSON.parse(encodedJSON))
  };

  useEffect(() => {
    document.getElementById(txtEncodedJSONID).addEventListener('input', e => {
      setEncodedJSON(e.target.value)
    });
    document.getElementById(txtDecodedJSONID).addEventListener('input', e => {
      setDecodedJSON(e.target.value)
    });
  }, []);


  return (
    <>
      <title>Json Helper | Haruto Apps</title>
      <meta name="description" content="Help with json encoding and decoding | Haruto Apps" />
      <NavBar />
      <main className="centerbox">
        <wa-card with-header with-footer className="card-header card-footer">
          <div slot="header">JSON Encoder/Decoder</div>
          <div className="wa-stack">
            <wa-textarea label="Encoded data" id={ txtEncodedJSONID } resize="both" value={ encodedJSON }></wa-textarea>
            <div className="evenlySpreadRow">
              <wa-button variant="brand" onClick={ () => encodeJSON() }>↑ Encode Data ↑</wa-button>
              <wa-button variant="brand" onClick={ () => decodeJSON() }>↓ Decode Data ↓</wa-button>
            </div>
            <wa-textarea label="Decoded Data" id={ txtDecodedJSONID } resize="both" value={ decodedJSON }></wa-textarea>
          </div>
          <div slot="footer">
            All data are processed locally.<br />
            If it is unresponsive look at the console for errors.
          </div>
        </wa-card>
      </main>
    </>
  );
}