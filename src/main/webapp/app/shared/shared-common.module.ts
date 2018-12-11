import { NgModule } from '@angular/core';

import { JhipsterBlogSampleApplicationSharedLibsModule, FindLanguageFromKeyPipe, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [JhipsterBlogSampleApplicationSharedLibsModule],
    declarations: [FindLanguageFromKeyPipe, JhiAlertComponent, JhiAlertErrorComponent],
    exports: [JhipsterBlogSampleApplicationSharedLibsModule, FindLanguageFromKeyPipe, JhiAlertComponent, JhiAlertErrorComponent]
})
export class JhipsterBlogSampleApplicationSharedCommonModule {}
