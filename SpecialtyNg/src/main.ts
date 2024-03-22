import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
// import { SocketIoModule } from 'ngx-socket-io';

// import { SocketIoConfig } from 'ngx-socket-io';

// const config:SocketIoConfig = {url: 'http://localhost:5050'}

bootstrapApplication(AppComponent, appConfig)
.catch((err) => console.error(err));

