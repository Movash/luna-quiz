import { FC } from 'react';
import { InfinitySpin } from 'react-loader-spinner';

const Loader: FC = () => {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <InfinitySpin />
    </div>
  );
};

export default Loader;
