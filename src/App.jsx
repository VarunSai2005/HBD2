import { useEffect, useRef, useState } from 'react'
import horizontal1 from './assets/horizontal1.jpeg'
import horizontal2 from './assets/horizontal2.jpeg'
import vertical1 from './assets/vertical1.jpeg'
import vertical2 from './assets/vertical2.jpeg'
import vertical3 from './assets/vertical3.jpeg'
import vertical4 from './assets/vertical4.jpeg'
import './App.css'

const photos = [
  { label: 'Sunshine moments', shape: 'landscape', color: 'peach', image: horizontal1 },
  { label: 'Little adventures', shape: 'portrait', color: 'lavender', image: vertical1 },
  { label: 'Big smiles', shape: 'portrait', color: 'mint', image: vertical2 },
  { label: 'Sweet memories', shape: 'landscape', color: 'pink', image: horizontal2 },
  { label: 'Magic moments', shape: 'portrait', color: 'blue', image: vertical3 },
  { label: 'Hugs & giggles', shape: 'portrait', color: 'yellow', image: vertical4 },
]

const confetti = Array.from({ length: 34 }, (_, i) => ({
  left: `${(i * 37) % 100}%`, delay: `${(i % 9) * 0.09}s`, hue: (i * 47) % 360,
}))

function App() {
  const [welcomed, setWelcomed] = useState(false)
  const [giftOpen, setGiftOpen] = useState(false)
  const [candlesOut, setCandlesOut] = useState(false)
  const [lightbox, setLightbox] = useState(null)
  const [musicOn, setMusicOn] = useState(false)
  const [replayed, setReplayed] = useState(false)
  const audioRef = useRef(null)
  const musicTimer = useRef(null)

  useEffect(() => () => {
    window.clearInterval(musicTimer.current)
    if (audioRef.current) audioRef.current.close()
  }, [])

  const toggleMusic = async () => {
    if (musicOn) {
      window.clearInterval(musicTimer.current)
      audioRef.current?.close()
      audioRef.current = null
      setMusicOn(false)
      return
    }
    const AudioContextClass = window.AudioContext || window.webkitAudioContext
    if (!AudioContextClass) return
    const context = new AudioContextClass()
    audioRef.current = context
    await context.resume()
    const notes = [523.25, 659.25, 783.99, 659.25, 587.33, 698.46, 880, 783.99]
    const playPhrase = () => notes.forEach((frequency, i) => {
      const oscillator = context.createOscillator()
      const gain = context.createGain()
      const startAt = context.currentTime + i * 0.42
      oscillator.type = 'sine'
      oscillator.frequency.value = frequency
      gain.gain.setValueAtTime(0, startAt)
      gain.gain.linearRampToValueAtTime(0.035, startAt + 0.03)
      gain.gain.exponentialRampToValueAtTime(0.001, startAt + 0.36)
      oscillator.connect(gain).connect(context.destination)
      oscillator.start(startAt)
      oscillator.stop(startAt + 0.38)
    })
    playPhrase()
    musicTimer.current = window.setInterval(playPhrase, 3500)
    setMusicOn(true)
  }

  const replay = () => {
    setGiftOpen(false)
    setCandlesOut(false)
    setReplayed(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setWelcomed(false)
  }

  return (
    <main>
      <div className="sky-decor" aria-hidden="true">
        <span className="floaty f1">♡</span><span className="floaty f2">✦</span>
        <span className="floaty f3">🦋</span><span className="floaty f4">✿</span>
        <span className="floaty f5">♡</span><span className="floaty f6">☁</span>
      </div>
      <header className="topbar">
        <a className="brand" href="#home" aria-label="Moksha's birthday home"><span className="brand-star">✦</span> a little love note</a>
        <button className={`music-button ${musicOn ? 'playing' : ''}`} onClick={toggleMusic} aria-pressed={musicOn}>
          <span aria-hidden="true">{musicOn ? '♫' : '♪'}</span> {musicOn ? 'Music on' : 'Play music'}
        </button>
      </header>

      {!welcomed && <div className="welcome-overlay">
        <div className="welcome-card">
          <div className="welcome-sparkles" aria-hidden="true">✦　♡　✧</div>
          <div className="welcome-illustration" aria-hidden="true"><span>🎀</span><span>🧸</span><span>🎈</span></div>
          <p className="eyebrow">a tiny bit of birthday magic</p>
          <h1>A little surprise<br /><em>for Moksha</em></h1>
          <p className="welcome-copy">A whole world of wishes is waiting just for you.</p>
          <button className="button button-primary" onClick={() => { setWelcomed(true); setReplayed(false) }}>Open your birthday world <span>→</span></button>
          <div className="welcome-foot">made with all our love <span>♡</span></div>
        </div>
      </div>}

      <section className="hero" id="home">
        <div className="hero-copy">
          <div className="pill"><span className="pill-dot" /> today is full of magic</div>
          <p className="eyebrow hero-eyebrow">for our very favorite girl</p>
          <h1>Happy Birthday,<br /><span>Moksha!</span> <span className="cake-emoji">🎂</span></h1>
          <p className="hero-subtitle">A magical day filled with giggles, sunshine,<br className="desktop-break" /> hugs, and endless love! 🌈💖</p>
          <div className="date-card"><span className="date-icon">✦</span><span><small>A SPECIAL DAY FOR OUR LITTLE SUNSHINE</small><strong>21/10/22 <i>✨</i></strong></span></div>
          <a className="button button-primary hero-cta" href="#surprise">Let the magic begin <span>↓</span></a>
          {replayed && <p className="replay-note">The birthday magic is ready for another round! ✨</p>}
        </div>
        <div className="hero-art" aria-label="A cute teddy bear holding birthday balloons">
          <div className="art-sun" /><div className="art-cloud cloud-one" /><div className="art-cloud cloud-two" />
          <div className="balloon balloon-one">♥</div><div className="balloon balloon-two">✦</div><div className="balloon balloon-three">♥</div>
          <div className="bear"><div className="bear-ear ear-left" /><div className="bear-ear ear-right" /><div className="bear-head"><span className="bear-eye eye-left" /><span className="bear-eye eye-right" /><span className="bear-muzzle">●</span><span className="bear-blush blush-left" /><span className="bear-blush blush-right" /></div><div className="bear-body"><span className="bear-bow">✦</span></div><div className="bear-arm arm-left" /><div className="bear-arm arm-right" /><div className="bear-foot foot-left" /><div className="bear-foot foot-right" /></div>
          <span className="art-flower flower-a">✿</span><span className="art-flower flower-b">✿</span><span className="art-sparkle spark-a">✧</span><span className="art-sparkle spark-b">✦</span>
          <div className="art-caption">your day, your magic <span>♡</span></div>
        </div>
        <a className="scroll-cue" href="#surprise"><span /> scroll for the surprise</a>
      </section>

      <section className="surprise section-wrap" id="surprise">
        <div className="section-heading"><p className="eyebrow">psst... there's something for you</p><h2>A little box of <em>happiness</em></h2><p>Tap the gift to see what birthday magic is inside!</p></div>
        <div className={`gift-stage ${giftOpen ? 'gift-open' : ''}`}>
          {giftOpen && <div className="confetti" aria-hidden="true">{confetti.map((piece, i) => <i key={i} style={{ left: piece.left, animationDelay: piece.delay, backgroundColor: `hsl(${piece.hue} 78% 70%)` }} />)}</div>}
          <span className="gift-halo" />
          <button className="gift-button" onClick={() => setGiftOpen(!giftOpen)} aria-label={giftOpen ? 'Close the birthday gift' : 'Open the birthday gift'}>
            <span className="gift-lid"><i /></span><span className="gift-box"><i /></span><span className="gift-bow">🎀</span>
          </button>
          {giftOpen && <div className="gift-message"><span>💌</span><p>Today is all about <strong>you</strong>, Moksha!</p><small>Sending you a sky full of hugs and happy wishes.</small></div>}
        </div>
        <p className="tap-hint">{giftOpen ? 'A wish, wrapped up just for you ♡' : 'tap the gift to open your surprise'}</p>
      </section>

      <section className="message-section">
        <div className="message-card"><span className="quote-mark">“</span><p className="eyebrow">a note from the heart</p><h2>Dear Moksha,</h2><p className="message-copy">May your day sparkle with all the things that make you smile —<br className="desktop-break" /> sweet treats, silly dances, warm hugs, and people who love you<br className="desktop-break" /> more than all the stars in the sky.</p><p className="message-signoff">You make the world a little brighter just by being you. <span>♡</span></p><div className="message-sticker">with love<br /><span>always</span> ✿</div><span className="message-heart heart-one">♡</span><span className="message-heart heart-two">✦</span></div>
      </section>

      <section className="cake-section section-wrap">
        <div className="section-heading"><p className="eyebrow">make a wish, lovely girl</p><h2>A cake full of <em>wishes</em></h2><p>Tap the candles and make your birthday wish come true.</p></div>
        <button className={`cake-button ${candlesOut ? 'candles-out' : ''}`} onClick={() => setCandlesOut(!candlesOut)} aria-label={candlesOut ? 'Relight the birthday candles' : 'Blow out the birthday candles'}>
          <span className="candle-row">{['pink', 'yellow', 'blue'].map((color, i) => <span className={`candle ${color}`} key={color}><i className="flame" style={{ animationDelay: `${i * 0.12}s` }} /><i className="wick" /></span>)}</span>
          <span className="cake-top"><i className="icing-drip drip-one" /><i className="icing-drip drip-two" /><i className="icing-drip drip-three" />♡</span><span className="cake-layer layer-top" /><span className="cake-layer layer-bottom" /><span className="cake-plate" />
        </button>
        <p className="cake-hint">{candlesOut ? 'Wish sent straight to the stars ✨' : 'tap the cake to blow out the candles'}</p>
      </section>

      <section className="gallery-section section-wrap" id="memories">
        <div className="gallery-title-row"><div className="section-heading align-left"><p className="eyebrow">little moments, big love</p><h2>Our favorite <em>memories</em></h2><p>Six little spaces for all the moments we treasure.</p></div><span className="gallery-doodle" aria-hidden="true">♡<br /><small>so loved</small></span></div>
        <div className="photo-grid">{photos.map((photo, i) => <button key={photo.label} className={`photo-card ${photo.shape} ${photo.color} photo-${i + 1}`} onClick={() => setLightbox(i)} aria-label={`Open photo placeholder: ${photo.label}`}>
          <span className="photo-tape" /><span className="photo-inner"><img className="gallery-photo" src={photo.image} alt={photo.label} /><span className="photo-label">{photo.label}</span></span><span className="photo-caption">{photo.label} <i>{['✦', '♡', '✿', '✧', '♡', '✦'][i]}</i></span>
        </button>)}</div>
        <p className="gallery-note"><span>✦</span> Your photos can take these spots whenever you're ready. <span>✦</span></p>
      </section>

      <footer className="footer"><div className="footer-cloud">☁</div><span className="footer-sparkle">✦</span><p className="eyebrow">the party isn't over yet</p><h2>Keep the magic <em>going!</em></h2><p>Wishing you a day as lovely, bright, and wonderful as you are.</p><button className="button button-primary" onClick={replay}>Celebrate again <span>↻</span></button><div className="footer-signoff">made with <span>♡</span> for Moksha</div><div className="footer-bottom">a little birthday wonderland <span>✦</span></div></footer>

      {lightbox !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label={`Photo placeholder ${lightbox + 1}`} onClick={() => setLightbox(null)} onKeyDown={(event) => event.key === 'Escape' && setLightbox(null)}>
        <button className="lightbox-close" onClick={() => setLightbox(null)} aria-label="Close photo">×</button>
        <div className={`lightbox-content ${photos[lightbox].color}`} onClick={(event) => event.stopPropagation()}><img src={photos[lightbox].image} alt={photos[lightbox].label} /><strong>{photos[lightbox].label}</strong><small>Photo {String(lightbox + 1).padStart(2, '0')}</small><div className="lightbox-nav"><button onClick={() => setLightbox((lightbox + 5) % 6)} aria-label="Previous photo">←</button><span>{lightbox + 1} / 6</span><button onClick={() => setLightbox((lightbox + 1) % 6)} aria-label="Next photo">→</button></div></div>
      </div>}
    </main>
  )
}

export default App
