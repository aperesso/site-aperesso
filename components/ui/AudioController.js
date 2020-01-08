import React , { useMemo , useState , useCallback } from 'react';

import '../../scss/ui/audiocontroller.scss';

const AudioController = ({isActive}) => {

  const [animateIcon, setIconAnimation] = useState(false)

  const className = useMemo(
    () => {
      return `${animateIcon ? '' : 'sound-bar--still'} sound-bar`
    }, [animateIcon])

  const onMouseEnter = useCallback(
    () => setIconAnimation(a => !a),
    [],
  )

  const onMouseLeave = useCallback(
    () => setIconAnimation(a => !a) 
    , []
  )

  return(
    <button 
      className="audio-controller no-btn" 
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
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

