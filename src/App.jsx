import { useState } from 'react';
import { getViableLockTypes } from './data/matcher';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { EntryScreen } from './screens/EntryScreen';
import { MaterialScreen } from './screens/MaterialScreen';
import { ThicknessScreen } from './screens/ThicknessScreen';
import { DoorTypeScreen } from './screens/DoorTypeScreen';
import { AccessScreen } from './screens/AccessScreen';
import { FunctionsScreen } from './screens/FunctionsScreen';
import { LockTypeScreen } from './screens/LockTypeScreen';
import { IncompatibleScreen } from './screens/IncompatibleScreen';
import { LoadingScreen } from './screens/LoadingScreen';
import { ResultsScreen } from './screens/ResultsScreen';

const INITIAL_ANSWERS = {
  material: null,
  doorType: null,
  thickness: null,
  location: null,
  accessMethods: [],
  functions: [],
  functionsNone: false,
  lockType: null,
};

export default function App() {
  const [answers, setAnswers] = useState(INITIAL_ANSWERS);
  const [dir, setDir] = useState('forward');
  const navigate = useNavigate();

  const go = (path, direction = 'forward') => {
    setDir(direction);
    navigate(path);
  };

  const reset = () => {
    setAnswers(INITIAL_ANSWERS);
    go('/');
  };

  const p = { answers, setAnswers, dir };

  return (
    <Routes>
      <Route path="/" element={
        <EntryScreen onStart={() => go('/material')}/>
      }/>

      <Route path="/material" element={
        <MaterialScreen {...p}
          onNext={() => go('/door-type')}
          onBack={() => go('/', 'back')}/>
      }/>

      <Route path="/incompatible" element={
        <IncompatibleScreen onRestart={reset}/>
      }/>

      <Route path="/door-type" element={
        <DoorTypeScreen {...p}
          onNext={() => go('/thickness')}
          onBack={() => go('/material', 'back')}/>
      }/>

      <Route path="/thickness" element={
        <ThicknessScreen {...p}
          onNext={() => {
            const viableLockTypes = getViableLockTypes(answers);
            if (viableLockTypes.length === 1) {
              setAnswers(a => ({ ...a, lockType: viableLockTypes[0] }));
              go('/access');
            } else {
              go('/lock-type');
            }
          }}
          onBack={() => go('/door-type', 'back')}/>
      }/>

      <Route path="/lock-type" element={
        <LockTypeScreen {...p}
          onNext={() => go('/access')}
          onBack={() => go('/thickness', 'back')}/>
      }/>

      <Route path="/access" element={
        <AccessScreen {...p}
          onNext={() => go('/functions')}
          onBack={() => go('/lock-type', 'back')}/>
      }/>

      <Route path="/functions" element={
        <FunctionsScreen {...p}
          onNext={() => go('/loading')}
          onBack={() => go('/access', 'back')}/>
      }/>

      <Route path="/loading" element={
        <LoadingScreen dir={dir} onDone={() => go('/results')}/>
      }/>

      <Route path="/results" element={
        <ResultsScreen answers={answers} onRestart={reset} dir={dir}/>
      }/>

      <Route path="*" element={<Navigate to="/" replace/>}/>
    </Routes>
  );
}
