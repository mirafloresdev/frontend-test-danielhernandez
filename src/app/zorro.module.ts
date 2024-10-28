import { NzButtonModule } from 'ng-zorro-antd/button';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTreeViewModule } from 'ng-zorro-antd/tree-view';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzPopoverModule } from 'ng-zorro-antd/popover';

const zorromodules = [
  NzFormModule,
  NzInputModule,
  NzMenuModule,
  NzAlertModule,
  NzButtonModule,
  NzCardModule,
  NzLayoutModule,
  NzBreadCrumbModule,
  NzTableModule,
  NzDividerModule,
  NzGridModule,
  NzIconModule,
  NzModalModule,
  NzSelectModule,
  NzSkeletonModule,
  NzToolTipModule,
  NzTabsModule,
  NzBadgeModule,
  NzDatePickerModule,
  NzCheckboxModule,
  NzSpinModule,
  NzPageHeaderModule,
  NzCarouselModule,
  NzListModule,
  NzTreeViewModule,
  NzRadioModule,
  NzPopoverModule,
  NzProgressModule

]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [
    zorromodules
  ]
})

export class ZorroModule{}
