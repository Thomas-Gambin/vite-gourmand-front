type MenuSectionHeaderProps = {
  eyebrow: string
  title: string
  description?: string
  titleId?: string
  align?: 'left' | 'center'
}

export function MenuSectionHeader({
  eyebrow,
  title,
  description,
  titleId,
  align = 'left',
}: MenuSectionHeaderProps) {
  const isCentered = align === 'center'

  return (
    <header className={isCentered ? 'text-center' : ''}>
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">{eyebrow}</p>
      <h2
        id={titleId}
        className={[
          'mt-2 font-bold tracking-tight text-text',
          isCentered ? 'text-2xl sm:text-3xl' : 'text-2xl sm:text-[1.75rem]',
        ].join(' ')}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={[
            'mt-2 text-sm leading-relaxed text-text-muted sm:text-base',
            isCentered ? 'mx-auto max-w-lg' : 'max-w-2xl',
          ].join(' ')}
        >
          {description}
        </p>
      ) : null}
    </header>
  )
}
