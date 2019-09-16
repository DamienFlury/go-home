import React, { useState } from 'react';
import './App.css';
import {
  MuiThemeProvider, createMuiTheme, CssBaseline,
} from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import { ThemeProvider } from 'styled-components';
import { useSelector } from 'react-redux';
import { StylesProvider } from '@material-ui/styles';
import styled from 'styled-components';
import NavBar from './components/NavBar';
import Widgets from './components/Widgets/Widgets';
import Settings from './components/Settings';
import { StoreState } from './store/store';
import { ThemeType, BackgroundType } from './store/actions/settings-actions';

const Wrapper = styled.div`
  min-height: 100vh;
`;

const ImageWrapper = styled(Wrapper)`
  background-image: url(https://picsum.photos/1024/1024);
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;
`;
interface BackgroundWrapperProps {
  backgroundColor: string
};
const BackgroundWrapper = styled(Wrapper)`
  background-color: ${(props: BackgroundWrapperProps) => props.backgroundColor};
`;

interface IBackgroundProps {
  type: BackgroundType
}

const Background: React.FC<IBackgroundProps> = ({type, children}) => {
  switch(type) {
    case 'dark':
      return <BackgroundWrapper backgroundColor="#2F2F2F">{children}</BackgroundWrapper>;
    case 'light':
      return <BackgroundWrapper backgroundColor="#ffffff">{children}</BackgroundWrapper>;
    case 'image':
      return <ImageWrapper>{children}</ImageWrapper>;
    default:
      return <Wrapper>{children}</Wrapper>;
  }
}



const App: React.FC = () => {
  const [showSettings, setShowSettings] = useState(false);

  const type = useSelector((state: StoreState) => state.settings.theme.type as ThemeType);

  const background = useSelector((state: StoreState) => state.settings.background);

  let themeType = type;

  if (type === 'default' && window && window.matchMedia) {
    const prefersDarkTheme = window.matchMedia('(prefers-color-scheme: dark)');
    themeType = (prefersDarkTheme.matches ? 'dark' : 'light');
    prefersDarkTheme.onchange = () => {
      themeType = (prefersDarkTheme.matches ? 'dark' : 'light');
    };
  }


  const theme = createMuiTheme({
    palette: {
      type: themeType === 'default' ? undefined : themeType,
      primary: blue,
    },
  });

  return (
    <StylesProvider injectFirst>
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <Background type={background}>
            <CssBaseline />
            <NavBar onClick={() => setShowSettings(prev => !prev)} />
            {showSettings ? <Settings />
              : <Widgets />}
          </Background>
        </ThemeProvider>
      </MuiThemeProvider>
    </StylesProvider>
  );
}

export default App;