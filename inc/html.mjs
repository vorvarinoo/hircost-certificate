import gulp from 'gulp';
import notify from 'gulp-notify';
import gulpIf from 'gulp-if';
import fileInclude from 'gulp-file-include';
import beautifyHTML from 'gulp-html-beautify';

const {
  src,
  dest
} = gulp;

const isDev = process.env.NODE_ENV === 'development';

const compileHTML = () => {
  return src( [ './src/*.html', '!./src/head.html', '!./src/footer.html' ] )
    .pipe( fileInclude( {
      prefix: '@',
      basepath: '@file'
    } ).on( 'error', notify.onError() ) )
    .pipe( gulpIf( !isDev, beautifyHTML( {
      'indent_size': 2
    } ) ) )
    .pipe( dest( './build/' ) );
};

export default compileHTML;