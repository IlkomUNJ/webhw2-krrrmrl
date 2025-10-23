import Product from '#models/product'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProductsController {
  public async index({request, view}: HttpContext){
    const sort = (request.input('sort') as string) || 'name-asc'

    // map sort -> DB column + direction
    const sortMap: Record<string, { col: keyof Product, dir: 'asc' | 'desc' }> = {
      'name-asc':  { col: 'name',  dir: 'asc'  },
      'name-desc': { col: 'name',  dir: 'desc' },
      'price-asc': { col: 'price', dir: 'asc'  },
      'price-desc':{ col: 'price', dir: 'desc' },
    }
    const { col, dir } = sortMap[sort] || sortMap['name-asc']

    const products = await Product.query().orderBy(col as string, dir)
    return view.render('pages/products', { products })
  }
  
  public async show({ params, view, response }: HttpContext) {
    const product = await Product.query().where('slug', params.slug).first()
    if (!product) return response.notFound('Product not found')
    return view.render('products/show', { product })
  }
}