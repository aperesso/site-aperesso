import { useSelector as useRedux, shallowEqual, useDispatch } from 'react-redux'
import _isEqual from 'lodash.isequal';

const useSelector = selector => useRedux(selector, shallowEqual);
const useDeepSelector = selector => useRedux(selector, _isEqual);
export { useDispatch, useSelector , useDeepSelector };