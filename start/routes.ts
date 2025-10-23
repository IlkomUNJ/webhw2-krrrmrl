/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
router.on('/').render('pages/home')
router.on('/gate').render('pages/acc')
router.on('/about').render('pages/about')

import ProductsController from '#controllers/products_controller' 
router.get('/products/:slug', [ProductsController, 'show'])
router.get('/products', [ProductsController, 'index'])

import CartController from '#controllers/cart_controller'
router.get('/cart', [CartController, 'index'])
router.post('/cart/add', [CartController, 'add'])
router.post('/cart/update', [CartController, 'update'])
router.post('/cart/remove', [CartController, 'remove'])
