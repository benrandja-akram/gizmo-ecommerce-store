import ReactMarkdown from 'react-markdown'
import { clsx } from './clsx'

function Markdown({
  className,
  content,
  ...props
}: React.ComponentProps<'div'> & { content: string }) {
  return (
    <div className={clsx('prose max-w-full', className)} {...props}>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  )
}

export { Markdown }
