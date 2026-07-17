import { motion } from 'framer-motion';
import { HiSparkles } from 'react-icons/hi2';
import ThemeToggle from './ThemeToggle';

export default function Navbar({ dark, onToggle }) {
  return <nav className="nav shell"><a className="brand" href="#top" aria-label="Luma home"><span><HiSparkles /></span>Luma</a><div className="nav-right"><span className="status-dot">Study smarter</span><ThemeToggle dark={dark} onToggle={onToggle} /></div></nav>;
}
