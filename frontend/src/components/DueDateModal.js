import React, { useEffect, useRef, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import TimePicker from 'react-time-picker';
// import "../calenderStyles.css";

const DueDateModal = ({ onCancel, onSave, buttonRef }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('12:00');
  const [inputDate, setInputDate] = useState('');
  const [isDateValid, setIsDateValid] = useState(true);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  
  useEffect(() => {
    if (buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const modalRect = modalRef.current.getBoundingClientRect();

      const top = buttonRect.bottom + window.scrollY-450;
      const left = buttonRect.left + window.scrollX - modalRect.width / 2 + buttonRect.width / 2 -1400;

      setModalPosition({ top, left });
    }
  }, [buttonRef]);

  const modalRef = useRef(null);

  const handleSave = (selectedDate, selectedTime) => {
    // Parse the selected time
    const [hours, minutes] = selectedTime.split(':');
  
    // Create a new Date object using the selected date and time
    const combinedDateTime = new Date(selectedDate);
    combinedDateTime.setHours(hours, minutes);
  
    console.log('From Modal:', combinedDateTime);
    // Pass the combined date and time to onSave
    onSave(combinedDateTime);
  };
  

  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !modalRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
   
        handleSave(selectedDate, selectedTime);
        onCancel();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [buttonRef, onCancel, selectedDate, selectedTime]);

  
  const handleDateChange = (e) => {
    const inputDateString = e.target.value;
    setInputDate(inputDateString);
  
    // Regular expression to match the format 'DD/MM/YYYY'
    const dateFormatRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/\d{4}$/;
  
    // Check if the input string matches the expected date format
    if (dateFormatRegex.test(inputDateString)) {
      const [day, month, year] = inputDateString.split('/');
      const inputDate = new Date(`${year}-${month}-${day}`);
      const today = new Date();
  
      // Check if the input date is not before today
      if (inputDate >= today) {
        setIsDateValid(true);
        setSelectedDate(inputDate);
      } else {
        setIsDateValid(false);
        setSelectedDate(null);
      }
    } else {
      // Reset selected date and set isDateValid to false if the format is incorrect
      setSelectedDate(null);
      setSelectedTime('12:00');
      setIsDateValid(false);
    }
  };
  

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center"  style={{ top: modalPosition.top, left: modalPosition.left}}>
  <div ref={modalRef} className="bg-white p-2 overflow-y-auto max-w-xs">
    <input
      type="text"
      placeholder="Type a due date"
      value={inputDate}
      onChange={handleDateChange}
      className={`w-full border border-white mb-2 focus:outline-none ${
        !isDateValid ? 'border-red-500' : ''
      }`}
    />
    <hr className="border-gray-300 mb-4" />
    {!isDateValid && <p className="text-red-500 text-xs mb-2">Please enter a valid date.</p>}
  
    <Calendar
      onChange={handleDateClick}
      value={selectedDate}
      className="mb-4 p-1 react-calendar"
    />
    <h3 className="text-sm font-semibold mb-1">Select Due Time</h3>
    <input
      type="time"
      value={selectedTime}
      onChange={(e) => setSelectedTime(e.target.value)}
      className="w-full border border-gray-300 rounded-md px-2 py-1 text-gray-800 font-semibold"
      style={{ marginBottom: '8px' }} // Example inline styles
    />
    <div className="text-right"></div>
  </div>
</div>

  );
};

export default DueDateModal;
