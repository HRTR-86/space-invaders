import { AppProvider } from './Provider/AppProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { GamePage } from '@/scripts/Pages/Game/GamePage';
import '@/sass/app.scss';

const Index = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route
            path="/"
            element={<GamePage />}
          />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
};

const container = document.getElementById('app');
const root = createRoot(container!);
root.render(<Index />);
