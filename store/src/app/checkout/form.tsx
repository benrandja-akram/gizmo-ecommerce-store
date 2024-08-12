'use client'

import { CartProducts, EmptyCart } from '@/components/ui/cart'
import { ProductFallback } from '@/components/ui/product-fallback'
import { useCart } from '@/hooks/use-cart'
import { useCartProducts } from '@/hooks/use-cart-products'
import { STOP_DESK, TO_HOME } from '@/utils/constants'
import {
  Button,
  Description,
  ErrorMessage,
  Field,
  FieldGroup,
  Fieldset,
  Input,
  Label,
  Listbox,
  ListboxLabel,
  ListboxOption,
  Radio,
  RadioField,
  RadioGroup,
  Textarea,
  clsx,
} from '@gizmo/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSyncExternalStore } from 'react'
import { useForm } from 'react-hook-form'
import useSWRMutation from 'swr/mutation'
import { checkout } from './actions'
import { OrderConfirmed } from './order-confirmed'
import { SchemaValue, checkoutSchema } from './schema'

type Props = {
  fees: DeliveryFeesRoot
  centers: CentersRoot
  communes: CommunesRoot['data']
}
function CheckoutForm({ fees, centers, communes }: Props) {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  )
  const { data, isMutating, trigger } = useSWRMutation(
    '/actions/checkout',
    (
      _,
      data: {
        arg: Parameters<typeof checkout>
      },
    ) => checkout(data.arg[0], data.arg[1]),
  )
  const cart = useCart()
  const { products, isLoading } = useCartProducts({ enabled: true })

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    getValues,
  } = useForm<SchemaValue>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      deliveryType: TO_HOME,
    },
  })

  if (data?.success) {
    return <OrderConfirmed name={getValues().name} />
  }
  if (!isLoading && !products?.length && mounted) {
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
    (deliveryType === TO_HOME
      ? selectedWilayaFee?.home_fee
      : selectedWilayaFee?.desk_fee) ?? 0

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl  pb-24 pt-16  lg:max-w-7xl ">
        <h2 className="sr-only">Checkout</h2>

        <form
          onSubmit={handleSubmit((values) => {
            trigger([cart.items, values]).then(() => cart.clearCart())
          })}
          className="items-start lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16"
        >
          <div className="grid gap-4">
            <h2 className="text-lg font-medium text-gray-900">
              Les détails de livraison
            </h2>
            <Fieldset disabled={isMutating}>
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
                        onChange={(value: SchemaValue['deliveryType']) =>
                          setValue('deliveryType', value, {
                            shouldValidate: true,
                          })
                        }
                        defaultValue={TO_HOME}
                      >
                        <RadioField>
                          <Radio value={TO_HOME} />
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
                          <Radio value={STOP_DESK} />
                          <Label>
                            la livraison au bureau d'agence Yalidine -{' '}
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
                    {deliveryType === STOP_DESK && (
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
                    {deliveryType === TO_HOME && (
                      <>
                        <Field>
                          <Label>Commune</Label>

                          <Listbox
                            placeholder="Sélectionnez une commune"
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
                <Field>
                  <Label>Remarques (facultatif)</Label>
                  <Textarea {...register('notes')} invalid={!!errors.notes} />
                  {errors.notes && (
                    <ErrorMessage>
                      {errors.notes.message as string}
                    </ErrorMessage>
                  )}
                </Field>
              </FieldGroup>
            </Fieldset>
          </div>

          {/* Order summary */}
          <div className="mt-10 lg:mt-0">
            <h2 className="text-lg font-medium text-gray-900">Résumé</h2>

            <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
              <h3 className="sr-only">Produits dans votre panier</h3>
              {products ? (
                <>
                  <CartProducts
                    products={cart.items
                      .map((item) => products.find((p) => p.id === item.id)!)
                      .filter(Boolean)
                      .filter((p) => p.id)}
                  />

                  <dl className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex items-center justify-between">
                      <dt className="text-sm">Sous-total</dt>
                      <dd className="text-sm font-medium text-gray-900">
                        {subtotal} DA
                      </dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-sm">Frais de livraison</dt>
                      <dd className="text-sm font-medium text-gray-900">
                        {deliveryFee ? (
                          `${deliveryFee} DA`
                        ) : (
                          <span className="text-red-500">
                            Entrez votre adresse
                          </span>
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
                    <Button
                      className={clsx('w-full sm:py-3')}
                      disabled={isMutating}
                      type="submit"
                    >
                      {!isMutating
                        ? 'Confirmer la commande'
                        : 'Confirmation en cours ...'}
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div className="divide-y">
                    {new Array(3).fill(null).map((_, i) => {
                      return <ProductFallback key={i} />
                    })}
                  </div>
                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="h-10 animate-pulse rounded bg-slate-300"></div>
                  </div>
                </>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export { CheckoutForm }
