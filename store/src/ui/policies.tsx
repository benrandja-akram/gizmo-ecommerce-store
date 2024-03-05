import { clsx } from '@/utils/clsx'

const policies = [
  {
    name: '24/7 Customer Support',
    description:
      'Or so we want you to believe. In reality our chat widget is powered by a naive series of if/else statements that churn out canned responses. Guaranteed to irritate.',
    imageSrc: 'https://tailwindui.com/img/ecommerce/icons/icon-chat-light.svg',
  },
  {
    name: 'Fast Shopping Cart',
    description:
      "Look at the cart in that icon, there's never been a faster cart. What does this mean for the actual checkout experience? I don't know.",
    imageSrc:
      'https://tailwindui.com/img/ecommerce/icons/icon-fast-checkout-light.svg',
  },
  {
    name: 'Gift Cards',
    description:
      "We sell these hoping that you will buy them for your friends and they will never actually use it. Free money for us, it's great.",
    imageSrc:
      'https://tailwindui.com/img/ecommerce/icons/icon-gift-card-light.svg',
  },
]

function Policies({ className, ...props }: React.ComponentProps<'section'>) {
  return (
    <section
      aria-labelledby="policy-heading"
      className={clsx(
        'my-16 rounded-lg border bg-white p-4 md:p-12 lg:my-24 ',
        className,
      )}
      {...props}
    >
      <h2 id="policy-heading" className="sr-only">
        Our policies
      </h2>
      <div className="grid grid-cols-1 gap-y-6 divide-y sm:gap-x-6 lg:grid-cols-3  lg:gap-x-8 lg:gap-y-12 lg:divide-y-0">
        {policies.map((policy) => (
          <div key={policy.name} className="pt-6  lg:pt-0">
            <img src={policy.imageSrc} alt="" className="mx-auto h-24 w-auto" />
            <h3 className="mt-6 text-center text-base font-medium text-gray-900">
              {policy.name}
            </h3>
            <p className="mt-3 text-center text-base text-gray-500">
              {policy.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export { Policies }
