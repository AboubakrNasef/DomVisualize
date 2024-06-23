import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { VisualizerComponent } from './visualizer/visualizer.component';
import { EditorComponent } from './editor/editor.component';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { FormsModule } from '@angular/forms';
import { NgxPanZoomModule } from 'ngx-panzoom';
import { HtmlRenderComponent } from './html-render/html-render.component';

@NgModule({
  declarations: [
    AppComponent,
    VisualizerComponent,
    EditorComponent,
    HtmlRenderComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MonacoEditorModule.forRoot(),
    NgxPanZoomModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
