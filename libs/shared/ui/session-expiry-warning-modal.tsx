import { useEffect, useState } from 'react';

import { cn } from './cn';

export type SessionExpiryWarningModalProps = {
  expiresAt: string;
  warningThresholdSeconds: number;
  title: string;
  description: string;
  continueLabel: string;
  onContinue: () => void;
  continueDisabled?: boolean;
  className?: string;
};

export const SessionExpiryWarningModal = ({
  expiresAt,
  warningThresholdSeconds,
  title,
  description,
  continueLabel,
  onContinue,
  continueDisabled = false,
  className,
}: SessionExpiryWarningModalProps) => {
  const [remainingSeconds, setRemainingSeconds] = useState(() =>
    getRemainingSeconds(expiresAt),
  );

  useEffect(() => {
    setRemainingSeconds(getRemainingSeconds(expiresAt));

    const intervalId = window.setInterval(() => {
      setRemainingSeconds(getRemainingSeconds(expiresAt));
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [expiresAt]);

  if (remainingSeconds > warningThresholdSeconds) return null;

  const formattedTime = formatRemainingTime(remainingSeconds);

  return (
    <div
      aria-labelledby="session-expiry-warning-title"
      aria-modal="true"
      className="fixed inset-0 z-50 grid place-items-center bg-slate-950/35 p-4 backdrop-blur-sm"
      role="dialog"
    >
      <div
        className={cn(
          'w-full max-w-sm rounded-lg border border-amber-200 bg-white p-6 text-slate-950 shadow-xl',
          className,
        )}
      >
        <h2
          className="text-lg font-bold"
          id="session-expiry-warning-title"
        >
          {title}
        </h2>
        <p className="mt-2 text-sm text-slate-600">{description}</p>
        <p className="mt-5 text-center font-mono text-5xl font-black tabular-nums text-amber-600">
          {formattedTime}
        </p>
        <button
          className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={continueDisabled}
          onClick={onContinue}
          type="button"
        >
          {continueLabel}
        </button>
      </div>
    </div>
  );
};

const getRemainingSeconds = (expiresAt: string): number => {
  const expiresAtTimestamp = Date.parse(expiresAt);

  if (Number.isNaN(expiresAtTimestamp)) {
    return 0;
  }

  return Math.ceil((expiresAtTimestamp - Date.now()) / 1000);
};

const formatRemainingTime = (remainingSeconds: number): string => {
  const visibleRemainingSeconds = Math.max(remainingSeconds, 0);
  const minutes = Math.floor(visibleRemainingSeconds / 60);
  const seconds = visibleRemainingSeconds % 60;

  return `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;
};
