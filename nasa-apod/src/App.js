import React from 'react';
import ViewerTemplate from "./components/ViewerTemplate";
import SpaceNavigator from "./components/SpaceNavigator";
import Viewer from "./components/Viewer";

const App = () => {
  return (
    <div>
      <ViewerTemplate
          spaceNavigator={<SpaceNavigator/>}
          viewer={(
              <Viewer
                  url="https://www.youtube.com/embed/uj3Lq7Gu94Y?rel=0"
                  mediaType="video"/>
              )}
      />
    </div>
  );
};

export default App;
