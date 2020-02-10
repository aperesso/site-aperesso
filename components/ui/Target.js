import React , { memo , useEffect , useState } from 'react';
import { useSelector } from '../../lib/useRedux';

const Target = () => {
  const [{ x, y }, setCoord] = useState({x: -100, y : -100}) 
  const device = useSelector(state => state.device);

  useEffect(
    () => {
        const mouseMove = event => {
          setCoord(() => ({
            x : event.pageX - 20,
            y : event.pageY - 20
          }))
        }

        window.addEventListener("mousemove", mouseMove);
        return(
            () => {
                window.removeEventListener("mousemove", mouseMove);
            }
        )
    } , [])

  if (device !== 'desktop') { 
    return null;
  }

  return (
    <div className="target">
      <img id="target-icon" 
        className='target-icon' 
        src='/assets/image/target.svg'
        style={{
          top: y,
          left: x
        }}
      />
    </div>
  )
}

export default Target;
