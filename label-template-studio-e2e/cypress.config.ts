import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      webServerCommands: {
        default: 'nx run label-template-studio:serve',
        production: 'nx run label-template-studio:preview',
      },
      ciWebServerCommand: 'nx run label-template-studio:serve-static',
    }),
    baseUrl: 'http://localhost:4200',
  },
});
