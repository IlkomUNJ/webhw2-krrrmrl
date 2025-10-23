import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'cart_items'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('visitor_id').notNullable()                 // session-scoped cart
      table.integer('product_id').unsigned()
        .references('products.id').onDelete('CASCADE').notNullable()
      table.integer('qty').unsigned().notNullable().defaultTo(1)
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}