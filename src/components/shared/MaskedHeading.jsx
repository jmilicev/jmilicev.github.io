/* Heading whose words slide up out of a mask when the parent .reveal becomes visible */
export default function MaskedHeading({ text, className = '', as: Tag = 'h2' }) {
  return (
    <Tag className={`mh ${className}`} aria-label={text}>
      {text.split(' ').map((word, i) => (
        <span className="mh-w" key={i} aria-hidden="true">
          <span className="mh-i" style={{ '--wd': `${120 + i * 70}ms` }}>{word}</span>
        </span>
      ))}
    </Tag>
  )
}
