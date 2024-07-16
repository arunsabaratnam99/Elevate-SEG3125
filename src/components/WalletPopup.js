import React, { useState, useEffect } from 'react';
import './WalletPopup.css';
import WalletVector from './icons/WalletVector.svg';
import DollarVector from './icons/DollarVector.svg';
import PlusIcon from './icons/PlusVector.svg';
import ErrorVector from './icons/ErrorVector.svg';
import Notification from './Notification'; // Import the Notification component


const bankDetails = {
  'All Trans Financial Services': { institutionNumber: '123', swiftCode: 'ATFS1234' },
  'Alterna Savings and Credit Union LTD': { institutionNumber: '234', swiftCode: 'ASCU2345' },
  'ATB Financial': { institutionNumber: '345', swiftCode: 'ATBF3456' },
  'Bank of America Canada': { institutionNumber: '241', swiftCode: 'BOFACA6S' },
  'Bank of Canada': { institutionNumber: '177', swiftCode: 'BCANCA2A' },
  'Bank of China': { institutionNumber: '134', swiftCode: 'BKCHCA6T' },
  'Bank of Montreal': { institutionNumber: '001', swiftCode: 'BOFMCAM2' },
  'Bank of Nova Scotia': { institutionNumber: '002', swiftCode: 'NOSCCATT' },
  'BNP Paribas': { institutionNumber: '300', swiftCode: 'BNPAMXMM' },
  'Caisses Desjardins du Quebec': { institutionNumber: '815', swiftCode: 'CCDQCAMM' },
  'Carisses populaires Desjardins acadinennes': { institutionNumber: '816', swiftCode: 'CCDQCAMM' },
  'Carisses populaires Desjardins du Manitoba': { institutionNumber: '829', swiftCode: 'CCDQCAMM' },
  'Canadian Tire Bank': { institutionNumber: '338', swiftCode: 'CTBKCA6M' },
  'Canadian Western Bank': { institutionNumber: '030', swiftCode: 'CWBCCAMM' },
  'CIBC': { institutionNumber: '010', swiftCode: 'CIBCCATT' },
  'Citibank Canada': { institutionNumber: '260', swiftCode: 'CITICATT' },
  'Citizens Bank of Canada': { institutionNumber: '309', swiftCode: 'CITCCAMM' },
  'Credit Union - BC Region': { institutionNumber: '828', swiftCode: 'CUCMCAMM' },
  'Credit Union - NB Region': { institutionNumber: '829', swiftCode: 'CUCMCAMM' },
  'Credit Union - ON Region': { institutionNumber: '839', swiftCode: 'CUCMCAMM' },
  'Credit Union Central Alberta': { institutionNumber: '839', swiftCode: 'CUCMCAMM' },
  'Credit Union Central of Saskatchewan': { institutionNumber: '839', swiftCode: 'CUCMCAMM' },
  'Credit Union Heritage': { institutionNumber: '839', swiftCode: 'CUCMCAMM' },
  'CTC Bank of Canada': { institutionNumber: '309', swiftCode: 'CTCKCAMM' },
  'First Commercial Bank': { institutionNumber: '239', swiftCode: 'FCTCCAMM' },
  'Government of Canada': { institutionNumber: '117', swiftCode: 'GOCNCA2A' },
  'HSBC Canada': { institutionNumber: '016', swiftCode: 'HKBCCATT' },
  'ICBC': { institutionNumber: '260', swiftCode: 'ICBKCATT' },
  'ICICI Bank Canada': { institutionNumber: '306', swiftCode: 'ICICCATT' },
  'Tangerine Bank': { institutionNumber: '614', swiftCode: 'INGDCATT' },
  'JPMorgan Chase': { institutionNumber: '270', swiftCode: 'CHASCATT' },
  'Korea Exchange Bank of Canada': { institutionNumber: '270', swiftCode: 'KOEXCAMM' },
  'Laurentian Bank': { institutionNumber: '039', swiftCode: 'BLCMCAMM' },
  'Manulife Bank': { institutionNumber: '540', swiftCode: 'MTCMCAMM' },
  'Mega International Commercial Bank Canada': { institutionNumber: '239', swiftCode: 'ICBMCATT' },
  'Meridian Credit Union': { institutionNumber: '828', swiftCode: 'CUCMCAMM' },
  'National Bank of Canada': { institutionNumber: '006', swiftCode: 'BNDCCAMM' },
  'Presidents Choice Financial': { institutionNumber: '010', swiftCode: 'PCFSCATT' },
  'Royal Bank of Canada': { institutionNumber: '003', swiftCode: 'ROYCCAT2' },
  'State Bank of India': { institutionNumber: '132', swiftCode: 'SBINCATX' },
  'TD Canada Trust': { institutionNumber: '004', swiftCode: 'TDOMCATTTOR' },
  'The Bank of Tokyo-Mitsubishi UFG': { institutionNumber: '241', swiftCode: 'BOTKJPJT' },
  'UBS Bank': { institutionNumber: '280', swiftCode: 'UBSNCAMM' },
  // Add other banks with their institution numbers and swift codes here
};

const WalletPopup = ({ isOpen, onClose, walletAmount, registeredCards, onSaveCard, onDeposit, onWithdraw }) => {
  const [activeTab, setActiveTab] = useState('deposit');
  const [selectedCard, setSelectedCard] = useState('');
  const [newCardNumber, setNewCardNumber] = useState('');
  const [newCardName, setNewCardName] = useState('');
  const [newExpiryMonth, setNewExpiryMonth] = useState('');
  const [newExpiryYear, setNewExpiryYear] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvv, setCvv] = useState('');
  const [depositAmount, setDepositAmount] = useState('');
  const [isAddCardExpanded, setIsAddCardExpanded] = useState(false);
  const [errors, setErrors] = useState({});
  const [focused, setFocused] = useState({});
  const [notifications, setNotifications] = useState([]); // Notification state


  // Withdraw state variables
  const [bankName, setBankName] = useState('');
  const [accountType, setAccountType] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [swiftCode, setSwiftCode] = useState('');
  const [bankTransitNumber, setBankTransitNumber] = useState('');
  const [bankInstitutionNumber, setBankInstitutionNumber] = useState('');
  const [withdrawalAmount, setWithdrawalAmount] = useState('');

  useEffect(() => {
    // Clear all input values and errors when the active tab changes or component mounts
    setSelectedCard('');
    setNewCardNumber('');
    setNewCardName('');
    setNewExpiryMonth('');
    setNewExpiryYear('');
    setExpiryMonth('');
    setExpiryYear('');
    setCvv('');
    setDepositAmount('');
    setErrors({});
    setFocused({});
    // Clear withdrawal inputs
    setWithdrawalAmount('');
    setBankName('');
    setAccountType('');
    setAccountNumber('');
    setSwiftCode('');
    setBankTransitNumber('');
    setBankInstitutionNumber('');
  }, [activeTab]);

  const handleBlur = (event) => {
    const { name } = event.target;
    setFocused((prevFocused) => ({
      ...prevFocused,
      [name]: false,
    }));

    if (name === 'newCardNumber' && !newCardNumber) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        newCardNumber: 'This field is required.',
      }));
    } else if (name === 'newCardName' && !newCardName) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        newCardName: 'This field is required.',
      }));
    } else if ((name === 'newExpiryMonth' || name === 'newExpiryYear') && (!newExpiryMonth || !newExpiryYear)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        newExpiryDate: 'This field is required.',
      }));
    } else if (name === 'selectedCard' && !selectedCard) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        selectedCard: 'Please select a card.',
      }));
    } else if (name === 'cvv' && !cvv) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        cvv: 'This field is required.',
      }));
    } else if (name === 'depositAmount' && (!depositAmount || depositAmount < 10)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        depositAmount: 'Deposit amount must be at least $10.',
      }));
    } else if (name === 'bankName' && !bankName) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        bankName: 'This field is required.',
      }));
    } else if (name === 'accountType' && !accountType) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        accountType: 'This field is required.',
      }));
    } else if (name === 'accountNumber' && !accountNumber) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        accountNumber: 'This field is required.',
      }));
    } else if (name === 'swiftCode' && !swiftCode) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        swiftCode: 'This field is required.',
      }));
    } else if (name === 'bankTransitNumber' && !bankTransitNumber) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        bankTransitNumber: 'This field is required.',
      }));
    } else if (name === 'bankInstitutionNumber' && !bankInstitutionNumber) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        bankInstitutionNumber: 'This field is required.',
      }));
    } else if (name === 'withdrawalAmount' && (!withdrawalAmount || withdrawalAmount < 10 || withdrawalAmount > walletAmount)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        withdrawalAmount: 'Withdrawal amount must be between $10 and your wallet balance.',
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: undefined,
      }));
    }
  };

  const handleFocus = (event) => {
    const { name } = event.target;
    setFocused((prevFocused) => ({
      ...prevFocused,
      [name]: true,
    }));
  };

  const formatCardNumber = (value) => {
    return value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
  };

  const handleCardNumberChange = (event) => {
    const { value } = event.target;
    if (/^\d*$/.test(value.replace(/\s/g, '')) && value.replace(/\s/g, '').length <= 16) {
      setNewCardNumber(formatCardNumber(value));
      if (errors.newCardNumber) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          newCardNumber: undefined,
        }));
      }
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'newCardName' && /^[a-zA-Z\s]*$/.test(value)) {
      setNewCardName(value);
    } else if (name === 'depositAmount') {
      setDepositAmount(value);
    } else if (name === 'cvv' && /^\d{0,3}$/.test(value)) {
      setCvv(value);
    } else if (name === 'accountNumber' && /^\d{0,7}$/.test(value)) {
      setAccountNumber(value);
    } else if (name === 'swiftCode' && /^[a-zA-Z0-9]{0,11}$/.test(value)) {
      setSwiftCode(value);
    } else if (name === 'bankTransitNumber' && /^\d{0,5}$/.test(value)) {
      setBankTransitNumber(value);
    } else if (name === 'withdrawalAmount') {
      setWithdrawalAmount(value);
    }

    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: undefined,
      }));
    }
  };

  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    if (name === 'bankName') {
      const bankDetail = bankDetails[value] || {};
      setBankName(value);
      setBankInstitutionNumber(bankDetail.institutionNumber || '');
      setSwiftCode(bankDetail.swiftCode || '');
      // Clear other fields when bank changes
      setAccountType('');
      setAccountNumber('');
      setBankTransitNumber('');
      setWithdrawalAmount('');
    } else if (name === 'accountType') {
      setAccountType(value);
    } else if (name === 'newExpiryMonth') {
      setNewExpiryMonth(value);
    } else if (name === 'newExpiryYear') {
      setNewExpiryYear(value);
    } else if (name === 'expiryMonth') {
      setExpiryMonth(value);
    } else if (name === 'expiryYear') {
      setExpiryYear(value);
    }

    if (errors.expiryDate || errors.selectedCard === 'Card Invalid') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        expiryDate: undefined,
        selectedCard: undefined,
      }));
    }
  };

  const toggleAddCard = () => {
    if (isAddCardExpanded) {
      // Clear errors and focused state when closing the dropdown
      setErrors({});
      setFocused({});
      // Clear form fields when closing the dropdown
      setNewCardNumber('');
      setNewCardName('');
      setNewExpiryMonth('');
      setNewExpiryYear('');
      setCvv('');
      setDepositAmount('');
    } else {
      // Clear errors outside the dropdown (except for registered cards) when opening the dropdown
      setErrors((prevErrors) => ({
        ...prevErrors,
        expiryDate: undefined,
        cvv: undefined,
        depositAmount: undefined,
      }));
      setExpiryMonth('');
      setExpiryYear('');
      setCvv('');
      setDepositAmount('');
    }
    setIsAddCardExpanded(!isAddCardExpanded);
  };

  const handleSaveCard = () => {
    const newErrors = {};

    if (!newCardNumber) {
      newErrors.newCardNumber = 'This field is required.';
    } else if (newCardNumber.replace(/\s/g, '').length !== 16) {
      newErrors.newCardNumber = 'Card number must be 16 digits.';
    }

    if (!newCardName) {
      newErrors.newCardName = 'This field is required.';
    }

    if (!newExpiryMonth || !newExpiryYear) {
      newErrors.newExpiryDate = 'This field is required.';
    }

    if (Object.keys(newErrors).length === 0) {
      const newCard = {
        number: newCardNumber,
        name: newCardName,
        expiryMonth: newExpiryMonth,
        expiryYear: newExpiryYear,
        displayName: `**** ${newCardNumber.slice(-4)} - ${newCardName}`
      };

      onSaveCard(newCard);

      // Clear the form fields and collapse the add card section
      setNewCardNumber('');
      setNewCardName('');
      setNewExpiryMonth('');
      setNewExpiryYear('');
      setCvv('');
      setIsAddCardExpanded(false);
    } else {
      setErrors(newErrors);
    }
  };

  const handleCardSelect = (event) => {
    const selectedValue = event.target.value;
    setSelectedCard(selectedValue);

    const selectedCard = registeredCards.find(card => card.displayName === selectedValue);
    if (selectedCard) {
      setExpiryMonth(selectedCard.expiryMonth);
      setExpiryYear(selectedCard.expiryYear);
    }
  };

  const handleDeposit = () => {
    const newErrors = {};

    if (!selectedCard) {
      newErrors.selectedCard = 'Please select a card.';
    }

    if (!expiryMonth || !expiryYear) {
      newErrors.expiryDate = 'This field is required.';
    }

    if (!cvv) {
      newErrors.cvv = 'This field is required.';
    }

    if (!depositAmount || depositAmount < 10) {
      newErrors.depositAmount = 'Deposit amount must be at least $10.';
    }

    const selectedCardDetails = registeredCards.find(card => card.displayName === selectedCard);
    if (selectedCardDetails && (selectedCardDetails.expiryMonth !== expiryMonth || selectedCardDetails.expiryYear !== expiryYear)) {
      newErrors.selectedCard = 'Card Invalid';
    }

    if (Object.keys(newErrors).length === 0) {
      onDeposit(parseFloat(depositAmount));
      // Save deposit-related fields to localStorage after successful deposit
      localStorage.setItem('selectedCard', selectedCard);
      localStorage.setItem('expiryMonth', expiryMonth);
      localStorage.setItem('expiryYear', expiryYear);
      setCvv('');
      setDepositAmount('');
      showNotification('success', 'Success', 'Deposit successful!');
      alert('Deposit successful!');
    } else {
      setErrors(newErrors);
    }
  };

  const handleWithdraw = () => {
    const newErrors = {};

    if (!bankName) {
      newErrors.bankName = 'This field is required.';
    }

    if (!accountType) {
      newErrors.accountType = 'This field is required.';
    }

    if (!accountNumber) {
      newErrors.accountNumber = 'This field is required.';
    }

    if (!swiftCode) {
      newErrors.swiftCode = 'This field is required.';
    }

    if (!bankTransitNumber) {
      newErrors.bankTransitNumber = 'This field is required.';
    }

    if (!bankInstitutionNumber) {
      newErrors.bankInstitutionNumber = 'This field is required.';
    }

    if (!withdrawalAmount || withdrawalAmount < 10 || withdrawalAmount > walletAmount) {
      newErrors.withdrawalAmount = 'Withdrawal amount must be between $10 and your wallet balance.';
    }

    if (Object.keys(newErrors).length === 0) {
      onWithdraw({
        bankName,
        accountType,
        accountNumber,
        swiftCode,
        bankTransitNumber,
        bankInstitutionNumber,
        amount: parseFloat(withdrawalAmount)
      });
      // Save withdraw-related fields to localStorage after successful withdrawal
      localStorage.setItem('bankName', bankName);
      localStorage.setItem('accountType', accountType);
      localStorage.setItem('accountNumber', accountNumber);
      localStorage.setItem('swiftCode', swiftCode);
      localStorage.setItem('bankTransitNumber', bankTransitNumber);
      localStorage.setItem('bankInstitutionNumber', bankInstitutionNumber);
      // Clear withdraw-related fields after successful withdrawal
      setWithdrawalAmount('');
      alert('Withdrawal successful!');
    } else {
      setErrors(newErrors);
    }
  };
  const showNotification = (type, header, message) => {
    setNotifications([...notifications, { type, header, message }]);
    setTimeout(() => {
      setNotifications((notifications) => notifications.slice(1));
    }, 3000);
  };


  if (!isOpen) return null;

  return (
    <div className={`wallet-popup ${isOpen ? 'open' : ''}`}>
      <div className="wallet-popup-content">
        <div className="wallet-popup-header">
          <h2>
            <img src={WalletVector} alt="Wallet" className="wallet-icon" /> Wallet
          </h2>
          <button className="wallet-close-btn" onClick={onClose}>×</button>
        </div>
        <div className="wallet-tabs">
          <div
            className={`wallet-tab ${activeTab === 'deposit' ? 'active' : ''}`}
            onClick={() => setActiveTab('deposit')}
          >
            Deposit
          </div>
          <div
            className={`wallet-tab ${activeTab === 'withdraw' ? 'active' : ''}`}
            onClick={() => setActiveTab('withdraw')}
          >
            Withdraw
          </div>
          <div className="wallet-tab-fill" style={{ left: activeTab === 'deposit' ? '0%' : '50%' }} />
        </div>
        <div className="wallet-balance-container">
          <div className="wallet-balance">
            ${walletAmount.toFixed(2)} <img src={DollarVector} alt="Dollar Icon" className="dollar-icon" />
          </div>
        </div>
        <div className="wallet-content">
          {activeTab === 'deposit' && (
            <div className="deposit-content">
              <label htmlFor="registered-cards">Registered Cards</label>
              <select
                id="registered-cards"
                value={selectedCard}
                onChange={handleCardSelect}
                onBlur={handleBlur}
                onFocus={handleFocus}
                name="selectedCard"
                className={errors.selectedCard ? (focused.selectedCard ? 'select-error-focused' : 'select-error') : ''}
              >
                <option value="" disabled>Select a card</option>
                {registeredCards.map((card, index) => (
                  <option key={index} value={card.displayName}>{card.displayName}</option>
                ))}
              </select>
              {errors.selectedCard && (
                <div className="error-message">
                  <img src={ErrorVector} alt="Error" /> {errors.selectedCard}
                </div>
              )}
              <div className="add-new-card-container">
                <button
                  className={`add-new-card-btn ${isAddCardExpanded ? 'expanded' : ''}`}
                  onClick={toggleAddCard}
                >
                  <img src={PlusIcon} alt="Plus Icon" className="plus-icon" /> Add New Card
                  {isAddCardExpanded && (
                    <button className="add-new-card-close-btn" onClick={toggleAddCard}>×</button>
                  )}
                </button>
                {isAddCardExpanded && (
                  <div className="add-new-card-dropdown">
                    <input
                      type="text"
                      placeholder="Card Number"
                      value={newCardNumber}
                      onChange={handleCardNumberChange}
                      onBlur={handleBlur}
                      onFocus={handleFocus}
                      name="newCardNumber"
                      className={errors.newCardNumber ? (focused.newCardNumber ? 'input-error-focused' : 'input-error') : ''}
                    />
                    {errors.newCardNumber && (
                      <div className="error-message">
                        <img src={ErrorVector} alt="Error" /> {errors.newCardNumber}
                      </div>
                    )}
                    <input
                      type="text"
                      placeholder="Name on Card"
                      value={newCardName}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      onFocus={handleFocus}
                      name="newCardName"
                      className={errors.newCardName ? (focused.newCardName ? 'input-error-focused' : 'input-error') : ''}
                    />
                    {errors.newCardName && (
                      <div className="error-message">
                        <img src={ErrorVector} alt="Error" /> {errors.newCardName}
                      </div>
                    )}
                    <div className="expiry-date">
                      <label htmlFor="new-expiry-month">Expiry Date</label>
                      <div className="expiry-month-year">
                        <select
                          id="new-expiry-month"
                          value={newExpiryMonth}
                          onChange={handleSelectChange}
                          onBlur={handleBlur}
                          onFocus={handleFocus}
                          name="newExpiryMonth"
                          className={errors.newExpiryDate ? (focused.newExpiryMonth ? 'select-error-focused' : 'select-error') : ''}
                        >
                          <option value="" disabled>MM</option>
                          {Array.from({ length: 12 }, (_, i) => (
                            <option key={i + 1} value={(i + 1).toString().padStart(2, '0')}>
                              {(i + 1).toString().padStart(2, '0')}
                            </option>
                          ))}
                        </select>
                        <select
                          id="new-expiry-year"
                          value={newExpiryYear}
                          onChange={handleSelectChange}
                          onBlur={handleBlur}
                          onFocus={handleFocus}
                          name="newExpiryYear"
                          className={errors.newExpiryDate ? (focused.newExpiryYear ? 'select-error-focused' : 'select-error') : ''}
                        >
                          <option value="" disabled>YY</option>
                          {Array.from({ length: 27 }, (_, i) => (
                            <option key={2024 + i} value={(24 + i).toString().padStart(2, '0')}>
                              {(24 + i).toString().padStart(2, '0')}
                            </option>
                          ))}
                        </select>
                      </div>
                      {errors.newExpiryDate && (
                        <div className="error-message">
                          <img src={ErrorVector} alt="Error" /> {errors.newExpiryDate}
                        </div>
                      )}
                    </div>
                    <button className="save-card-btn" onClick={handleSaveCard}>Save</button>
                  </div>
                )}
              </div>
              {!isAddCardExpanded && (
                <>
                  <div className="expiry-date-cvv">
                    <div className="expiry-date">
                      <label htmlFor="expiry-month-deposit">Expiry Date</label>
                      <div className="expiry-month-year">
                        <select
                          id="expiry-month-deposit"
                          value={expiryMonth}
                          onChange={handleSelectChange}
                          onBlur={handleBlur}
                          onFocus={handleFocus}
                          name="expiryMonth"
                          className={errors.expiryDate ? (focused.expiryMonth ? 'select-error-focused' : 'select-error') : ''}
                        >
                          <option value="" disabled>MM</option>
                          {Array.from({ length: 12 }, (_, i) => (
                            <option key={i + 1} value={(i + 1).toString().padStart(2, '0')}>
                              {(i + 1).toString().padStart(2, '0')}
                            </option>
                          ))}
                        </select>
                        <select
                          id="expiry-year-deposit"
                          value={expiryYear}
                          onChange={handleSelectChange}
                          onBlur={handleBlur}
                          onFocus={handleFocus}
                          name="expiryYear"
                          className={errors.expiryDate ? (focused.expiryYear ? 'select-error-focused' : 'select-error') : ''}
                        >
                          <option value="" disabled>YY</option>
                          {Array.from({ length: 27 }, (_, i) => (
                            <option key={2024 + i} value={(24 + i).toString().padStart(2, '0')}>
                              {(24 + i).toString().padStart(2, '0')}
                            </option>
                          ))}
                        </select>
                      </div>
                      {errors.expiryDate && (
                        <div className="error-message">
                          <img src={ErrorVector} alt="Error" /> {errors.expiryDate}
                        </div>
                      )}
                    </div>
                    <div className="cvv">
                      <label htmlFor="cvv">CVV</label>
                      <input
                        type="text"
                        id="cvv"
                        value={cvv}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        onFocus={handleFocus}
                        name="cvv"
                        maxLength="3"
                        pattern="\d{0,3}"
                        className={errors.cvv ? (focused.cvv ? 'input-error-focused' : 'input-error') : ''}
                      />
                      {errors.cvv && (
                        <div className="error-message">
                          <img src={ErrorVector} alt="Error" /> {errors.cvv}
                        </div>
                      )}
                    </div>
                  </div>
                  <label htmlFor="deposit-amount">Deposit Amount (min $10)</label>
                  <input
                    type="number"
                    id="deposit-amount"
                    value={depositAmount}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    min="10"
                    name="depositAmount"
                    className={errors.depositAmount ? (focused.depositAmount ? 'input-error-focused' : 'input-error') : ''}
                  />
                  {errors.depositAmount && (
                    <div className="error-message">
                      <img src={ErrorVector} alt="Error" /> {errors.depositAmount}
                    </div>
                  )}
                  <button className="deposit-btn" onClick={handleDeposit}>Deposit</button>
                </>
              )}
            </div>
          )}
          {activeTab === 'withdraw' && (
            <div className="withdraw-content">
              <label htmlFor="bank-name">Bank Name</label>
              <select
                id="bank-name"
                value={bankName}
                onChange={handleSelectChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
                name="bankName"
                className={errors.bankName ? (focused.bankName ? 'select-error-focused' : 'select-error') : ''}
              >
                <option value="" disabled>Select a bank</option>
                {Object.keys(bankDetails).map((bank) => (
                  <option key={bank} value={bank}>{bank}</option>
                ))}
              </select>
              {errors.bankName && (
                <div className="error-message">
                  <img src={ErrorVector} alt="Error" /> {errors.bankName}
                </div>
              )}
              <label htmlFor="account-type">Account Type</label>
              <select
                id="account-type"
                value={accountType}
                onChange={handleSelectChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
                name="accountType"
                className={errors.accountType ? (focused.accountType ? 'select-error-focused' : 'select-error') : ''}
              >
                <option value="" disabled>Select account type</option>
                <option value="savings">Savings</option>
                <option value="current">Current</option>
                <option value="deposit">Deposit</option>
              </select>
              {errors.accountType && (
                <div className="error-message">
                  <img src={ErrorVector} alt="Error" /> {errors.accountType}
                </div>
              )}
              <label htmlFor="account-number">Account Number</label>
              <input
                type="text"
                id="account-number"
                value={accountNumber}
                onChange={handleInputChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
                name="accountNumber"
                className={errors.accountNumber ? (focused.accountNumber ? 'input-error-focused' : 'input-error') : ''}
              />
              {errors.accountNumber && (
                <div className="error-message">
                  <img src={ErrorVector} alt="Error" /> {errors.accountNumber}
                </div>
              )}
              <label htmlFor="swift-code">SWIFT/BIC Code</label>
              <input
                type="text"
                id="swift-code"
                value={swiftCode}
                onChange={handleInputChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
                name="swiftCode"
                className={errors.swiftCode ? (focused.swiftCode ? 'input-error-focused' : 'input-error') : ''}
                readOnly
              />
              {errors.swiftCode && (
                <div className="error-message">
                  <img src={ErrorVector} alt="Error" /> {errors.swiftCode}
                </div>
              )}
              <div className="bank-codes">
                <div className="bank-code">
                  <label htmlFor="bank-transit-number">Bank Transit Number</label>
                  <input
                    type="text"
                    id="bank-transit-number"
                    value={bankTransitNumber}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    name="bankTransitNumber"
                    className={errors.bankTransitNumber ? (focused.bankTransitNumber ? 'input-error-focused' : 'input-error') : ''}
                  />
                  {errors.bankTransitNumber && (
                    <div className="error-message">
                      <img src={ErrorVector} alt="Error" /> {errors.bankTransitNumber}
                    </div>
                  )}
                </div>
                <div className="bank-code">
                  <label htmlFor="bank-institution-number">Bank Institution Number</label>
                  <input
                    type="text"
                    id="bank-institution-number"
                    value={bankInstitutionNumber}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    name="bankInstitutionNumber"
                    className={errors.bankInstitutionNumber ? (focused.bankInstitutionNumber ? 'input-error-focused' : 'input-error') : ''}
                    readOnly
                  />
                  {errors.bankInstitutionNumber && (
                    <div className="error-message">
                      <img src={ErrorVector} alt="Error" /> {errors.bankInstitutionNumber}
                    </div>
                  )}
                </div>
              </div>
              <label htmlFor="withdrawal-amount">Withdrawal Amount (min $10)</label>
              <div className="withdrawal-amount-container">
                <input
                  type="number"
                  id="withdrawal-amount"
                  value={withdrawalAmount}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  onFocus={handleFocus}
                  min="10"
                  name="withdrawalAmount"
                  className={errors.withdrawalAmount ? (focused.withdrawalAmount ? 'input-error-focused' : 'input-error') : ''}
                />
              </div>
              {errors.withdrawalAmount && (
                <div className="error-message">
                  <img src={ErrorVector} alt="Error" /> {errors.withdrawalAmount}
                </div>
              )}
              <button className="withdraw-btn" onClick={handleWithdraw}>Withdraw</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WalletPopup;
