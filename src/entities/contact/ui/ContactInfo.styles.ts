export const getContactStyles = (variant: 'hero' | 'footer') => {
  const isFooter = variant === 'footer'

  return {
    baseButton:
      'inline-flex items-center justify-center rounded-[4px] ' +
      'font-bold tracking-widest outline-none ' +
      'transition-colors duration-200 ease-out ' +
      'focus-visible:ring-2 focus-visible:ring-offset-2',

    colorScheme: isFooter
      ? {
        primary: 'bg-accent text-white border-accent hover:bg-accent/90',
        outline: 'bg-transparent text-white border-white/70 hover:bg-accent/10',
      }
      : {
        primary: 'bg-brand text-white border-brand hover:shadow-[0_10px_10px_-8px_rgba(11,54,61,0.45)]',
        outline: 'bg-transparent text-brand border-brand hover:bg-brand/5',
      },

    layout: isFooter ? 'flex flex-wrap justify-center gap-3' : 'flex flex-col gap-4',

    size: isFooter ? 'px-3 py-2 text-xs border-1 w-auto' : 'px-8 py-4 text-sm border-2 w-full xl:w-64',

    heroInnerLayout: 'flex flex-col items-center justify-center flex-wrap sm:flex-row sm:justify-center xl:flex-col gap-3 xl:gap-4',
  }
}