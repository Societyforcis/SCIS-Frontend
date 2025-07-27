import React from 'react';

const RouteTransitionLoader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50">
      <div className="h-full bg-red-500 animate-route-progress"></div>
    </div>
  );
};

export default RouteTransitionLoader;
