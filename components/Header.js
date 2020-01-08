import React , { useEffect , useState , useCallback } from 'react';
import Link from 'next/link';


import '../scss/header.scss';

const Header = () => {

    const [audio, setAudio] = useState();

    useEffect(() => {
        const _audio = new Audio('/assets/audio/Artificialheart.mp3');
        _audio.volume = 1;
        setAudio(() => _audio)
    }, [])
    
    const onMouseEnter = useCallback(
        () => {
            audio.play();
        }
        , [audio]
    )

    return (
        <header className='header'>
          <span>
                <Link href="/" >
                    <a onMouseEnter={onMouseEnter} title="alexiaperesson"> AP </a>
                </Link>
          </span>
          <ul>
            <li>
                <Link href="/about">
                    <a onMouseEnter={onMouseEnter} title="about"> About </a>
                </Link>
            </li>
            <li>
                <Link href="/contact">
                    <a onMouseEnter={onMouseEnter} title="contact"> Contact 👋 </a>
                </Link>
            </li>
          </ul>
      </header>
    )
}

export default Header;