import { motion } from 'framer-motion';
export default function Loading() { return <motion.div className="loading-card" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><div className="loader"><i/><i/><i/></div><div><strong>Shaping your study set</strong><p>Finding the ideas worth remembering…</p></div></motion.div>; }
