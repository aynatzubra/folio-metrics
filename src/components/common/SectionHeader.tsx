import clsx from 'clsx'

type SectionHeaderProps = {
  title: string
  subtitle?: string
  theme: 'cream' | 'peach'
}

const SectionHeader = ({ title, subtitle, theme }: SectionHeaderProps) => {
  const themeClasses = {
    cream: 'lg:bg-[#FBE1D0]', // Technical Skills
    peach: 'lg:bg-[#F6D8C2]', // About Me
  }
  return (
    <div
      className={clsx(
        `
         w-full lg:flex-[0_0_30%] flex items-start justify-end
          pt-7 px-7 lg:pt-16 lg:pb-6 md:pt-12 md:px-14 md:pb-0
      `,
        themeClasses[theme],
      )}
    >
      {/* Titles Block */}
      <div
        className="
          flex w-full flex-col
          text-center
          lg:items-end lg:justify-end lg:text-right
        "
      >
        <h2
          className="
            w-full h-[38px]
            text-md font-bold tracking-wider uppercase text-[#FFFFFF] text-center
            py-2
            bg-[#F67769]
          "
        >
          {title}
        </h2>
        <blockquote className="text-sm text-gray-600 mt-3 sm:mt-4 font-normal italic">[{subtitle}]</blockquote>
      </div>
    </div>
  )
}

export default SectionHeader