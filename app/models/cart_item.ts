import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class CartItem extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'visitor_id' }) public visitorId!: string
  @column({ columnName: 'product_id' }) public productId!: number
  @column() public qty!: number
}