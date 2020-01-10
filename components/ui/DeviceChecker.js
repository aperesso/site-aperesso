import React , { useEffect , useCallback , useRef } from "react";

import { useSelector , useDispatch } from "../../lib/useRedux";
import { setDevice } from '../../reducers';

const MAX_WIDTH_MOBILE = 768;

const DeviceChecker = () => {

    const ref = useRef();
    const dispatch = useDispatch();

    const device = useSelector(state => state.device);

    const getDeviceFromWidth = useCallback(
        wi => {
            switch (wi) {
                case 5:
                    return "desktop";
                case 4:
                    return "tablet-landscape";
                case 3:
                    return "tablet-portrait";
                default:
                case 2:
                    return "mobile";
            }
        } , []
    )

    const onResize = useCallback(
        () => {
            const style = window.getComputedStyle(ref.current);
            const wi = parseInt(style.width, 10);
            const newDeviceType = getDeviceFromWidth(wi);

            if (device !== newDeviceType) {
                dispatch(setDevice(newDeviceType));
            }
        }
        , [getDeviceFromWidth, device, dispatch]
    )

    useEffect(
        () => {
            if (!device) {
                const style = window.getComputedStyle(ref.current);
                const wi = parseInt(style.width, 10);
                const device = getDeviceFromWidth(wi);
                dispatch(setDevice(device))
            }
            window.addEventListener('resize', onResize)
            return (
                () => {
                    window.removeEventListener('resize', onResize)
                }
            )
        }, [getDeviceFromWidth]
    )

    return (
        <div id="resizeChecker" ref={ref}/>
    )
}

export default DeviceChecker;