import { useEffect, useRef } from 'react'

const BackgroundAudio = () => {
  const audioRef = useRef(null)

  useEffect(() => {
    const handleUserInteraction = () => {
      const audio = audioRef.current
      if (audio) {
        audio.play().catch((err) => console.log('Autoplay failed:', err))
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
    <audio ref={audioRef} loop autoPlay>
      <source src='/assets/audio/ava-background.mp3' type='audio/mpeg' />
      Your browser does not support the audio element.
    </audio>
  )
}

export default BackgroundAudio
