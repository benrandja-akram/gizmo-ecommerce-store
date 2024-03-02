import { create } from 'zustand'

interface Item {
  id: string
  quantity: number
}

interface CartState {
  items: Item[]
  addItem: (item: Item) => void
  removeItem: (itemId: string) => void
  clearCart: () => void
  updateQuantity: (itemId: string, newQuantity: number) => void
}

const useCart = create<CartState>((set) => ({
  items: [],
  addItem: (item) =>
    set((state) => {
      const existingItem = state.items.find((i) => i.id === item.id)
      if (!existingItem) {
        return { items: [...state.items, { ...item, quantity: 1 }] }
      }
      return state
    }),
  removeItem: (itemId) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== itemId),
    })),
  clearCart: () => set({ items: [] }),
  updateQuantity: (itemId, newQuantity) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item,
      ),
    })),
}))

export { useCart }
