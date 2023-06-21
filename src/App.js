import { useState } from 'react';
import SegmentEdit from './components/SegmentEdit';
import DrawSegments from './components/SegmentEdit/DrawSegments';
function App() {
  const [shouldDelete, setShouldDelete] = useState(true);
  return (
    <div className='App'>
      <DrawSegments shouldDelete={shouldDelete} />
      <input
        type='button'
        value={`${shouldDelete ? 'disable' : 'enable'} delete points`}
        onClick={(event) => {
          setShouldDelete((prevState) => !prevState);
        }}
      />
    </div>
  );
}

export default App;
