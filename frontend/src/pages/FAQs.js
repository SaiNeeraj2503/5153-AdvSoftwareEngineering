import { useState } from 'react';

function FaqItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between border-b border-gray-300 py-2">
        <h3 className="text-lg font-medium text-gray-700">{question}</h3>
        <button
          className="text-gray-500 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          )}
        </button>
      </div>
      {isOpen && <p className="text-gray-700 mt-2">{answer}</p>}
    </div>
  );
}

function FAQs() {
  return (
    <div className="bg-white shadow rounded-lg p-6 mb-8">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
        Frequently Asked Questions (FAQs)
      </h2>
      <FaqItem
        question="Question 1?"
        answer="Answer to question 1."
      />
      <FaqItem
        question="Question 2?"
        answer="Answer to question 2."
      />
      {/* Add more FAQs as needed */}
    </div>
  );
}

export default FAQs;
