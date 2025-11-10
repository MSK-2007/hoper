export function FrogLogo() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
      {/* Head */}
      <ellipse cx="40" cy="35" rx="28" ry="26" fill="currentColor" />

      {/* Left Eye */}
      <circle cx="28" cy="28" r="8" fill="white" />
      <circle cx="28" cy="28" r="5" fill="currentColor" />
      <circle cx="29" cy="26" r="2" fill="white" />

      {/* Right Eye */}
      <circle cx="52" cy="28" r="8" fill="white" />
      <circle cx="52" cy="28" r="5" fill="currentColor" />
      <circle cx="53" cy="26" r="2" fill="white" />

      {/* Mouth */}
      <path d="M 35 42 Q 40 45 45 42" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* Left Arm */}
      <ellipse cx="15" cy="45" rx="8" ry="14" fill="currentColor" transform="rotate(-25 15 45)" />

      {/* Right Arm */}
      <ellipse cx="65" cy="45" rx="8" ry="14" fill="currentColor" transform="rotate(25 65 45)" />

      {/* Left Leg */}
      <ellipse cx="25" cy="62" rx="10" ry="12" fill="currentColor" />

      {/* Right Leg */}
      <ellipse cx="55" cy="62" rx="10" ry="12" fill="currentColor" />
    </svg>
  )
}
