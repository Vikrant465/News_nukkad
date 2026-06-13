// 'use client';

// import { useEffect, useRef, useState } from 'react';

// interface GoogleAdProps {
//   slot: string;
//   format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
//   className?: string;
//   style?: React.CSSProperties;
// }

// export default function GoogleAd({
//   slot,
//   format = 'auto',
//   className = '',
//   style = {},
// }: GoogleAdProps) {
//   const insRef = useRef<HTMLModElement>(null);
//   const pushed = useRef(false); // guard against React Strict Mode double-invoke
//   const [visible, setVisible] = useState(false);

//   useEffect(() => {
//     // React Strict Mode mounts → unmounts → remounts every component in dev.
//     // Without this guard, push() fires twice on the same <ins>, causing the
//     // "all ins elements already have ads" TagError. The ref persists across
//     // the remount so the second run is skipped cleanly.
//     if (pushed.current) return;
//     pushed.current = true;

//     try {
//       // @ts-ignore
//       (window.adsbygoogle = window.adsbygoogle || []).push({});
//     } catch (e) {
//       // Swallow silently — in production this never fires.
//     }

//     // Wait for AdSense to attempt filling the slot, then check if it succeeded.
//     // data-ad-status="filled" means an ad was served.
//     // If unfilled or missing, the wrapper stays hidden — no blank space.
//     const timer = setTimeout(() => {
//       const el = insRef.current;
//       if (el) {
//         const status = el.getAttribute('data-ad-status');
//         if (status === 'filled') {
//           setVisible(true);
//         }
//       }
//     }, 1500);

//     return () => clearTimeout(timer);
//   }, []);

//   // When not visible, render nothing at all — zero height, zero space.
//   if (!visible) {
//     return (
//       <div className="hidden">
//         <ins
//           ref={insRef}
//           className="adsbygoogle"
//           style={{ display: 'block' }}
//           data-ad-client="ca-pub-1713824211403479"
//           data-ad-slot={slot}
//           data-ad-format={format}
//           data-full-width-responsive="true"
//         />
//       </div>
//     );
//   }

//   return (
//     <div className={`overflow-hidden ${className}`} style={style}>
//       <ins
//         ref={insRef}
//         className="adsbygoogle"
//         style={{ display: 'block', ...style }}
//         data-ad-client="ca-pub-1713824211403479"
//         data-ad-slot={slot}
//         data-ad-format={format}
//         data-full-width-responsive="true"
//       />
//     </div>
//   );
// }

'use client';

import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

interface GoogleAdProps {
  slot: string;
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  className?: string;
  style?: React.CSSProperties;
}

export default function GoogleAd({
  slot,
  format = 'auto',
  className = '',
  style = {},
}: GoogleAdProps) {
  const insRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (pushed.current) return;
    pushed.current = true;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // Swallow silently — in production this never fires.
    }

    const timer = setTimeout(() => {
      const el = insRef.current;
      if (el) {
        const status = el.getAttribute('data-ad-status');
        if (status === 'filled') {
          setVisible(true);
        }
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) {
    return (
      <div className="hidden">
        <ins
          ref={insRef}
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-1713824211403479"
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  return (
    <div className={`overflow-hidden ${className}`} style={style}>
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={{ display: 'block', ...style }}
        data-ad-client="ca-pub-1713824211403479"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}