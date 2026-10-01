export function HeroImage({ style, className, children }) {
  return (
    <div
      className={className}
      style={{
        backgroundImage: 'url("/assets/img/entry-bg.webp")',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 10,
        position: 'relative',
        overflow: 'hidden',
        ...style
      }}
    >
      {children}
    </div>
  );
}
