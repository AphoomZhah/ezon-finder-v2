// EZON Smart Lock Finder — All Screens + App
import { useState, useEffect, useRef } from 'react';
import {
  VERDE, BG_APP, BG_WHITE, TEXT_PRIMARY, TEXT_SECONDARY, BORDER_REST,
  PhotoPlaceholder, HeroImage, ProgressBar, BackButton, PrimaryButton,
  WhatsAppLink, AlertBox, BillIllustration, AccessIcon, LockProductPlaceholder,
} from './components.jsx';

// ─── Screen wrapper with enter animation ─────────────────────────────────────
function Screen({ children, dir = 'forward', style }) {
  return (
    <div className={dir === 'back' ? 'screen-back' : 'screen-forward'}
      style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', ...style }}>
      {children}
    </div>
  );
}

// ─── Screen 0: Entry ──────────────────────────────────────────────────────────
function EntryScreen({ onStart }) {
  return (
    <Screen style={{ background: BG_APP }}>
      <HeroImage style={{ width: '100%', height: 480, flexShrink: 0 }}>
        <div style={{
          position: 'absolute', top: 20, left: 24,
          fontFamily: "'Montserrat', sans-serif", fontWeight: 900,
          fontSize: 18, color: '#fff', letterSpacing: '0.18em',
        }}>
          EZON
        </div>
      </HeroImage>

      <div style={{
        background: BG_WHITE, borderRadius: '14px 14px 0 0',
        marginTop: -18, flex: 1,
        padding: '28px 24px 32px',
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
          {['~5 minutos', '6 preguntas', 'Compatibilidad garantizada'].map(t => (
            <span key={t} style={{
              fontFamily: "'Open Sans', sans-serif", fontSize: 11.5, fontWeight: 600,
              color: TEXT_SECONDARY, background: BG_APP,
              border: `1px solid ${BORDER_REST}`, borderRadius: 20,
              padding: '4px 12px',
            }}>{t}</span>
          ))}
        </div>

        <h1 style={{
          fontFamily: "'Montserrat', sans-serif", fontWeight: 900,
          fontSize: 28, lineHeight: 1.15, color: TEXT_PRIMARY,
          letterSpacing: '-0.01em', marginBottom: 14,
          textTransform: 'uppercase',
        }}>
          Encuentra tu cerradura ideal
        </h1>

        <p style={{
          fontFamily: "'Open Sans', sans-serif", fontSize: 15,
          color: TEXT_SECONDARY, lineHeight: 1.65, marginBottom: 28, flex: 1,
        }}>
          Responde unas preguntas sobre tu puerta y te mostramos las cerraduras inteligentes que son compatibles — con tu instalación específica, no cerraduras genéricas.
        </p>

        <PrimaryButton onClick={onStart}>Comenzar</PrimaryButton>

        <p style={{
          fontFamily: "'Open Sans', sans-serif", fontSize: 12,
          color: TEXT_SECONDARY, textAlign: 'center', marginTop: 16, lineHeight: 1.5,
        }}>
          Distribuidor oficial Samsung Smart Lock, Igloohome y Excel
        </p>
      </div>
    </Screen>
  );
}

// ─── Screen 1: Material ───────────────────────────────────────────────────────
const MATERIALS = [
  { id: 'madera',   label: 'Madera',   mood: 'madera',   hint: 'Puertas residenciales, interior o entrada' },
  { id: 'aluminio', label: 'Aluminio', mood: 'aluminio', hint: 'Perfil angosto, típica de departamento' },
  { id: 'metal',    label: 'Metal',    mood: 'metal',    hint: 'Chapa pesada, herrería o portón' },
  { id: 'vidrio',   label: 'Vidrio',   mood: 'vidrio',   hint: 'Templado, sin marcos o con herraje' },
];

function MaterialScreen({ answers, setAnswers, onNext, onBack, dir }) {
  const sel = answers.material;
  return (
    <Screen dir={dir} style={{ background: BG_APP }}>
      <div style={{ padding: '20px 20px 0' }}>
        <BackButton onClick={onBack}/>
        <ProgressBar step={1}/>
        <h2 style={headingStyle}>¿De qué material es tu puerta?</h2>
        <p style={subStyle}>La foto te ayuda a identificarla, no necesitas saber el nombre técnico.</p>
      </div>

      <div style={{ padding: '16px 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {MATERIALS.map(m => (
          <button key={m.id} onClick={() => setAnswers(a => ({ ...a, material: m.id }))}
            style={{
              border: `2px solid ${sel === m.id ? VERDE : BORDER_REST}`,
              borderRadius: 10, overflow: 'hidden', cursor: 'pointer',
              background: sel === m.id ? '#F2FDF3' : BG_WHITE,
              padding: 0, textAlign: 'left',
              transition: 'border-color 0.15s, background 0.15s',
              position: 'relative',
            }}>
            {sel === m.id && (
              <div style={{
                position: 'absolute', top: 8, right: 8, zIndex: 2,
                width: 20, height: 20, borderRadius: '50%',
                background: VERDE, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="11" height="11" viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" stroke="#111" strokeWidth="1.8" fill="none" strokeLinecap="round"/></svg>
              </div>
            )}
            <PhotoPlaceholder mood={m.mood} label={`foto · puerta de ${m.label.toLowerCase()}`}
              style={{ height: 115, width: '100%' }}/>
            <div style={{ padding: '10px 12px 12px' }}>
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: 13.5, color: TEXT_PRIMARY, marginBottom: 3 }}>{m.label}</p>
              <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 11, color: TEXT_SECONDARY, lineHeight: 1.4 }}>{m.hint}</p>
            </div>
          </button>
        ))}
      </div>

      <div style={{ padding: '0 20px', marginBottom: 6 }}>
        <WhatsAppLink text="No reconozco el material de mi puerta"/>
      </div>

      <div style={{ padding: '12px 20px 32px', marginTop: 'auto' }}>
        <PrimaryButton onClick={onNext} disabled={!sel}>CONTINUAR</PrimaryButton>
      </div>
    </Screen>
  );
}

// ─── Screen 2: Thickness ─────────────────────────────────────────────────────
const THICKNESSES = [
  { id: '2-3', label: '2–3 cm', hint: 'Puertas ligeras, interiores' },
  { id: '3-5', label: '3–5 cm', hint: 'Estándar — mayoría de departamentos' },
  { id: '5-7', label: '5–7 cm', hint: 'Reforzadas o acceso principal' },
  { id: '7-10',label: '7–10 cm',hint: 'Seguridad o blindadas' },
];

function ThicknessScreen({ answers, setAnswers, onNext, onBack, dir }) {
  const sel = answers.thickness;
  return (
    <Screen dir={dir} style={{ background: BG_APP }}>
      <div style={{ padding: '20px 20px 0' }}>
        <BackButton onClick={onBack}/>
        <ProgressBar step={2}/>
        <h2 style={headingStyle}>¿Qué tan grueso es el canto lateral de tu puerta?</h2>
        <p style={subStyle}>El canto es la orilla donde se instala la cerradura, mídelo de frente a fondo.</p>
      </div>

      <div style={{ padding: '16px 20px 0' }}>
        <BillIllustration/>

        {THICKNESSES.map(t => (
          <button key={t.id} onClick={() => setAnswers(a => ({ ...a, thickness: t.id }))}
            style={{
              width: '100%', marginBottom: 10,
              border: `2px solid ${sel === t.id ? VERDE : BORDER_REST}`,
              borderRadius: 10, padding: '14px 16px',
              background: sel === t.id ? '#F2FDF3' : BG_WHITE,
              cursor: 'pointer', textAlign: 'left',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              transition: 'border-color 0.15s, background 0.15s',
            }}>
            <div>
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: 15, color: TEXT_PRIMARY }}>{t.label}</p>
              <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 12, color: TEXT_SECONDARY, marginTop: 2 }}>{t.hint}</p>
            </div>
            {sel === t.id && (
              <div style={{
                width: 22, height: 22, borderRadius: '50%', background: VERDE,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <svg width="12" height="12" viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" stroke="#111" strokeWidth="1.8" fill="none" strokeLinecap="round"/></svg>
              </div>
            )}
          </button>
        ))}

        <button onClick={() => setAnswers(a => ({ ...a, thickness: 'no-se' }))}
          style={{
            width: '100%', marginBottom: 10,
            border: `2px solid ${sel === 'no-se' ? VERDE : BORDER_REST}`,
            borderRadius: 10, padding: '14px 16px',
            background: sel === 'no-se' ? '#F2FDF3' : BG_WHITE,
            cursor: 'pointer', textAlign: 'left',
            display: 'flex', alignItems: 'center', gap: 10,
            transition: 'border-color 0.15s, background 0.15s',
          }}>
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="8.5" stroke={TEXT_SECONDARY} strokeWidth="1.5"/>
            <path d="M10 6c1.5 0 2.5 1 2.5 2.2 0 1-1 1.8-2 2.3-.7.3-1 .8-1 1.5" stroke={TEXT_SECONDARY} strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="10" cy="14.5" r="1" fill={TEXT_SECONDARY}/>
          </svg>
          <div>
            <p style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 600, fontSize: 14, color: TEXT_PRIMARY }}>No sé / Ayúdame a medir</p>
            <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 11.5, color: TEXT_SECONDARY, marginTop: 1 }}>Un asesor te guía por WhatsApp</p>
          </div>
        </button>
      </div>

      <div style={{ padding: '12px 20px 32px', marginTop: 'auto' }}>
        {sel === 'no-se'
          ? <WhatsAppLink text="Pedir ayuda para medir"/>
          : <PrimaryButton onClick={onNext} disabled={!sel}>CONTINUAR</PrimaryButton>
        }
      </div>
    </Screen>
  );
}

// ─── Screen 3: Location ───────────────────────────────────────────────────────
const LOCATIONS = [
  { id: 'interior',           label: 'Interior',               hint: 'Recámara, oficina, cuarto de servicio', mood: 'interior' },
  { id: 'exterior_cubierto',  label: 'Exterior con techo',     hint: 'Marquesina, zaguán o entrada cubierta',  mood: 'exterior_cubierto' },
  { id: 'exterior_abierto',   label: 'Exterior sin techo',     hint: 'Expuesta directamente al sol y lluvia',  mood: 'exterior_abierto' },
];

function LocationScreen({ answers, setAnswers, onNext, onBack, dir }) {
  const sel = answers.location;
  return (
    <Screen dir={dir} style={{ background: BG_APP }}>
      <div style={{ padding: '20px 20px 0' }}>
        <BackButton onClick={onBack}/>
        <ProgressBar step={3}/>
        <h2 style={headingStyle}>¿Dónde está ubicada tu puerta?</h2>
        <p style={subStyle}>La exposición al sol afecta la vida útil de la pantalla táctil.</p>
      </div>

      <div style={{ padding: '16px 20px 0' }}>
        {LOCATIONS.map(loc => (
          <div key={loc.id} style={{ marginBottom: 12 }}>
            <button onClick={() => setAnswers(a => ({ ...a, location: loc.id }))}
              style={{
                width: '100%', border: `2px solid ${sel === loc.id ? VERDE : BORDER_REST}`,
                borderRadius: 10, overflow: 'hidden', cursor: 'pointer',
                background: sel === loc.id ? '#F2FDF3' : BG_WHITE,
                padding: 0, textAlign: 'left',
                transition: 'border-color 0.15s, background 0.15s',
                display: 'flex', position: 'relative',
              }}>
              {sel === loc.id && (
                <div style={{
                  position: 'absolute', top: 10, right: 10, zIndex: 2,
                  width: 20, height: 20, borderRadius: '50%', background: VERDE,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="11" height="11" viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" stroke="#111" strokeWidth="1.8" fill="none" strokeLinecap="round"/></svg>
                </div>
              )}
              <PhotoPlaceholder mood={loc.mood} label={`foto · ${loc.label.toLowerCase()}`}
                style={{ width: 110, height: 88, flexShrink: 0 }}/>
              <div style={{ padding: '14px 14px 14px 16px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: 14, color: TEXT_PRIMARY, marginBottom: 4 }}>{loc.label}</p>
                <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 12, color: TEXT_SECONDARY, lineHeight: 1.45 }}>{loc.hint}</p>
              </div>
            </button>
            {sel === 'exterior_abierto' && loc.id === 'exterior_abierto' && (
              <AlertBox>
                <strong style={{ display: 'block', marginBottom: 5 }}>Atención: exposición solar directa</strong>
                La pantalla táctil de la mayoría de cerraduras inteligentes se daña en 6–12 meses bajo el sol directo. Te recomendamos hablar con un asesor para encontrar la opción más duradera para tu caso.
                <div style={{ marginTop: 12 }}>
                  <WhatsAppLink text="Hablar con un asesor" style={{ borderColor: '#F6D860', background: 'transparent', padding: '10px 16px', fontSize: 13 }}/>
                </div>
              </AlertBox>
            )}
          </div>
        ))}
      </div>

      <div style={{ padding: '12px 20px 32px', marginTop: 'auto' }}>
        <PrimaryButton onClick={onNext} disabled={!sel}>CONTINUAR</PrimaryButton>
      </div>
    </Screen>
  );
}

// ─── Screen 4: Opening type ───────────────────────────────────────────────────
const OPENINGS = [
  { id: 'abatible',   label: 'Abatible', hint: 'Se abre hacia adentro o afuera, sobre bisagras', mood: 'abatible' },
  { id: 'corrediza',  label: 'Corrediza', hint: 'Se desliza sobre un riel horizontal', mood: 'corrediza' },
];

function OpeningScreen({ answers, setAnswers, onNext, onBack, dir }) {
  const sel = answers.opening;
  return (
    <Screen dir={dir} style={{ background: BG_APP }}>
      <div style={{ padding: '20px 20px 0' }}>
        <BackButton onClick={onBack}/>
        <ProgressBar step={4}/>
        <h2 style={headingStyle}>¿Cómo se abre tu puerta?</h2>
        <p style={subStyle}>Reconoce tu tipo de puerta por la foto, no hace falta el nombre técnico.</p>
      </div>

      <div style={{ padding: '16px 20px 0', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {OPENINGS.map(o => (
          <button key={o.id} onClick={() => setAnswers(a => ({ ...a, opening: o.id }))}
            style={{
              border: `2px solid ${sel === o.id ? VERDE : BORDER_REST}`,
              borderRadius: 10, overflow: 'hidden', cursor: 'pointer',
              background: sel === o.id ? '#F2FDF3' : BG_WHITE,
              padding: 0, textAlign: 'left', position: 'relative',
              transition: 'border-color 0.15s, background 0.15s',
            }}>
            {sel === o.id && (
              <div style={{
                position: 'absolute', top: 12, right: 12, zIndex: 2,
                width: 22, height: 22, borderRadius: '50%', background: VERDE,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="12" height="12" viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" stroke="#111" strokeWidth="1.8" fill="none" strokeLinecap="round"/></svg>
              </div>
            )}
            <PhotoPlaceholder mood={o.mood} label={`foto · puerta ${o.label.toLowerCase()} — bisagras / riel visibles`}
              style={{ width: '100%', height: 160 }}>
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {o.id === 'abatible' ? (
                  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" opacity="0.45">
                    <rect x="10" y="10" width="45" height="60" rx="3" stroke="white" strokeWidth="2"/>
                    <line x1="10" y1="10" x2="10" y2="70" stroke="white" strokeWidth="3"/>
                    <path d="M55 40 A45 45 0 0 1 20 75" stroke="white" strokeWidth="1.5" strokeDasharray="4 3"/>
                    <circle cx="53" cy="40" r="3" fill="white" opacity="0.7"/>
                  </svg>
                ) : (
                  <svg width="80" height="60" viewBox="0 0 80 60" fill="none" opacity="0.45">
                    <rect x="5" y="10" width="45" height="40" rx="3" stroke="white" strokeWidth="2"/>
                    <line x1="0" y1="52" x2="75" y2="52" stroke="white" strokeWidth="2.5"/>
                    <circle cx="5" cy="52" r="3" fill="white"/>
                    <circle cx="20" cy="52" r="2" fill="white" opacity="0.5"/>
                    <circle cx="35" cy="52" r="2" fill="white" opacity="0.5"/>
                    <path d="M50 28 H75" stroke="white" strokeWidth="1.5" strokeDasharray="4 3"/>
                    <path d="M70 23 L77 28 L70 33" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                )}
              </div>
            </PhotoPlaceholder>
            <div style={{ padding: '14px 16px 16px' }}>
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: 15, color: TEXT_PRIMARY, marginBottom: 4 }}>{o.label}</p>
              <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 13, color: TEXT_SECONDARY }}>{o.hint}</p>
            </div>
          </button>
        ))}
      </div>

      <div style={{ padding: '16px 20px 32px', marginTop: 'auto' }}>
        <PrimaryButton onClick={onNext} disabled={!sel}>CONTINUAR</PrimaryButton>
      </div>
    </Screen>
  );
}

// ─── Screen 5: Access Methods ─────────────────────────────────────────────────
const ACCESS_METHODS = [
  { id: 'huella',  label: 'Huella digital' },
  { id: 'pin',     label: 'Código PIN' },
  { id: 'rfid',    label: 'Tarjeta RFID' },
  { id: 'app',     label: 'App móvil' },
  { id: 'facial',  label: 'Reconocimiento facial' },
  { id: 'llave',   label: 'Llave mecánica' },
];

function AccessScreen({ answers, setAnswers, onNext, onBack, dir }) {
  const sel = answers.accessMethods || [];
  const toggle = (id) => setAnswers(a => {
    const cur = a.accessMethods || [];
    return { ...a, accessMethods: cur.includes(id) ? cur.filter(x => x !== id) : [...cur, id] };
  });
  return (
    <Screen dir={dir} style={{ background: BG_APP }}>
      <div style={{ padding: '20px 20px 0' }}>
        <BackButton onClick={onBack}/>
        <ProgressBar step={5}/>
        <h2 style={headingStyle}>¿Cómo quieres abrir tu cerradura?</h2>
        <p style={subStyle}>Puedes elegir varios. Lo que selecciones define los métodos disponibles día a día.</p>
      </div>

      <div style={{ padding: '16px 20px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {ACCESS_METHODS.map(m => {
            const active = sel.includes(m.id);
            return (
              <button key={m.id} onClick={() => toggle(m.id)} style={{
                border: `2px solid ${active ? VERDE : BORDER_REST}`,
                borderRadius: 10, padding: '16px 8px 14px',
                background: active ? '#F2FDF3' : BG_WHITE,
                cursor: 'pointer', textAlign: 'center',
                transition: 'border-color 0.15s, background 0.15s',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                position: 'relative',
              }}>
                {active && (
                  <div style={{
                    position: 'absolute', top: 6, right: 6,
                    width: 16, height: 16, borderRadius: '50%', background: VERDE,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <svg width="9" height="9" viewBox="0 0 10 10"><path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="#111" strokeWidth="1.6" fill="none" strokeLinecap="round"/></svg>
                  </div>
                )}
                <div style={{ color: active ? '#2A6A30' : TEXT_SECONDARY }}>
                  <AccessIcon type={m.id} size={26}/>
                </div>
                <span style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 600, fontSize: 11.5, color: active ? TEXT_PRIMARY : TEXT_SECONDARY, lineHeight: 1.3, textAlign: 'center' }}>
                  {m.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ padding: '20px 20px 32px', marginTop: 'auto' }}>
        <PrimaryButton onClick={onNext} disabled={sel.length === 0}>CONTINUAR</PrimaryButton>
      </div>
    </Screen>
  );
}

// ─── Screen 6: Connectivity ───────────────────────────────────────────────────
const CONNECTIVITY = [
  { id: 'wifi',   label: 'WiFi y notificaciones remotas', desc: 'Recibe alertas en tu teléfono y controla desde cualquier lugar' },
  { id: 'camara', label: 'Videoportero / cámara',         desc: 'Ve quién está en tu puerta antes de abrir' },
];

function ConnectivityScreen({ answers, setAnswers, onNext, onBack, dir }) {
  const sel = answers.connectivity || [];

  return (
    <Screen dir={dir} style={{ background: BG_APP }}>
      <div style={{ padding: '20px 20px 0' }}>
        <BackButton onClick={onBack}/>
        <ProgressBar step={6}/>
        <h2 style={headingStyle}>¿Qué funciones adicionales te interesan?</h2>
        <p style={subStyle}>Estas funciones son opcionales. Si no las necesitas, puedes omitirlas.</p>
      </div>

      <div style={{ padding: '16px 20px 0' }}>
        {CONNECTIVITY.map(c => {
          const active = sel.includes(c.id);
          return (
            <button key={c.id} onClick={() => {
              setAnswers(a => {
                const cur = a.connectivity || [];
                return { ...a, connectivity: cur.includes(c.id) ? cur.filter(x => x !== c.id) : [...cur, c.id], connectivityNone: false };
              });
            }}
              style={{
                width: '100%', marginBottom: 10,
                border: `2px solid ${active ? VERDE : BORDER_REST}`,
                borderRadius: 10, padding: '18px 16px',
                background: active ? '#F2FDF3' : BG_WHITE,
                cursor: 'pointer', textAlign: 'left',
                display: 'flex', alignItems: 'center', gap: 16,
                transition: 'border-color 0.15s, background 0.15s',
                position: 'relative',
              }}>
              {active && (
                <div style={{
                  position: 'absolute', top: 12, right: 12,
                  width: 20, height: 20, borderRadius: '50%', background: VERDE,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="11" height="11" viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" stroke="#111" strokeWidth="1.8" fill="none" strokeLinecap="round"/></svg>
                </div>
              )}
              <div style={{ color: active ? '#2A6A30' : TEXT_SECONDARY, flexShrink: 0 }}>
                <AccessIcon type={c.id} size={28}/>
              </div>
              <div>
                <p style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 600, fontSize: 14, color: TEXT_PRIMARY, marginBottom: 3 }}>{c.label}</p>
                <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 12, color: TEXT_SECONDARY, lineHeight: 1.45 }}>{c.desc}</p>
              </div>
            </button>
          );
        })}

        <button onClick={() => setAnswers(a => ({ ...a, connectivity: [], connectivityNone: true }))}
          style={{
            width: '100%', marginBottom: 10,
            border: `2px solid ${answers.connectivityNone ? VERDE : BORDER_REST}`,
            borderRadius: 10, padding: '16px 16px',
            background: answers.connectivityNone ? '#F2FDF3' : BG_WHITE,
            cursor: 'pointer', textAlign: 'left',
            display: 'flex', alignItems: 'center', gap: 12,
            transition: 'border-color 0.15s, background 0.15s',
          }}>
          <div style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', color: TEXT_SECONDARY }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <circle cx="12" cy="12" r="9"/>
              <line x1="9" y1="12" x2="15" y2="12"/>
            </svg>
          </div>
          <div>
            <p style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 600, fontSize: 14, color: TEXT_PRIMARY }}>Solo lo básico</p>
            <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 12, color: TEXT_SECONDARY, marginTop: 2 }}>Sin conectividad adicional — la cerradura abre y ya</p>
          </div>
        </button>
      </div>

      <div style={{ padding: '12px 20px 32px', marginTop: 'auto' }}>
        <PrimaryButton onClick={onNext} disabled={sel.length === 0 && !answers.connectivityNone}>
          VER MIS RESULTADOS
        </PrimaryButton>
      </div>
    </Screen>
  );
}

// ─── Screen 7: Loading ────────────────────────────────────────────────────────
const LOADING_MESSAGES = [
  'Revisando material y grosor de puerta...',
  'Verificando compatibilidad de mecanismo...',
  'Cruzando con catálogo disponible en EZON...',
  'Calculando score de compatibilidad...',
  'Preparando tus resultados...',
];

function LoadingScreen({ onDone, dir }) {
  const [msgIndex, setMsgIndex] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      if (i < LOADING_MESSAGES.length) {
        setMsgIndex(i);
      } else {
        clearInterval(interval);
        setDone(true);
        setTimeout(onDone, 500);
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <Screen dir={dir} style={{ background: BG_WHITE, justifyContent: 'center', alignItems: 'center', padding: '0 40px' }}>
      <div style={{ textAlign: 'center', width: '100%' }}>
        <p style={{
          fontFamily: "'Montserrat', sans-serif", fontWeight: 900,
          fontSize: 20, letterSpacing: '0.2em', color: TEXT_PRIMARY,
          marginBottom: 48,
        }}>EZON</p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 40 }}>
          {[0, 1, 2, 3, 4].map(i => (
            <div key={i} style={{
              width: 8, height: 8, borderRadius: '50%',
              background: i < msgIndex + 1 ? VERDE : BORDER_REST,
              transition: 'background 0.35s ease',
              transform: i === msgIndex ? 'scale(1.35)' : 'scale(1)',
            }}/>
          ))}
        </div>

        <p key={msgIndex} style={{
          fontFamily: "'Open Sans', sans-serif", fontSize: 14,
          color: TEXT_SECONDARY, lineHeight: 1.6,
          animation: 'fadeInUp 0.3s ease',
        }}>
          {done ? (
            <span style={{ color: TEXT_PRIMARY, fontWeight: 600 }}>Listo — encontramos tus cerraduras</span>
          ) : LOADING_MESSAGES[msgIndex]}
        </p>
      </div>
    </Screen>
  );
}

// ─── Screen 8: Results ────────────────────────────────────────────────────────
const PRODUCTS = {
  ideal: {
    name: 'Samsung SHP-DP609',
    sub: 'Cerradura digital multifunción',
    price: '$8,900 MXN',
    match: 98,
    mood: 'product1',
    features: ['Huella', 'PIN', 'App', 'RFID'],
    reasons: ['Compatible con puerta de aluminio 3–5 cm', 'Soporta los métodos de acceso que elegiste', 'Instalación sin herrero especializado'],
  },
  premium: {
    name: 'Samsung SHP-DH538',
    sub: 'Cerradura con videoportero integrado',
    price: '$14,500 MXN',
    match: 94,
    mood: 'product2',
    features: ['Facial', 'Huella', 'App', 'WiFi', 'Cámara'],
    reasons: ['Todas las funciones del modelo ideal', 'Videoportero HD con visión nocturna', 'Control remoto desde la app'],
  },
  entry: {
    name: 'Excel SL275',
    sub: 'Cerradura digital de acceso',
    price: '$4,200 MXN',
    match: 87,
    mood: 'product3',
    features: ['PIN', 'RFID', 'Llave'],
    reasons: ['Compatible con tu puerta 3–5 cm', 'Diseñada para perfiles de aluminio angosto', 'Precio de entrada accesible'],
  },
};

function MatchBadge({ score, size = 'normal' }) {
  const big = size === 'big';
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      background: score >= 95 ? '#F2FDF3' : '#F5F5F5',
      border: `1.5px solid ${score >= 95 ? VERDE : BORDER_REST}`,
      borderRadius: 20, padding: big ? '5px 14px' : '3px 10px',
    }}>
      <div style={{ width: big ? 8 : 6, height: big ? 8 : 6, borderRadius: '50%', background: score >= 95 ? VERDE : score >= 90 ? '#AAB8C2' : '#C4C4C4' }}/>
      <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: big ? 13 : 11, color: TEXT_PRIMARY }}>
        {score}% MATCH
      </span>
    </div>
  );
}

function ResultsScreen({ onRestart, dir }) {
  return (
    <Screen dir={dir} style={{ background: BG_APP }}>
      <div style={{ padding: '24px 20px 0', background: BG_WHITE, borderBottom: `1px solid ${BORDER_REST}` }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div>
            <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 12, fontWeight: 600, color: TEXT_SECONDARY, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 4 }}>
              EZON Smart Lock Finder
            </p>
            <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: 22, color: TEXT_PRIMARY, lineHeight: 1.15 }}>
              Tus cerraduras compatibles
            </h2>
          </div>
          <button onClick={onRestart} style={{
            background: 'none', border: `1.5px solid ${BORDER_REST}`, borderRadius: 8,
            padding: '8px 12px', cursor: 'pointer',
            fontFamily: "'Open Sans', sans-serif", fontSize: 11.5, fontWeight: 600, color: TEXT_SECONDARY,
          }}>
            Reiniciar
          </button>
        </div>
        <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 13, color: TEXT_SECONDARY, paddingBottom: 16 }}>
          Basado en tus respuestas, estas cerraduras son compatibles con tu puerta específica.
        </p>
      </div>

      <div style={{ padding: '16px 20px' }}>
        {/* IDEAL card */}
        <div style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: VERDE }}/>
            <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: 10.5, color: VERDE, letterSpacing: '0.1em' }}>RECOMENDACIÓN IDEAL</span>
          </div>
          <div style={{ background: BG_WHITE, borderRadius: 12, border: `2px solid ${VERDE}`, overflow: 'hidden' }}>
            <div style={{ display: 'flex', gap: 0 }}>
              <LockProductPlaceholder mood={PRODUCTS.ideal.mood} size={110}/>
              <div style={{ padding: '14px 14px 14px 16px', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 6 }}>
                  <div>
                    <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: 14, color: TEXT_PRIMARY, lineHeight: 1.2 }}>{PRODUCTS.ideal.name}</p>
                    <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 11, color: TEXT_SECONDARY, marginTop: 2 }}>{PRODUCTS.ideal.sub}</p>
                  </div>
                  <MatchBadge score={PRODUCTS.ideal.match} size="big"/>
                </div>
                <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: 18, color: TEXT_PRIMARY, marginBottom: 8 }}>{PRODUCTS.ideal.price}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                  {PRODUCTS.ideal.features.map(f => (
                    <span key={f} style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 10.5, fontWeight: 600, background: '#F2FDF3', color: '#2A6A30', border: `1px solid ${VERDE}`, borderRadius: 4, padding: '2px 7px' }}>{f}</span>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ background: '#FAFFFE', borderTop: `1px solid #E8F8EA`, padding: '12px 16px' }}>
              {PRODUCTS.ideal.reasons.map(r => (
                <div key={r} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 6 }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" style={{ marginTop: 1, flexShrink: 0 }}><circle cx="7" cy="7" r="7" fill={VERDE}/><path d="M4 7l2 2 4-4" stroke="#111" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>
                  <span style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 12, color: TEXT_SECONDARY, lineHeight: 1.45 }}>{r}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 10, padding: '12px 14px 14px' }}>
              <button style={{ flex: 1, padding: '13px', background: VERDE, border: 'none', borderRadius: 8, fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: 12, color: TEXT_PRIMARY, cursor: 'pointer', letterSpacing: '0.07em' }}>COMPRAR</button>
              <button style={{ flex: 1, padding: '13px', background: 'none', border: `1.5px solid ${BORDER_REST}`, borderRadius: 8, fontFamily: "'Open Sans', sans-serif", fontWeight: 600, fontSize: 12, color: TEXT_PRIMARY, cursor: 'pointer' }}>Ver detalle</button>
            </div>
          </div>
        </div>

        {/* Alternative cards */}
        {[
          { key: 'premium', label: 'ALTERNATIVA PREMIUM' },
          { key: 'entry',   label: 'OPCIÓN DE ENTRADA' },
        ].map(({ key, label }) => {
          const p = PRODUCTS[key];
          return (
            <div key={key} style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: BORDER_REST }}/>
                <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: 10.5, color: TEXT_SECONDARY, letterSpacing: '0.1em' }}>{label}</span>
              </div>
              <div style={{ background: BG_WHITE, borderRadius: 12, border: `1.5px solid ${BORDER_REST}` }}>
                <div style={{ display: 'flex', gap: 0 }}>
                  <LockProductPlaceholder mood={p.mood} size={90}/>
                  <div style={{ padding: '12px 12px 12px 14px', flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                      <div>
                        <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: 13, color: TEXT_PRIMARY }}>{p.name}</p>
                        <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 10.5, color: TEXT_SECONDARY, marginTop: 1 }}>{p.sub}</p>
                      </div>
                      <MatchBadge score={p.match}/>
                    </div>
                    <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: 15, color: TEXT_PRIMARY, marginBottom: 7 }}>{p.price}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                      {p.features.map(f => (
                        <span key={f} style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 10, fontWeight: 600, background: BG_APP, color: TEXT_SECONDARY, border: `1px solid ${BORDER_REST}`, borderRadius: 4, padding: '2px 6px' }}>{f}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div style={{ borderTop: `1px solid ${BORDER_REST}`, padding: '10px 12px 12px' }}>
                  {p.reasons.map(r => (
                    <div key={r} style={{ display: 'flex', gap: 7, marginBottom: 5, alignItems: 'flex-start' }}>
                      <svg width="12" height="12" viewBox="0 0 12 12" style={{ marginTop: 1, flexShrink: 0 }}><circle cx="6" cy="6" r="6" fill={BORDER_REST}/><path d="M3 6l2 2 4-4" stroke="#666" strokeWidth="1.4" fill="none" strokeLinecap="round"/></svg>
                      <span style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 11.5, color: TEXT_SECONDARY, lineHeight: 1.4 }}>{r}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 8, padding: '0 12px 12px' }}>
                  <button style={{ flex: 1, padding: '11px', background: BG_APP, border: `1.5px solid ${BORDER_REST}`, borderRadius: 8, fontFamily: "'Open Sans', sans-serif", fontWeight: 600, fontSize: 12, color: TEXT_PRIMARY, cursor: 'pointer' }}>Ver detalle</button>
                  <button style={{ flex: 1, padding: '11px', background: VERDE, border: 'none', borderRadius: 8, fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: 12, color: TEXT_PRIMARY, cursor: 'pointer', letterSpacing: '0.07em' }}>COMPRAR</button>
                </div>
              </div>
            </div>
          );
        })}

        {/* Bottom CTA */}
        <div style={{ background: BG_WHITE, borderRadius: 12, border: `1px solid ${BORDER_REST}`, padding: '20px 16px', textAlign: 'center', marginBottom: 32 }}>
          <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 13, color: TEXT_SECONDARY, marginBottom: 12, lineHeight: 1.5 }}>
            ¿Quieres validar tu elección con un experto antes de comprar?
          </p>
          <WhatsAppLink text="Hablar con un asesor EZON"/>
        </div>
      </div>
    </Screen>
  );
}

// ─── Shared styles ─────────────────────────────────────────────────────────────
const headingStyle = {
  fontFamily: "'Montserrat', sans-serif", fontWeight: 900,
  fontSize: 22, color: TEXT_PRIMARY, lineHeight: 1.2,
  marginBottom: 8, letterSpacing: '-0.01em',
};
const subStyle = {
  fontFamily: "'Open Sans', sans-serif", fontSize: 13.5,
  color: TEXT_SECONDARY, lineHeight: 1.55, marginBottom: 4,
};

// ─── App: State machine + routing ─────────────────────────────────────────────
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
