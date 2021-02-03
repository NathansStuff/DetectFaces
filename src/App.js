import './App.css';
import Navigation from './components/navigation/navigation';
import Logo from './components/logo/logo';
import ImageLinkForm from './components/imageLinkForm/imageLinkForm';
import Rank from './components/rank/rank';
import Particles from 'react-particles-js';
import React, { Component } from 'react';
import Clarifai from 'clarifai';
import FaceRecognition from './components/faceRecognition/faceRecognition';

const app = new Clarifai.App({
  apiKey: '761a1eca0789456c8badd7f6b00bf445',
});

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

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: [],
    };
  }

  calculateFaceLocation = data => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const img = document.getElementById('inputImage');
    const width = Number(img.width);
    const height = Number(img.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  displayFaceBox = box => {
    this.setState({ box: box });
    console.log(box)
  };

  onInputChange = e => {
    this.setState({ input: e.target.value });
  };

  onSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    //  https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => {
        this.displayFaceBox(this.calculateFaceLocation(response));
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className='App'>
        <Particles className='particles' params={particleOptions} />

        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onSubmit={this.onSubmit}
        />

        <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}
export default App;
