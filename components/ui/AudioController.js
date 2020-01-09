import React , { useMemo , useState , useCallback } from 'react';

import '../../scss/ui/audiocontroller.scss';

const AudioController = ({isPlaying, onStart, onPause}) => {

  const [isHover, setHover] = useState(false);

  const className = useMemo(
    () => {
      const isStill = (isPlaying && isHover) || (!isPlaying && !isHover)
      return `${!isStill ? '' : 'sound-bar--still'} sound-bar`
    }, [isPlaying, isHover])

  const onMouseEnter = useCallback(
    () => setHover(() => true),
    [],
  )

  const onMouseLeave = useCallback(
    () => setHover(() => false) 
    , []
  )


  return(
    <button 
      className="audio-controller no-btn" 
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={isPlaying ? onPause : onStart}
    >
      <div className="sound-wave">
        {
          Array(10).fill(null).map(
            (_, i) => <div key={i} className={className} />
          )
        }
      </div>
    </button>
  )
}

export default AudioController;

