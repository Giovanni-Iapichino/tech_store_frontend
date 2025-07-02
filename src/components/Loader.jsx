import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function Loader({ isLoading }) {
  if (!isLoading) return null;

  return (
    <>
      <div className="spinner">
        <FontAwesomeIcon icon={faSpinner} spin size="5x" />
        <h1> Loading...</h1>
      </div>
    </>
  );
}