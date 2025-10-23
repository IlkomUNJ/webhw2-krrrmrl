import type { HttpContext } from '@adonisjs/core/http'
import CartItem from '#models/cart_item'
import Product from '#models/product'

export default class CartController {
  /** Ensure a per-visitor id stored in session */
  private ensureVisitor(session: HttpContext['session']) {
    let id = session.get('visitor_id') as string | undefined
    if (!id) {
      id = crypto.randomUUID()
      session.put('visitor_id', id)
    }
    return id
  }

  /** GET /cart — render the cart page */
  public async index({ session, view }: HttpContext) {
    const visitorId = this.ensureVisitor(session)
    const items = await CartItem.query().where('visitor_id', visitorId)

    // join with products (manual map)
    const productIds = items.map((i) => i.productId)
    const products = productIds.length ? await Product.query().whereIn('id', productIds) : []
    const pmap = new Map(products.map((p) => [p.id, p]))

    const rows = items.map((i) => {
      const p = pmap.get(i.productId)!
      const subtotal = Number(p.price) * i.qty
      return { item: i, product: p, subtotal }
    })

    const subtotal = rows.reduce((s, r) => s + r.subtotal, 0)
    const tax = Math.round(subtotal * 0.1) // simple 10% example
    const grand = subtotal + tax

    // Your cart view lives under resources/views/pages/cart.edge
    return view.render('pages/cart', { rows, subtotal, tax, grand })
  }

  /** POST /cart/add — add a product to cart */
  public async add({ request, session, response }: HttpContext) {
    const visitorId = this.ensureVisitor(session)
    const productId = Number(request.input('product_id'))
    const qty = Math.max(1, Number(request.input('qty') || 1))

    const existing = await CartItem.query()
      .where({ visitor_id: visitorId, product_id: productId })
      .first()

    if (existing) {
      existing.qty += qty
      await existing.save()
    } else {
      await CartItem.create({ visitorId, productId, qty })
    }
    return response.redirect('/cart')
  }

  /** POST /cart/update — change quantity (0 deletes) */
  public async update({ request, session, response }: HttpContext) {
    const visitorId = this.ensureVisitor(session)
    const id = Number(request.input('id'))
    const qty = Math.max(0, Number(request.input('qty')))

    const item = await CartItem.query().where({ id }).andWhere('visitor_id', visitorId).first()
    if (item) {
      if (qty === 0) await item.delete()
      else { item.qty = qty; await item.save() }
    }
    return response.redirect('/cart')
  }

  /** POST /cart/remove — remove a row */
  public async remove({ request, session, response }: HttpContext) {
    const visitorId = this.ensureVisitor(session)
    const id = Number(request.input('id'))

    const item = await CartItem.query().where({ id }).andWhere('visitor_id', visitorId).first()
    if (item) await item.delete()
    return response.redirect('/cart')
  }
}
