import { clsx } from '@/components/ui/clsx'

const policies = [
  {
    name: 'Livraison dans les 58 Wilayas',
    description:
      'Nous offrons fièrement la livraison dans les 58 Wilayas, garantissant que nos produits vous parviennent où que vous soyez dans la région.',
    imageSrc:
      'https://tailwindui.com/img/ecommerce/icons/icon-gift-card-light.svg',
  },
  {
    name: 'Paiement à la Livraison',
    description:
      "Vous pouvez payer votre commande au moment de la livraison, vous offrant ainsi flexibilité et tranquillité d'esprit. Il vous suffit de passer votre commande et de payer lorsque vos articles arrivent.",
    imageSrc:
      'https://tailwindui.com/img/ecommerce/icons/icon-fast-checkout-light.svg',
  },
  {
    name: 'Assistance client 24h/24 et 7j/7',
    description:
      'Notre équipe de support dévouée est toujours disponible pour vous aider, de jour comme de nuit, garantissant une assistance rapide et fiable à tout moment',
    imageSrc: 'https://tailwindui.com/img/ecommerce/icons/icon-chat-light.svg',
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
