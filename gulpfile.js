const {src, dest, parallel, series, watch} = require('gulp')

const del = require('del')
const browserSync = require('browser-sync')

const sass = require('gulp-sass')
const babel = require('gulp-babel')
const imagemin = require('gulp-imagemin')
const htmlMin = require('gulp-htmlmin')
const cleanCss = require('gulp-clean-css')
const ugilfy = require('gulp-uglify')
const replace = require('gulp-replace')
const rename = require('gulp-rename')

const bs = browserSync.create()

const style = () => {
  return src('src/assets/css/*.scss', {base: 'src'})
    .pipe(sass())
    .pipe(cleanCss())
    .pipe(rename({
      'suffix': '.min'
    }))
    .pipe(dest('dist'))
    .pipe(bs.reload({stream:true}))
}

const script = () => {
  return src('src/assets/js/*.js', {base: 'src'})
  .pipe(babel({presets: ['@babel/preset-env']}))
  .pipe(ugilfy())
  .pipe(dest('dist'))
  .pipe(bs.reload({stream:true}))
}

const page = () => {
  return src('src/*.html', {base: 'src'})
    .pipe(replace('.scss', '.min.css'))
    .pipe(htmlMin({
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true
    }))
    .pipe(dest('dist'))
    .pipe(bs.reload({stream:true}))
}

const image = () => {
  return src('src/assets/images/**', {base: 'src'})
    .pipe(imagemin())
    .pipe(dest('dist'))
}

const font = () => {
  return src("src/assets/fonts/**", { base: 'src' })
    .pipe(dest('dist'))
}

// 处理public中的文件
const extra = () => {
  return src('public/**', {base: 'public'})
    .pipe(dest('dist'))
}

//清理dist
const clean = () => {
  return del(['dist'])
}

const serve = () => {
  watch('src/assets/css/*.scss', style)
  watch('src/assets/js/*.js', script)
  watch('src/*.html', page)
  // 图片和字体和public变化 刷新页面
  watch(['src/assets/images/**', 'src/assets/fonts/**', 'public/**'], bs.reload)
  // watch('src/assets/images/**', image)
  // watch('public/**', extra)

  bs.init({
    notify: false,
    port: 2080,
    server: {
      baseDir: ['dist', 'src', 'public'],
      routes: {
        '/node_modules': 'node_modules'
      }
    }
  })
} 

// parallel并行 处理css js html 
const compile = parallel(style, script, page)
// serires 串行 先清除dist 然后构建
const build = series(clean, parallel(compile, image, font, extra))

const develop  = series(compile, serve)

module.exports = {
  clean,
  build,
  develop
}