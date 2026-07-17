import { HiArrowPath, HiExclamationCircle } from 'react-icons/hi2';
export default function ErrorCard({ message, onRetry }) { return <div className="error-card" role="alert"><HiExclamationCircle /><div><strong>That didn’t quite land</strong><p>{message}</p></div><button onClick={onRetry}><HiArrowPath /> Retry</button></div>; }
