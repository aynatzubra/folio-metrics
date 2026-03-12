import clsx from 'clsx'

type SectionHeaderProps = {
  title: string
  subtitle?: string
  className?: string
}

export const SectionHeader = ({ title, subtitle, className }: SectionHeaderProps) => {
  return (
    <div
      className={clsx(
        `
          flex w-full items-start justify-end
          px-1
          lg:px-14
          lg:flex-[0_0_30%]
        `,
        className,
      )}
    >
      <div className="flex w-full flex-col text-center lg:items-start lg:text-left">
        <h2 className="font-[Inter] text-brand text-5xl font-semibold">{title}</h2>

        {subtitle ? (
          <blockquote className="mt-3 text-sm font-normal text-gray-600 sm:mt-4">
            [{subtitle}]
          </blockquote>
        ) : null}
      </div>
    </div>
  )
}

export default SectionHeader
