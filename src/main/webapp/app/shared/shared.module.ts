import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

import { NgbDateMomentAdapter } from './util/datepicker-adapter';
import {
    JhipsterBlogSampleApplicationSharedLibsModule,
    JhipsterBlogSampleApplicationSharedCommonModule,
    JhiLoginModalComponent,
    HasAnyAuthorityDirective
} from './';

@NgModule({
    imports: [JhipsterBlogSampleApplicationSharedLibsModule, JhipsterBlogSampleApplicationSharedCommonModule],
    declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
    providers: [{ provide: NgbDateAdapter, useClass: NgbDateMomentAdapter }],
    entryComponents: [JhiLoginModalComponent],
    exports: [JhipsterBlogSampleApplicationSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterBlogSampleApplicationSharedModule {
    static forRoot() {
        return {
            ngModule: JhipsterBlogSampleApplicationSharedModule
        };
    }
}
