import { useEffect, useRef } from 'react'
import { useLocalStorage } from 'usehooks-ts'

const BackgroundAudio = () => {
  const audioRef = useRef(null)
  const [isMute, setMute] = useLocalStorage('ava-audio-mute', false)

  useEffect(() => {
    const handleUserInteraction = () => {
      const audio = audioRef.current
      if (audio && !isMute) {
        audio.play().catch((err) => console.log('Autoplay failed:', err))
        setMute(false)
      }
      // Remove event listener after first interaction
      document.removeEventListener('click', handleUserInteraction)
    }

    // Wait for user interaction
    document.addEventListener('click', handleUserInteraction)

    return () => {
      document.removeEventListener('click', handleUserInteraction)
    }
  }, [])

  return (
    <audio ref={audioRef} loop>
      <source src='/assets/audio/ava-background.mp3' type='audio/mpeg' />
      Your browser does not support the audio element.
    </audio>
  )
}

export const BackgroundAudioController = () => {
  const [isMute, setMute] = useLocalStorage('ava-audio-mute', false)
  
  if (isMute) {
    return (
      <div
        onClick={() => {
          setMute(false)
          const audio = document.querySelector('audio')
          audio.play().catch((err) => console.log('Autoplay failed:', err))
        }}>
        <svg width='42' height='42' viewBox='0 0 42 42' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M0.5 21C0.5 9.67816 9.67816 0.5 21 0.5C32.3218 0.5 41.5 9.67816 41.5 21C41.5 32.3218 32.3218 41.5 21 41.5C9.67816 41.5 0.5 32.3218 0.5 21Z'
            fill='#0B0B0B'
          />
          <path
            d='M0.5 21C0.5 9.67816 9.67816 0.5 21 0.5C32.3218 0.5 41.5 9.67816 41.5 21C41.5 32.3218 32.3218 41.5 21 41.5C9.67816 41.5 0.5 32.3218 0.5 21Z'
            stroke='#3D3D3D'
          />
          <path
            d='M25.1769 16V10L18.9753 16.2016L10 16.2016V25.1309H15.3945M25.1769 22V31.3333L20 26.1565M10.6667 29.3333L15.3945 25.1309M28.6667 13.3333L15.3945 25.1309'
            stroke='white'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </div>
    )
  }
  return (
    <div
      onClick={() => {
        setMute(true)
        const audio = document.querySelector('audio')
        audio.pause()
      }}>
      <svg width='42' height='42' viewBox='0 0 42 42' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M0.5 21C0.5 9.67816 9.67816 0.5 21 0.5C32.3218 0.5 41.5 9.67816 41.5 21C41.5 32.3218 32.3218 41.5 21 41.5C9.67816 41.5 0.5 32.3218 0.5 21Z'
          fill='#0B0B0B'
        />
        <path
          d='M0.5 21C0.5 9.67816 9.67816 0.5 21 0.5C32.3218 0.5 41.5 9.67816 41.5 21C41.5 32.3218 32.3218 41.5 21 41.5C9.67816 41.5 0.5 32.3218 0.5 21Z'
          stroke='#3D3D3D'
        />
        <path
          d='M29.6923 15.793C31.6648 18.2236 31.9434 21.4586 30.067 24.3212M23.2798 10L16.7694 15.4264H10V23.2395L16.7694 23.2375L23.2798 28.6667V10Z'
          stroke='white'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </div>
  )
}

export default BackgroundAudio
