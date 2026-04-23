import { useState, useEffect, useRef } from 'react';
import { EntryScreen } from './screens/EntryScreen';
import { MaterialScreen } from './screens/MaterialScreen';
import { ThicknessScreen } from './screens/ThicknessScreen';
import { LocationScreen } from './screens/LocationScreen';
import { OpeningScreen } from './screens/OpeningScreen';
import { AccessScreen } from './screens/AccessScreen';
import { ConnectivityScreen } from './screens/ConnectivityScreen';
import { LoadingScreen } from './screens/LoadingScreen';
import { ResultsScreen } from './screens/ResultsScreen';

const SCREENS = ['entry','material','thickness','location','opening','access','connectivity','loading','results'];

const INITIAL_ANSWERS = {
  material: null, thickness: null, location: null,
  opening: null, accessMethods: [], connectivity: [], connectivityNone: false,
};

export default function App() {
  const [screenIdx, setScreenIdx] = useState(0);
  const [dir, setDir] = useState('forward');
  const [answers, setAnswers] = useState(INITIAL_ANSWERS);
  const screenKey = useRef(0);

  useEffect(() => {
    const saved = localStorage.getItem('ezon_finder_screen');
    if (saved) setScreenIdx(parseInt(saved, 10));
  }, []);
  useEffect(() => {
    localStorage.setItem('ezon_finder_screen', String(screenIdx));
  }, [screenIdx]);

  const goNext = () => { setDir('forward'); screenKey.current++; setScreenIdx(i => Math.min(i + 1, SCREENS.length - 1)); };
  const goBack = () => { setDir('back'); screenKey.current++; setScreenIdx(i => Math.max(i - 1, 0)); };
  const goTo = (name) => { setDir('forward'); screenKey.current++; setScreenIdx(SCREENS.indexOf(name)); };

  const screen = SCREENS[screenIdx];
  const props = { answers, setAnswers, onNext: goNext, onBack: goBack, dir };

  return (
    <div key={screenKey.current} style={{ minHeight: '100%' }}>
      {screen === 'entry'        && <EntryScreen onStart={goNext}/>}
      {screen === 'material'     && <MaterialScreen {...props}/>}
      {screen === 'thickness'    && <ThicknessScreen {...props}/>}
      {screen === 'location'     && <LocationScreen {...props}/>}
      {screen === 'opening'      && <OpeningScreen {...props}/>}
      {screen === 'access'       && <AccessScreen {...props}/>}
      {screen === 'connectivity' && <ConnectivityScreen {...props}/>}
      {screen === 'loading'      && <LoadingScreen onDone={() => goTo('results')} dir={dir}/>}
      {screen === 'results'      && <ResultsScreen onRestart={() => { setAnswers(INITIAL_ANSWERS); goTo('entry'); }} dir={dir}/>}
    </div>
  );
}
