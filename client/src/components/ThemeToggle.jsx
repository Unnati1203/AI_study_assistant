import { HiMoon, HiSun } from 'react-icons/hi2';
export default function ThemeToggle({ dark, onToggle }) { return <button className="theme-toggle" onClick={onToggle} aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}>{dark ? <HiSun /> : <HiMoon />}</button>; }
