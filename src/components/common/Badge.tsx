import type { EvidenceStatus } from '../../types';

interface BadgeProps {
  status: EvidenceStatus | string;
  size?: 'sm' | 'md';
}

export const EvidenceBadge: React.FC<BadgeProps> = ({ status, size = 'sm' }) => {
  let colorStyles = 'bg-slate-100 text-slate-700 border-slate-200';

  if (status === 'Demonstration Sample') {
    colorStyles = 'bg-amber-50 text-amber-800 border-amber-200';
  } else if (status === 'Preliminary Hypothesis') {
    colorStyles = 'bg-blue-50 text-blue-800 border-blue-200';
  } else if (status === 'Needs Field Verification') {
    colorStyles = 'bg-rose-50 text-rose-800 border-rose-200';
  } else if (status === 'Qualitative Observation') {
    colorStyles = 'bg-emerald-50 text-emerald-800 border-emerald-200';
  } else if (status === 'Secondary Benchmark') {
    colorStyles = 'bg-purple-50 text-purple-800 border-purple-200';
  }

  const sizeStyles = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-xs px-2.5 py-1 font-medium';

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border font-medium tracking-tight ${sizeStyles} ${colorStyles}`}
      title="Evidence Confidence Status"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70"></span>
      {status}
    </span>
  );
};
