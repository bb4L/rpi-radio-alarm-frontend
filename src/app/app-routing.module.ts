import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadChildren: './home/home.module#HomePageModule'
    },
    {path: 'alarms', loadChildren: './pages/alarms/alarms.module#AlarmsPageModule'},
    {path: 'settings', loadChildren: './pages/settings/settings.module#SettingsPageModule'},
    {path: 'radio', loadChildren: './pages/radio/radio.module#RadioPageModule'},
    {path: 'alarm-detail/:alarm', loadChildren: './pages/alarm-detail/alarm-detail.module#AlarmDetailPageModule'}
    // { path: '', loadChildren: './pages/tabs/tabs.modules#TabsPageModule'}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
