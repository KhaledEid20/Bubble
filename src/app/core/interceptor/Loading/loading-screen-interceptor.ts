import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const loadingScreenInterceptor: HttpInterceptorFn = (req, next) => {
  const spinner = inject(NgxSpinnerService);

    spinner.show('sample', {
      type: 'ball-atom',
      size: 'medium',
      bdColor: 'rgba(0,0,0,0.8)',
      color: '#E17100',
      fullScreen: true,
      zIndex: 99999
  });

  return next(req).pipe(
    finalize(() => {
      spinner.hide('sample');
    })
  );
};
