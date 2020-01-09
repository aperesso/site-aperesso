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
                <svg viewBox="0 0 512 512" fill="#fafafa">
                    <path d="M173.781 280.469c-4.16 4.16-4.16 10.923 0 15.083a10.716 10.716 0 007.552 3.115c2.731 0 5.461-1.045 7.531-3.115l64-64a10.643 10.643 0 002.304-3.477c.299-.747.341-1.515.469-2.304.107-.597.363-1.152.363-1.771 0-.811-.299-1.536-.469-2.283-.128-.576-.128-1.195-.363-1.749a11.19 11.19 0 00-2.368-3.563l-63.936-63.936c-4.16-4.16-10.923-4.16-15.083 0s-4.16 10.923 0 15.083l45.76 45.781H32c-5.888 0-10.667 4.779-10.667 10.667S26.112 234.667 32 234.667h187.584l-45.803 45.802z" />
                    <path d="M444.608 0c-1.643 0-3.243.32-4.843.491-.81-.192-1.578-.491-2.432-.491h-256C151.936 0 128 23.936 128 53.333V160c0 5.888 4.779 10.667 10.667 10.667s10.667-4.779 10.667-10.667V53.333c0-17.643 14.357-32 32-32h204.032l-80.107 34.325a46.033 46.033 0 00-27.925 42.347v328.661h-96c-15.339 0-28.373-10.667-31.552-15.083l-.448-123.627c-.021-5.867-4.8-10.624-10.667-10.624h-.043c-5.888.021-10.645 4.821-10.624 10.709l.491 124.309c-.427 4.672 1.771 9.557 6.677 14.933 8.725 9.557 26.048 20.715 46.165 20.715h96v17.941c0 25.387 20.672 46.059 46.059 46.059a45.811 45.811 0 0018.133-3.712l121.216-51.947a46.033 46.033 0 0027.925-42.347V46.059C490.667 20.672 469.995 0 444.608 0zm24.725 413.995a24.677 24.677 0 01-14.997 22.72L333.12 488.661c-3.072 1.344-6.357 2.005-9.728 2.005-13.632 0-24.725-11.093-24.725-24.725V98.005a24.677 24.677 0 0114.997-22.72L434.88 23.339c3.072-1.344 6.357-2.005 9.728-2.005 13.632 0 24.725 11.093 24.725 24.725v367.936z" />
                    <path d="M330.667 234.667c-5.888 0-10.667 4.779-10.667 10.667V288c0 5.888 4.779 10.667 10.667 10.667s10.667-4.779 10.667-10.667v-42.667c-.001-5.888-4.779-10.666-10.667-10.666z" />
                </svg>
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