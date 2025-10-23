import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  public name!: string

  @column()
  public slug!: string

  @column()
  public category!: string

  @column()
  public price!: number

  @column()
  public description!: string

  @column({ columnName: 'image_main' }) public imageMain!: string
  @column({ columnName: 'image_alt1' }) public imageAlt1?: string   // << here
  @column({ columnName: 'image_alt2' }) public imageAlt2?: string 
}