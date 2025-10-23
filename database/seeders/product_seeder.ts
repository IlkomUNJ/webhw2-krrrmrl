import {BaseSeeder} from '@adonisjs/lucid/seeders'
import Product from '#models/product'

export default class extends BaseSeeder {
  public async run () {
    await Product.updateOrCreateMany('slug', [
      {
        name: 'Betta Fish',
        slug: 'betta',
        category: 'beginner',
        price: 45000,
        description: 'Perfect for beginners. Vibrant colors, keep alone.',
        imageMain: '/images/product-1.jpg',
        imageAlt1: '/images/gallery-left.jpg',
        imageAlt2: '/images/gallery-right.jpg',
      },
      {
        name: 'Guppy Fish',
        slug: 'guppy',
        category: 'beginner',
        price: 15000,
        description: 'Colorful and peaceful. Great for community tanks.',
        imageMain: '/images/product-2.jpg',
        imageAlt1: '/images/product-2b.jpg',
        imageAlt2: '/images/product-2a.jpg',
      },
      {
        name: 'Koi Fish',
        slug: 'koi',
        category: 'outdoor',
        price: 120000,
        description: 'Long-living pond star. Colorful and friendly.',
        imageMain: '/images/product-3.jpg',
        imageAlt1: '/images/product-3b.jpg',
        imageAlt2: '/images/product-3a.jpg',
      },
      {
        name: 'Corydoras Catfish',
        slug: 'corydoras',
        category: 'indoor',
        price: 22000,
        description: 'Bottom cleaner. Peaceful and best in groups.',
        imageMain: '/images/product-4.jpg',
        imageAlt1: '/images/product-4b.jpg',
        imageAlt2: '/images/product-4a.jpg',
      },
      {
        name: 'Platy Fish',
        slug: 'platy',
        category: 'beginner',
        price: 16000,
        description: 'Hardy and social. Easy to breed.',
        imageMain: '/images/product-5.jpg',
        imageAlt1: '/images/product-5b.jpg',
        imageAlt2: '/images/product-5a.jpg',
      },
      {
        name: 'Angelfish',
        slug: 'angelfish',
        category: 'beginner',
        price: 50000,
        description: 'Elegant swimmers. Needs stable water and space.',
        imageMain: '/images/product-6.jpg',
        imageAlt1: '/images/product-6b.jpg',
        imageAlt2: '/images/product-6a.jpg',
      },
      {
        name: 'Goldfish',
        slug: 'goldfish',
        category: 'outdoor',
        price: 35000,
        description: 'Classic, gentle, and hardy. Needs good filtration.',
        imageMain: '/images/product-7.jpg',
        imageAlt1: '/images/product-7b.jpg',
        imageAlt2: '/images/product-7a.jpg',
      },
      {
        name: 'Molly Fish',
        slug: 'molly',
        category: 'beginner',
        price: 18000,
        description: 'Adaptable and calm. Great starter fish.',
        imageMain: '/images/product-8.jpg',
        imageAlt1: '/images/product-8b.jpg',
        imageAlt2: '/images/product-8a.jpg',
      },
    ])
  }
}
