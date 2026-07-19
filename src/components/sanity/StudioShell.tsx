'use client';

import { Studio } from 'sanity';
import config from '../../../sanity.config';

export default function StudioShell() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, height: '100dvh', background: '#fff' }}>
      <Studio config={config} />
    </div>
  );
}
