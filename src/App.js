import React, { useState, useRef, useEffect } from 'react';
import './styles.css';

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [otp, setOtp] = useState(Array(6).fill(''));
  const inputRefs = useRef([]);

  const handleButtonClick = () => {
    setShowPopup(true);
  };

  const handleInputChange = (event, index) => {
    const value = event.target.value;

    if (isNaN(value)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleInputKeyDown = (event, index) => {
    if (event.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }

    if (event.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1].focus();
    }

    if (event.key === 'ArrowRight' && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  useEffect(() => {
    if (showPopup) {
      inputRefs.current[0].focus();
    }
  }, [showPopup]);

  const handlePaste = (event) => {
    event.preventDefault();
    const clipboardData = event.clipboardData.getData('Text');

    if (clipboardData.length === otp.length && !isNaN(clipboardData)) {
      setOtp(clipboardData.split(''));
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setOtp(Array(6).fill(''));
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Verify Phone</button>

      {showPopup && (
        <div className="popup">
          <h2>Phone Verification</h2>
          <p>Enter the 6 digit code sent to your phone:</p>
          <div className="otp-inputs">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(event) => handleInputChange(event, index)}
                onKeyDown={(event) => handleInputKeyDown(event, index)}
                ref={(ref) => inputRefs.current.push(ref)}
                onPaste={handlePaste}
              />
            ))}
          </div>
          <button onClick={handleClosePopup}>Close</button>
        </div>
      )}
    </div>
  );
}
export default App;