export function Screen({ children, dir = 'forward', style }) {
  return (
    <div className={dir === 'back' ? 'screen-back' : 'screen-forward'}
      style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', ...style }}>
      {children}
    </div>
  );
}
