import React , { memo , useEffect , useState } from 'react';

const Target = coord => {
  const [{ x, y }, setCoord] = useState({x: 0, y : 0}) 

  useEffect(
    () => {
        const mouseMove = event => {
          setCoord(() => ({
            x : event.clientX,
            y : event.clientY
          }))
        }

        window.addEventListener("mousemove", mouseMove);
        return(
            () => {
                window.removeEventListener("mousemove", mouseMove);
            }
        )
    } , [])

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
