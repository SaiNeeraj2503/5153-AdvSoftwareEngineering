import React, { useState } from 'react';
import axios from 'axios';

const Feedback = ({userId, email}) => {
    const [feedback, setFeedback] = useState('');
    const [usageFrequency, setUsageFrequency] = useState('');
    const [motivation, setMotivation] = useState('');
    const [mostUsedFeature, setMostUsedFeature] = useState('');
    const [improvements, setImprovements] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
        

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true);
        try {
            const formData = {
                userId: userId,
                email: email,
                feedback: feedback,
                usageFrequency: usageFrequency,
                motivation: motivation,
                mostUsedFeature: mostUsedFeature,
                improvements: improvements,
            };

        const response = await axios.post('http://localhost:8000/app/save-feedback', formData);
        console.log('Server response:', response.data);

        setFeedback('');
        setUsageFrequency('');
        setMotivation('');
        setMostUsedFeature('');
        setImprovements('');

        } catch (error) {
        console.error('Error submitting feedback:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">🚀 Help Us Improve 🚀</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="usageFrequency" className="block text-gray-700 font-bold mb-2">🔄 How often do you use our app?</label>
            <input
              type="text"
              id="usageFrequency"
              className="border border-gray-300 rounded-md p-2 w-full"
              value={usageFrequency}
              onChange={(e) => setUsageFrequency(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="motivation" className="block text-gray-700 font-bold mb-2">🌟 What is the motivation to use our app?</label>
            <input
              type="text"
              id="motivation"
              className="border border-gray-300 rounded-md p-2 w-full"
              value={motivation}
              onChange={(e) => setMotivation(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="mostUsedFeature" className="block text-gray-700 font-bold mb-2">⭐ What is your most used feature?</label>
            <input
              type="text"
              id="mostUsedFeature"
              className="border border-gray-300 rounded-md p-2 w-full"
              value={mostUsedFeature}
              onChange={(e) => setMostUsedFeature(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="improvements" className="block text-gray-700 font-bold mb-2">🔧 What would you like to see improved or added?</label>
            <input
              type="text"
              id="improvements"
              className="border border-gray-300 rounded-md p-2 w-full"
              value={improvements}
              onChange={(e) => setImprovements(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="feedback" className="block text-gray-700 font-bold mb-2">📝 Other Feedback</label>
            <textarea
              id="feedback"
              className="border border-gray-300 rounded-md p-2 w-full resize-none"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 w-full"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
