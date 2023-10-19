import React from 'react';

/**
 * ExpandableList Component.
 * This component displays a list of items that can be expanded to show all items or collapsed to show a limited number.
 * 
 * @component
 * @param {Object} props - Props for the component.
 * @param {string} props.title - Title for the list.
 * @param {Array} [props.items=[]] - Array of items to display.
 * @param {number} [props.maxVisibleItems=3] - Maximum number of items to display without expanding.
 * @returns {React.ReactNode}
 */
const ExpandableList = ({ title, items = [], maxVisibleItems = 3 }) => {
    const [showAll, setShowAll] = React.useState(false);

    /**
     * Get all or a limited number of items based on the `showAll` state and `maxVisibleItems` prop.
     * 
     * @param {Array} AllItems - List of all items.
     * @returns {string} - Formatted string based on the visibility and number of items.
     */
    const getAllItems = (AllItems) => {
        if (!AllItems || !Array.isArray(AllItems) || AllItems.length === 0) {
            return 'N/A';
        }
    
        if (AllItems.length <= maxVisibleItems) {
            return AllItems.join(", ");
        }
    
        if (showAll) {
            return AllItems.join(", ");
        } else {
            return `${AllItems.slice(0, maxVisibleItems).join(", ")}...`;
        }
    };

    return (
      <div className="row">
        <p className="title">{title}:</p>
        <p>
          {getAllItems(items)}
          {items.length > maxVisibleItems && (
            showAll ? 
            (<span onClick={() => setShowAll(false)} style={{cursor: 'pointer', color: 'blue'}}> Less</span>) :
            (<span onClick={() => setShowAll(true)} style={{cursor: 'pointer', color: 'blue'}}> More</span>)
          )}
        </p>
      </div>
    );
};

export default ExpandableList;
