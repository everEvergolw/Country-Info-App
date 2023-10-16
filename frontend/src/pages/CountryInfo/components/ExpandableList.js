import React from 'react';

const ExpandableList = ({ title, items = [], maxVisibleItems = 3 }) => {
    const [showAll, setShowAll] = React.useState(false);

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
