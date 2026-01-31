import clsx from 'clsx'

type SectionHeaderProps = {
  title: string
  subtitle?: string
  className?: string
}

const SectionHeader = ({ title, subtitle, className }: SectionHeaderProps) => {
  return (
    <div
      className={clsx(
        `
          flex w-full items-start justify-end
          px-7 pt-7
          md:px-14 md:pt-12
          lg:flex-[0_0_30%] lg:pt-16 lg:pb-6
        `,
        className,
      )}
    >
      <div className="flex w-full flex-col text-center lg:items-end lg:text-right">
        <h2 className="font-[Inter] text-5xl font-semibold">{title}</h2>

        {subtitle ? (
          <blockquote className="mt-3 text-sm font-normal italic text-gray-600 sm:mt-4">
            [{subtitle}]
          </blockquote>
        ) : null}
      </div>
    </div>
  )
}

export default SectionHeader
