import React , { memo , useEffect , useState } from 'react';

const Target = coord => {
  const [{ x, y }, setCoord] = useState({x: -100, y : -100}) 

  useEffect(
    () => {
        const mouseMove = event => {
          setCoord(() => ({
            x : event.clientX - 20,
            y : event.clientY - 20
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
