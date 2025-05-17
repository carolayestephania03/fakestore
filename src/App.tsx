import { useState } from 'react'
import { ProductList } from './components/ProductList'
import { ProductDetail } from './components/ProductDetail'
import { CreateProduct } from './components/CreateProduct'
import './App.css'

function App() {
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null)
  const [view, setView] = useState<'list' | 'create'>('list')

  return (
    <div className="app">
      <nav className="nav">
        <button onClick={() => setView('list')}>Lista de Productos</button>
        <button onClick={() => setView('create')}>Crear Producto</button>
      </nav>

      <main>
        {view === 'list' && !selectedProductId && (
          <ProductList />
        )}
        
        {selectedProductId && (
          <div>
            <button onClick={() => setSelectedProductId(null)}>Volver a la lista</button>
            <ProductDetail productId={selectedProductId} />
          </div>
        )}

        {view === 'create' && (
          <CreateProduct />
        )}
      </main>
    </div>
  )
}

export default App
