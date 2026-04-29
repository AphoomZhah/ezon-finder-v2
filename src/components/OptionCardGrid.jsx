import { VERDE, BORDER_REST, BG_WHITE, TEXT_PRIMARY, TEXT_SECONDARY } from '../design-tokens/tokens';
import { PhotoPlaceholder } from './PhotoPlaceholder';

function Checkmark({ size = 20 }) {
  return (
    <div style={{
      position: 'absolute', top: 8, right: 8, zIndex: 2,
      width: size, height: size, borderRadius: '50%',
      background: VERDE, display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 12 12">
        <path d="M2 6l3 3 5-5" stroke="#111" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      </svg>
    </div>
  );
}

function OptionCard({ option, isSelected, onClick, imageHeight }) {
  return (
    <button
      onClick={onClick}
      style={{
        border: `2px solid ${isSelected ? VERDE : BORDER_REST}`,
        borderRadius: 10, overflow: 'hidden', cursor: 'pointer',
        background: isSelected ? '#F2FDF3' : BG_WHITE,
        padding: 0, textAlign: 'left',
        transition: 'border-color 0.15s, background 0.15s',
        position: 'relative',
      }}
    >
      {isSelected && <Checkmark />}
      <PhotoPlaceholder mood={option.mood || 'hero'} style={{ height: imageHeight, width: '100%' }}>
        {option.image && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {option.image}
          </div>
        )}
      </PhotoPlaceholder>
      <div style={{ padding: '10px 12px 12px' }}>
        <p style={{
          fontFamily: "'Montserrat', sans-serif", fontWeight: 900,
          fontSize: 13.5, color: TEXT_PRIMARY, marginBottom: 3,
        }}>
          {option.title}
        </p>
        <p style={{
          fontFamily: "'Open Sans', sans-serif", fontSize: 11,
          color: TEXT_SECONDARY, lineHeight: 1.4,
        }}>
          {option.subtitle}
        </p>
      </div>
    </button>
  );
}

function UnknownCard({ title = 'No lo sé', subtitle = 'Te conectamos con un asesor', onSelect }) {
  return (
    <button
      onClick={onSelect}
      style={{
        border: `2px solid ${BORDER_REST}`,
        borderRadius: 10, overflow: 'hidden', cursor: 'pointer',
        background: '#EBEBEB',
        padding: 0, textAlign: 'left',
        transition: 'border-color 0.15s',
      }}
    >
      <div style={{
        height: 80, width: '100%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{
          fontFamily: "'Montserrat', sans-serif", fontWeight: 900,
          fontSize: 36, color: TEXT_SECONDARY, lineHeight: 1,
          userSelect: 'none',
        }}>
          ?
        </span>
      </div>
      <div style={{ padding: '10px 12px 12px' }}>
        <p style={{
          fontFamily: "'Montserrat', sans-serif", fontWeight: 900,
          fontSize: 13.5, color: TEXT_SECONDARY, marginBottom: 3,
        }}>
          {title}
        </p>
        <p style={{
          fontFamily: "'Open Sans', sans-serif", fontSize: 11,
          color: TEXT_SECONDARY, lineHeight: 1.4,
        }}>
          {subtitle}
        </p>
      </div>
    </button>
  );
}

export function OptionCardGrid({
  options,
  value,
  onChange,
  multiple = false,
  unknownOption,
  imageHeight = 115,
}) {
  const isSelected = (id) => multiple
    ? Array.isArray(value) && value.includes(id)
    : value === id;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
      {options.map(opt => (
        <OptionCard
          key={opt.id}
          option={opt}
          isSelected={isSelected(opt.id)}
          onClick={() => onChange(opt.id)}
          imageHeight={imageHeight}
        />
      ))}
      {unknownOption && (
        <UnknownCard
          title={unknownOption.title}
          subtitle={unknownOption.subtitle}
          onSelect={unknownOption.onSelect}
        />
      )}
    </div>
  );
}
