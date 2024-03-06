import { STOP_DESK, TO_HOME } from '@/utils/constants'
import * as zod from 'zod'

const schema = zod
  .object({
    phone: zod.string().min(1, 'Le numéro de téléphone est obligatoire'),
    name: zod.string().min(1, 'Le nom est obligatoire'),
    wilaya: zod
      .string({ required_error: 'Le wilaya est obligatoire' })
      .min(1, 'Le wilaya est obligatoire'),
    deliveryType: zod.union([zod.literal(STOP_DESK), zod.literal(TO_HOME)]),
    commune: zod.string().optional(),
    stopDesk: zod.string().optional(),
    address: zod.string().optional(),
    notes: zod.string(),
  })
  .superRefine(({ wilaya, deliveryType, commune, stopDesk, address }, ctx) => {
    if (wilaya) {
      if (deliveryType === TO_HOME) {
        if (!commune) {
          ctx.addIssue({
            code: zod.ZodIssueCode.custom,
            path: ['commune'],
            message: 'La commune est obligatoire',
          })
        }
        if (!address) {
          ctx.addIssue({
            code: zod.ZodIssueCode.custom,
            path: ['address'],
            message: 'L’adresse est obligatoire',
          })
        }
      }
      if (deliveryType === stopDesk && !stopDesk) {
        ctx.addIssue({
          code: zod.ZodIssueCode.custom,
          path: ['stopDesk'],
          message: "Un guichet d'arrêt est requis",
        })
      }
    }
  })

export type SchemaValue = zod.infer<typeof schema>
export { schema as checkoutSchema }
