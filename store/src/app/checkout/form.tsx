'use client'

import {
  Description,
  ErrorMessage,
  Field,
  FieldGroup,
  Fieldset,
  Label,
  Legend,
} from '@/components/fieldset'
import { Input } from '@/components/input'
import { Listbox, ListboxLabel, ListboxOption } from '@/components/listbox'
import { Radio, RadioField, RadioGroup } from '@/components/radio'
import { Text } from '@/components/text'
import { Textarea } from '@/components/textarea'
import { useCart } from '@/hooks/use-cart'
import { CartProducts, EmptyCart } from '@/ui/cart'
import { ProductFallback } from '@/ui/product-fallback'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Product } from '@prisma/client'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { SchemaValue, checkoutSchema } from './schema'

type Props = {
  fees: DeliveryFeesRoot
  centers: CentersRoot
  communes: CommunesRoot['data']
}
function CheckoutForm({ fees, centers, communes }: Props) {
  const [mounted, setMounted] = useState(false)
  const cart = useCart()
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SchemaValue>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      deliveryType: 'to-home',
    },
  })
  const [products, setProducts] = useState<Product[]>()
  const ids = useMemo(() => cart.items.map((item) => item.id), [cart.items])

  useEffect(() => {
    setMounted(true)
  }, [])
  useEffect(() => {
    if (ids.length) {
      const search = new URLSearchParams()
      ids.forEach((id) => search.append('product', id.toString()))
      fetch(`/api/products?${search}`)
        .then((res) => res.json())
        .then(setProducts)
    }
  }, [ids])

  if (!mounted) return <div className="min-h-[600px] bg-gray-50" />
  if ((products && !products?.length) || !ids.length) {
    return (
      <div className="mx-4">
        <div className="mx-auto my-12 mb-96 max-w-lg">
          <EmptyCart />
        </div>
      </div>
    )
  }

  const deliveryType = watch('deliveryType')
  const wilayaValue = watch('wilaya')
  const selectedWilayaFee = fees.data.find(
    (w) => w.wilaya_id.toString() === wilayaValue,
  )

  const subtotal =
    products?.reduce(
      (acc, current) =>
        acc +
        current.price *
          (cart.items.find((i) => i.id === current.id)?.quantity ?? 0),
      0,
    ) ?? 0

  const deliveryFee =
    (deliveryType === 'to-home'
      ? selectedWilayaFee?.home_fee
      : selectedWilayaFee?.desk_fee) ?? 0

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Checkout</h2>

        <form
          onSubmit={handleSubmit(console.log)}
          className="items-start lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16"
        >
          <div className="grid gap-4">
            <h2 className="text-lg font-medium text-gray-900">
              Les détails de livraison
            </h2>
            <Fieldset>
              <FieldGroup>
                <Field>
                  <Label>Numéro de téléphone</Label>
                  <Input
                    {...register('phone')}
                    type="tel"
                    autoComplete="tel-local"
                    invalid={!!errors.phone}
                  />
                  {errors.phone && (
                    <ErrorMessage>
                      {errors.phone.message as string}
                    </ErrorMessage>
                  )}
                </Field>
              </FieldGroup>
              <FieldGroup>
                <Field>
                  <Label>Nom et prénom</Label>
                  <Input {...register('name')} invalid={!!errors.name} />
                  {errors.name && (
                    <ErrorMessage>{errors.name.message as string}</ErrorMessage>
                  )}
                </Field>
                <Field>
                  <Label>Wilaya</Label>
                  <Listbox
                    placeholder="Sélectionnez votre wilaya"
                    name="wilaya"
                    onChange={(wilaya: string) => {
                      setValue('wilaya', wilaya.toString(), {
                        shouldValidate: true,
                      })
                      setValue('stopDesk', '', {
                        shouldValidate: true,
                      })
                      setValue('commune', '', {
                        shouldValidate: true,
                      })
                    }}
                    invalid={!!errors.wilaya}
                  >
                    {fees.data.map((wilaya) => {
                      return (
                        <ListboxOption
                          key={wilaya.wilaya_id}
                          value={wilaya.wilaya_id.toString()}
                        >
                          <ListboxLabel className="tabular-nums">
                            <strong>
                              {wilaya.wilaya_id > 9
                                ? wilaya.wilaya_id
                                : `0${wilaya.wilaya_id}`}
                            </strong>{' '}
                            - {wilaya.wilaya_name}
                          </ListboxLabel>
                        </ListboxOption>
                      )
                    })}
                  </Listbox>

                  {errors.wilaya && (
                    <ErrorMessage>
                      {errors.wilaya.message as string}
                    </ErrorMessage>
                  )}
                </Field>
                {selectedWilayaFee && (
                  <>
                    <Field>
                      <Label>Type de livraison</Label>
                      <RadioGroup
                        name="deliveryType"
                        onChange={(value) =>
                          setValue('deliveryType', value, {
                            shouldValidate: true,
                          })
                        }
                        defaultValue="to-home"
                      >
                        <RadioField>
                          <Radio value="to-home" />
                          <Label>
                            Livraison à domicile -{' '}
                            <strong>{selectedWilayaFee?.home_fee}DA</strong>
                          </Label>
                          <Description>
                            La livraison de vos produits directement à domicile
                            avec le service Yalidine.
                          </Description>
                        </RadioField>
                        <RadioField>
                          <Radio value="to-stop-desk" />
                          <Label>
                            Bureau d'agence Yalidine -{' '}
                            <strong>{selectedWilayaFee?.desk_fee}DA</strong>
                          </Label>
                          <Description>
                            Récupérer votre produits au bureau d'agence
                            Yalidine.
                          </Description>
                        </RadioField>
                      </RadioGroup>

                      {errors.deliveryType && (
                        <ErrorMessage>
                          {errors.deliveryType.message as string}
                        </ErrorMessage>
                      )}
                    </Field>
                    {deliveryType === 'to-stop-desk' && (
                      <Field>
                        <Label>Bureau d'agence Yalidine</Label>

                        <Listbox
                          placeholder="Sélectionnez un bureau d'agence"
                          name="stopDesk"
                          onChange={(stopDesk: string) =>
                            setValue('stopDesk', stopDesk, {
                              shouldValidate: true,
                            })
                          }
                          invalid={!!errors.stopDesk}
                        >
                          {centers.data
                            .filter(
                              (center) =>
                                center.wilaya_id.toString() === wilayaValue,
                            )
                            .map((center) => {
                              return (
                                <ListboxOption
                                  key={center.center_id}
                                  value={center.center_id.toString()}
                                >
                                  <ListboxLabel>
                                    {center.name} -{' '}
                                    <strong>
                                      {selectedWilayaFee.desk_fee}DA
                                    </strong>
                                  </ListboxLabel>
                                </ListboxOption>
                              )
                            })}
                        </Listbox>
                        {errors.stopDesk && (
                          <ErrorMessage>
                            {errors.stopDesk.message as string}
                          </ErrorMessage>
                        )}
                      </Field>
                    )}
                    {deliveryType === 'to-home' && (
                      <>
                        <Field>
                          <Label>Commune</Label>

                          <Listbox
                            placeholder="Select commune"
                            name="commune"
                            onChange={(commune: string) =>
                              setValue('commune', commune, {
                                shouldValidate: true,
                              })
                            }
                            invalid={!!errors.commune}
                          >
                            {communes
                              .filter(
                                (commune) =>
                                  commune.wilaya_id.toString() === wilayaValue,
                              )
                              .map((commune) => {
                                return (
                                  <ListboxOption
                                    key={commune.id}
                                    value={commune.id.toString()}
                                  >
                                    <ListboxLabel>
                                      {commune.name} -{' '}
                                      <strong>
                                        {selectedWilayaFee.home_fee}DA
                                      </strong>
                                    </ListboxLabel>
                                  </ListboxOption>
                                )
                              })}
                          </Listbox>
                          {errors.commune && (
                            <ErrorMessage>
                              {errors.commune.message as string}
                            </ErrorMessage>
                          )}
                        </Field>

                        <Field>
                          <Label>Addresse</Label>
                          <Input
                            {...register('address')}
                            invalid={!!errors.address}
                          />
                          {errors.address && (
                            <ErrorMessage>
                              {errors.address.message as string}
                            </ErrorMessage>
                          )}
                        </Field>
                      </>
                    )}
                  </>
                )}
              </FieldGroup>
            </Fieldset>
            <Fieldset>
              <Legend>Shipping details</Legend>
              <Text>Without this your odds of getting your order are low.</Text>
              <FieldGroup>
                <Field>
                  <Label>Delivery notes</Label>
                  <Textarea {...register('notes')} invalid={!!errors.notes} />
                  {errors.notes && (
                    <ErrorMessage>
                      {errors.notes.message as string}
                    </ErrorMessage>
                  )}
                  <Description>
                    If you have a tiger, we'd like to know about it.
                  </Description>
                </Field>
              </FieldGroup>
            </Fieldset>
          </div>

          {/* Order summary */}
          <div className="mt-10 lg:mt-0">
            <h2 className="text-lg font-medium text-gray-900">Order summary</h2>

            <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
              <h3 className="sr-only">Items in your cart</h3>
              {!!products?.length && (
                <CartProducts
                  products={cart.items
                    .map((item) => products.find((p) => p.id === item.id)!)
                    .filter((p) => p.id)}
                />
              )}

              {!products?.length && (
                <div className="mt-8 divide-y">
                  {new Array(ids.length).fill(null).map((_, i) => {
                    return <ProductFallback key={i} />
                  })}
                </div>
              )}

              <dl className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Subtotal</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {subtotal} DA
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Shipping</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {deliveryFee ? (
                      `${deliveryFee} DA`
                    ) : (
                      <span className="text-red-500">Enter your address</span>
                    )}
                  </dd>
                </div>

                <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                  <dt className="text-base font-medium">Total</dt>
                  <dd className="text-base font-bold text-gray-900">
                    {deliveryFee + subtotal} DA
                  </dd>
                </div>
              </dl>

              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <button
                  type="submit"
                  className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  Confirm order
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

const products = [
  {
    id: 1,
    title: 'Basic Tee',
    href: '#',
    price: '$32.00',
    color: 'Black',
    size: 'Large',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/checkout-page-02-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
  },
]

export { CheckoutForm }
