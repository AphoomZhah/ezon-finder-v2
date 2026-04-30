export function Screen({ children, dir = 'forward', style, className }) {
  const animClass = dir === 'back' ? 'screen-back' : 'screen-forward';
  const combinedClass = className ? `${animClass} ${className}` : animClass;
  return (
    <div className={combinedClass}
      style={{ height: '100vh', overflowY: 'auto', display: 'flex', flexDirection: 'column', ...style }}>
      {children}
    </div>
  );
}
