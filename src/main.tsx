import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

// import './seeds/seedSkills.ts'
// import './seeds/migrationAssignees';
// import './seeds/seedExperiences.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
