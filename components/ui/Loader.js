import React , { useEffect , useState , useMemo , useCallback} from "react";

import '../../scss/ui/loader.scss';
import { useSelector , useDispatch } from "../../lib/useRedux";
import { enterWebGl } from '../../reducers';


const Loader = ({loading, onStart }) => {

    const [shouldRender, setRender] = useState(loading);
    const [ enteredWebGL ] = useSelector(state => [state.enteredWebGL])

    const dispatch = useDispatch();

    const onAnimationEnd = () => setRender(false)

    const renderLoading = useMemo(
        () => (
            <svg 
                className="loader-loading" viewBox="0 0 100 100"
                style={{animation: !loading ? "fadeOut 0.2s ease-out" : "none"}}
            >
                <path
                fill="#fff"
                d="M73 50c0-12.7-10.3-23-23-23S27 37.3 27 50m3.9 0c0-10.5 8.5-19.1 19.1-19.1S69.1 39.5 69.1 50"
                >
                    <animateTransform
                        attributeName="transform"
                        attributeType="XML"
                        type="rotate"
                        dur="1s"
                        from="0 50 50"
                        to="360 50 50"
                        repeatCount="indefinite"
                    />
                </path>
            </svg>
        ) , []
    )
    
    const onEnter = useCallback(
        () => {
            onStart()
            dispatch(enterWebGl())
        },
        [dispatch, onStart],
    )

    const enterScreen = useMemo(
        () => (
            <button 
                className="no-btn loader-waiting" 
                onClick={onEnter}
            >
                start
            </button>
        ) 
        , [loading, onEnter, enteredWebGL]
    )


    const renderState = useMemo(
        () => {
            if (loading) return renderLoading;
            if (!enteredWebGL) return enterScreen;
        }
        , [enterScreen, enteredWebGL]
    )

    if (!shouldRender) return null;

    return (
        <div className="loader"
         style={{animation : !loading && enteredWebGL ? "fadeOut 1s ease-out" : 'none' }}
         onAnimationEnd={onAnimationEnd}>
            <div className="loader-wrapper">
                { renderState }
            </div>
        </div> 
    )
}

export default Loader;