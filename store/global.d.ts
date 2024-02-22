type Product = {
  id: number
  name: string
  color: string
  price: string
  href: string
  imageSrc: string
  imageAlt: string
  availableColors: ProductColor[]
}

interface ProductColor {
  name: string
  colorBg: string
}

interface DivProps extends React.ComponentPropsWithRef<'div'> {}
