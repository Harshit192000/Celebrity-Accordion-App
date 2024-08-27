import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faEdit,
  faCheckCircle,
  faTimesCircle,
  faChevronUp,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import "./Accordion.css"; 

const Accordion = ({ celeb, onEdit, onDelete, editingId, setEditingId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCeleb, setEditedCeleb] = useState(celeb);
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);

  useEffect(() => {
    if (editingId === celeb.id) {
      setIsEditing(true);
      setIsOpen(true); 
    } else {
      setIsEditing(false);
      setEditedCeleb(celeb);
    }
  }, [editingId, celeb]);

  useEffect(() => {
    const hasChanges = Object.keys(editedCeleb).some(
      (key) => editedCeleb[key] !== celeb[key]
    );
    setIsSaveEnabled(hasChanges);
  }, [editedCeleb, celeb]);

  const handleToggle = () => {
    if (isEditing) {
      return;
    }
    setIsOpen(!isOpen);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "fullName") {
      const [first, ...last] = value.split(" ");
      setEditedCeleb((prev) => ({
        ...prev,
        first: first || "",
        last: last.join(" ") || "",
      }));
    } else {
      setEditedCeleb((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSave = () => {
    if (
      !editedCeleb.first.trim() ||
      !editedCeleb.last.trim() ||
      !editedCeleb.gender.trim() ||
      !editedCeleb.country.trim() ||
      !editedCeleb.description.trim()
    ) {
      alert("All fields must be filled out.");
      return;
    }

    onEdit(editedCeleb);
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditedCeleb(celeb);
    setEditingId(null);
  };

  return (
    <div className="mb-4 border rounded-lg bg-white shadow-md max-w-xl mx-auto">
      <div
        onClick={handleToggle}
        className="p-4 cursor-pointer flex justify-between items-center"
      >
        <span className="flex items-center space-x-2">
          <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
          {isEditing ? (
            <input
              name="fullName"
              value={`${editedCeleb.first} ${editedCeleb.last}`}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              placeholder="First and Last Name"
              onClick={(e) => e.stopPropagation()} 
            />
          ) : (
            <span className="font-semibold text-lg">{`${celeb.first} ${celeb.last}`}</span>
          )}
        </span>
        <FontAwesomeIcon
          icon={isOpen ? faChevronUp : faChevronDown}
          className="text-gray-500"
        />
      </div>
      {isOpen && (
        <div className="px-6 py-4">
          <div className="flex flex-col space-y-4">
            <div className="flex space-x-8">
              {" "}
              {/* Added space-x-8 for horizontal spacing */}
              <div className="flex flex-col w-1/3">
                <span className="font-semibold">Age</span>
                {isEditing ? (
                  <input
                    type="date"
                    name="dob"
                    value={editedCeleb.dob}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                  />
                ) : (
                  <span>
                    {Math.floor(
                      (new Date().getTime() - new Date(celeb.dob).getTime()) /
                        (1000 * 3600 * 24 * 365.25)
                    )}{" "}
                    Years
                  </span>
                )}
              </div>
              <div className="flex flex-col w-1/3">
                <span className="font-semibold">Gender</span>
                {isEditing ? (
                  <select
                    name="gender"
                    value={editedCeleb.gender}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Transgender">Transgender</option>
                    <option value="Rather not say">Rather not say</option>
                    <option value="Other">Other</option>
                  </select>
                ) : (
                  <span>{celeb.gender}</span>
                )}
              </div>
              <div className="flex flex-col w-1/3">
                <span className="font-semibold">Country</span>
                {isEditing ? (
                  <input
                    name="country"
                    value={editedCeleb.country}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                  />
                ) : (
                  <span>{celeb.country}</span>
                )}
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold">Description</span>
              {isEditing ? (
                <textarea
                  name="description"
                  value={editedCeleb.description}
                  onChange={handleChange}
                  className="border p-3 rounded w-full no-scrollbar" 
                  rows={3}
                />
              ) : (
                <span>{celeb.description}</span>
              )}
            </div>
            <div className="flex justify-end space-x-4">
              {isEditing ? (
                <>
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className={`cursor-pointer ${
                      isSaveEnabled ? "text-green-500" : "text-gray-400"
                    }`}
                    onClick={isSaveEnabled ? handleSave : undefined}
                    size="lg"
                  />
                  <FontAwesomeIcon
                    icon={faTimesCircle}
                    className="text-red-500 cursor-pointer"
                    onClick={handleCancel}
                    size="lg"
                  />
                </>
              ) : (
                <>
                  <FontAwesomeIcon
                    icon={faTrashAlt}
                    className="text-red-500 cursor-pointer"
                    onClick={onDelete}
                    size="lg"
                  />
                  <FontAwesomeIcon
                    icon={faEdit}
                    className="text-blue-500 cursor-pointer"
                    onClick={() => setEditingId(celeb.id)}
                    size="lg"
                  />
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

Accordion.propTypes = {
  celeb: PropTypes.shape({
    id: PropTypes.number.isRequired,
    first: PropTypes.string.isRequired,
    last: PropTypes.string.isRequired,
    dob: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  editingId: PropTypes.number,
  setEditingId: PropTypes.func.isRequired,
};

export default Accordion;
