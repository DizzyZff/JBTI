import { AppRenderer } from './ui/renderer';
import { loadConfig } from './services/configService';
import './style.css';

loadConfig().then(() => {
  const app = new AppRenderer('app');
  app.start();
});
