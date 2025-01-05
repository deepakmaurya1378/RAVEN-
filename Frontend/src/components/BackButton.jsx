import { FaArrowLeft } from 'react-icons/fa'; // Import the icons from FontAwesome
import { useNavigate } from 'react-router-dom'; // For navigation

const BackButton = () => {
  const navigate = useNavigate(); // Hook for navigation

  const handleBack = () => {
    navigate('/'); // Go back to the previous page
  };

  return (
    <div className="flex space-x-2">
      <button
        onClick={handleBack}
        className="p-2 bg-base-300 rounded-full flex items-center"
      >
        <FaArrowLeft size={24} />
        <span className="ml-2">Back</span>
      </button>
    </div>
  );
};

export default BackButton;