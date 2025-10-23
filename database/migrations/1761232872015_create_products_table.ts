import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.string('slug').notNullable().unique()
      table.string('category').notNullable() // beginner | indoor | outdoor
      table.decimal('price', 10, 2).notNullable()
      table.text('description').notNullable()
      table.string('image_main').notNullable()
      table.string('image_alt1').nullable()
      table.string('image_alt2').nullable()
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}