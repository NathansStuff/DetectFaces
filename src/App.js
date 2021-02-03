import './App.css';
import Navigation from './components/navigation/navigation';
import Logo from './components/logo/logo';
import ImageLinkForm from './components/imageLinkForm/imageLinkForm';
import Rank from './components/rank/rank';
import Particles from 'react-particles-js';

const particleOptions = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 500,
      },
    },
  },
};

function App() {
  return (
    <div className='App'>
      <Particles className='particles' params={particleOptions} />

      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />

      {/*
    <FaceRecognition />*/}
    </div>
  );
}

export default App;
