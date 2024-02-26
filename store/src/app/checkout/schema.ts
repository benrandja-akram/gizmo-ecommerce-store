import * as zod from 'zod'

const schema = zod
  .object({
    phone: zod.string(),
    name: zod.string().min(1, 'Name is required'),
    wilaya: zod
      .string({ required_error: 'Wilaya type is required' })
      .min(1, 'Wilaya is required'),
    deliveryType: zod
      .string({ required_error: 'Delivery type is required' })
      .min(1, 'Delivery type is required'),
    commune: zod.string().optional(),
    stopDesk: zod.string().optional(),
    address: zod.string().optional(),
    notes: zod.string(),
  })
  .superRefine(({ wilaya, deliveryType, commune, stopDesk, address }, ctx) => {
    if (wilaya) {
      if (deliveryType === 'to-home') {
        if (!commune) {
          ctx.addIssue({
            code: zod.ZodIssueCode.custom,
            path: ['commune'],
            message: 'Commune is required',
          })
        }
        if (!address) {
          ctx.addIssue({
            code: zod.ZodIssueCode.custom,
            path: ['address'],
            message: 'Address is required',
          })
        }
      }
      if (deliveryType === 'to-stop-desk' && !stopDesk) {
        ctx.addIssue({
          code: zod.ZodIssueCode.custom,
          path: ['stopDesk'],
          message: 'Stop desk is required',
        })
      }
    }
  })

export type SchemaValue = zod.infer<typeof schema>
export { schema as checkoutSchema }
