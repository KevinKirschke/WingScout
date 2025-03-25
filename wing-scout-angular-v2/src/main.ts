import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

import { NgIncludeDirective } from './ng-include.directive';

bootstrapApplication(AppComponent, {
  providers: [],
  // 💪 Hier richtig einhängen
  standalone: true,
  imports: [NgIncludeDirective],
})
  .catch((err) => console.error(err));
