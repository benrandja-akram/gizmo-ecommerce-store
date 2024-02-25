import { clsx } from '@/utils/clsx'
import ReactMarkdown from 'react-markdown'

function Markdown({
  className,
  content,
  ...props
}: DivProps & { content: string }) {
  return (
    <div className={clsx('prose', className)} {...props}>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  )
}

export { Markdown }
