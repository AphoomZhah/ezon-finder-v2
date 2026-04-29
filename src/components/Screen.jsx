export function Screen({ children, dir = 'forward', style }) {
  return (
    <div className={dir === 'back' ? 'screen-back' : 'screen-forward'}
      style={{ height: '100vh', overflowY: 'auto', display: 'flex', flexDirection: 'column', ...style }}>
      {children}
    </div>
  );
}
