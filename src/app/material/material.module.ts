import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule,MatToolbarModule ,MatTabsModule,MatInputModule,MatListModule} from '@angular/material';

@NgModule({
  imports: [FormsModule, ReactiveFormsModule ,MatButtonModule,MatToolbarModule,MatTabsModule,
            MatInputModule ,MatListModule],
  exports: [FormsModule, ReactiveFormsModule ,MatButtonModule,MatToolbarModule,MatTabsModule,
            MatInputModule ,MatListModule],
})

export class MaterialModule { }
