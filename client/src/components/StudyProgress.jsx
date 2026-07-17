import { HiChartBar, HiCheckBadge, HiRectangleStack } from 'react-icons/hi2';
import './progress.css';

export default function StudyProgress({ data }) {
  const facts = [{ icon: <HiRectangleStack />, value: data.flashcards.length, label: 'Flashcards ready' }, { icon: <HiCheckBadge />, value: data.quiz.length, label: 'Quiz questions' }, { icon: <HiChartBar />, value: data.difficulty, label: 'Suggested level' }];
  return <div className="study-panel progress-panel"><div className="deck-header"><div><p className="eyebrow">Study overview</p><h2>Your next session</h2></div><span className="pill">Ready to begin</span></div><div className="stat-grid">{facts.map((fact) => <article key={fact.label}><span>{fact.icon}</span><strong>{fact.value}</strong><p>{fact.label}</p></article>)}</div><div className="progress-note"><strong>A gentle starting point</strong><p>Flip through the cards once, then take the quiz without peeking. Use missed answers as your review list.</p></div></div>;
}
